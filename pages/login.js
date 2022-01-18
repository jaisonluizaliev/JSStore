import React from 'react';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';

export default function Login() {
  const styles = useStyles();

  return (
    <Layout title="Entrar">
      <form className={styles.form}>
        <Typography variant="h1" component="h1">
          Entrar
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="email"
              inputProps={{ type: 'email' }}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Entrar
            </Button>
          </ListItem>
          <ListItem>
            Não Tem conta ? &nbsp;
            <NextLink href="register" passHref>
              <Link>Criar Conta</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
