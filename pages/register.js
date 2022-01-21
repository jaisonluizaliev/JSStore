import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import { Store } from '../utils/Store';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Register() {
  const {handleSubmit, control, formState: {errors}} = useForm();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const styles = useStyles();

  const submitHandler = async ({name, email, password, confirmPassword}) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar('Senhas diferentes entre si', {variant: 'há um erro'});
      return;
    }
    try {
      const { data } = await axios.post('api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        {variant: 'há um erro'}
      );
    }
  };
  return (
    <Layout title="Novo Cliente">
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <Typography variant="h1" component="h1">
          Novo Cliente
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Nome"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'O nome deve conter pelo menos (2) letras'
                        : 'O campo nome é obrigatório'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="E-mail"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Este email não é valido'
                        : 'O campo e-mail é obrigatório'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Senha"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'A senha deve ser maior que 5 digitos'
                        : 'O campo senha é obrigatória'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirmar Senha"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'A confirmação de senha deve ser igual a anterior'
                        : 'o campo confirmar senha é obrigatória'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button fullWidth color="primary" type="submit" variant="contained">
              Confirmar Cadastro
            </Button>
          </ListItem>
          <ListItem>
            Ja tem Conta? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Entrar</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
