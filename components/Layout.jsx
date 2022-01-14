import React, { useContext } from 'react';
import Head from 'next/head';
import {
  Link,
  AppBar,
  Container,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from '@material-ui/core';
import useStyles from '../styles/styles';
import NextLink from 'next/link';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {

  const {state, dispatch} = useContext(Store);
  const {darkMode, cart} = state;
  const styles = useStyles();
  // let cart = {cartItems:[0,0,0]}
  // console.log(cart, 'this is log')
  const darkModeChangeHandler = () => {
    dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    });
    const newMode = !darkMode;
    Cookies.set('darkMode', newMode ? 'ON' : 'OFF');
  }

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#266fce',
      },
      secondary: {
        main: '#204060',
      },
    },
  });
  return (
    <>
      <Head>
        <title>{title ? `${title} || JS Store` : 'JS Store'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={styles.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={styles.brand}>JS Store</Typography>
              </Link>
            </NextLink>
            <div className={styles.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              />
              <NextLink href="/cart" passHref>
                <Link>
                  {cart && cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Area do Cliente</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={styles.main}>{children}</Container>
        <footer className={styles.footer}>
          <Typography>Todos os direitos reservados a JS Store </Typography>
        </footer>
      </ThemeProvider>
    </>
  );
}
