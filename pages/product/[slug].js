import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

  return (
    <Layout>
      {!product ? (
        <>Produto não encontrado</>
      ) : (
        <>
          <h1>{product.name}</h1>
          {/* <Grid container>
            <Grid item xs={6}>
              <img src={product.image} alt={product.name} />
            </Grid>
            <Grid>{product.countInStock}</Grid>
          </Grid> */}
        </>
      )}
    </Layout>
  );
}
