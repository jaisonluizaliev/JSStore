import React, { useState } from 'react';
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
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const styles = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      alert('Logado com sucesso', data);
    } catch (err) {
      alert(err.response.data ? err.response.data.messsage : err.message);
    }
  };

  return (
    <Layout title="Entrar">
      <form onSubmit={submitHandler} className={styles.form}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
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
