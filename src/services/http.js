// http.js

const baseUrl = 'http://localhost:3000/api';
export const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

export const storeToken = (key, token) => {
    try {
        localStorage.setItem(key, token);
    } catch (error) {
        console.error(`Failed to store ${key}:`, error);
        throw error;
    }
};

const getStoredToken = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Failed to get ${key}:`, error);
        throw error;
    }
};



const refreshTokens = async () => {
    const refreshToken = getStoredToken(refreshTokenKey);
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
        const tokens = await response.json();
        storeToken(accessTokenKey, tokens.accessToken);
        storeToken(refreshTokenKey, tokens.refreshToken);
        return tokens.accessToken;
    }
    throw new Error('Failed to refresh token');

};

export const clearTokens = () => {
    try {
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      throw error;
    }
  };
  


export const http = async ({ url, method, body, headers = {} }) => {
    try {
        const accessToken = getStoredToken(accessTokenKey);
        let response = await fetch(`${baseUrl}/${url}`, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                ...headers,
            },
        });

        if (response.status === 401) {
            const newAccessToken = await refreshTokens();
            // Reenviar a requisição original com o novo token
            response = await fetch(`${baseUrl}/${url}`, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                    ...headers,
                },
            });
        }

        if (response.ok) {
            return response.json();
        }
        const error = await response.json();
        throw new Error(error.message);

    } catch (error) {
        console.error('HTTP error:', error);
        throw error;
    }
};
