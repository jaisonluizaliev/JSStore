import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>JS Store</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>Todos os direitos reservados a JS Store </Typography>
      </footer>
    </>
  );
}
