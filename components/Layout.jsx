import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import useStyles from '../styles/styles';

export default function Layout({ children }) {
  const styles = useStyles();
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar>
          <Typography>JS Store</Typography>
        </Toolbar>
      </AppBar>
      <Container className={styles.main}>{children}</Container>
      <footer className={styles.footer}>
        <Typography>Todos os direitos reservados a JS Store </Typography>
      </footer>
    </>
  );
}
