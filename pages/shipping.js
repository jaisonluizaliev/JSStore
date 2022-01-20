import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }
  return (
    <Layout>
      <Typography variant="h1" component="h1">
        Pagina de Envio
      </Typography>
    </Layout>
  );
}
