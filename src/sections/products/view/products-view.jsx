import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getProducts } from 'src/services/products';

import ProductCard from '../product-card';

// ----------------------------------------------------------------------

export default function ProductsView() {

  const [products, setProducts] = useState([]);
  const route = useRouter()

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      if (Array.isArray(response)) {
        setProducts(response)
      } else {
        route.push("/not-found")
      }
    } catch (error) {
      route.push("/not-found")
    }
  }

  useEffect(() => {

    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
