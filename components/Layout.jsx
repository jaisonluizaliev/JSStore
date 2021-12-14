import React from 'react';
import Head from 'next/head';
import { Link, AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import useStyles from '../styles/styles';
import NextLink from 'next/link';

export default function Layout({ children }) {
  const styles = useStyles();
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={styles.brand}>JS Store</Typography>
            </Link>
          </NextLink>
          <div className={styles.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={styles.main}>{children}</Container>
      <footer className={styles.footer}>
        <Typography>Todos os direitos reservados a JS Store </Typography>
      </footer>
    </>
  );
}
