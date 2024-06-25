import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {


  const renderPrice = (
    <Typography variant="subtitle1">
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card sx={{ background: "#1C252E" }}>


      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="white" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between" color="white">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
