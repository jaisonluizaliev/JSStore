import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/checkoutWizard';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import { Store } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const styles = useStyles();

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="pagina de envio">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <Typography variant="h1" component="h1">
          Pagina de Envio
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Nome Completo"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'O nome Completo deve conter pelo menos 2 letras'
                        : 'O campo Nome Completo ?? obrigat??rio'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Endere??o"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'O endere??o deve conter pelo menos 2 letras'
                        : 'O campo endere??o ?? obrigat??rio'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="city"
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
                  id=""
                  label="Cidade"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'O nome Cidade deve conter pelo menos 2 letras'
                        : 'O campo Cidade ?? obrigat??rio'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLenght: 8,
                maxLength: 9,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="CEP"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'O CEP deve conter 8 n??meros sem separa????o'
                        : 'O campo CEP ?? obrigat??rio'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Pa??s"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'O Pais deve conter pelo menos 3 letras'
                        : 'O campo Pa??s ?? obrigat??rio'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Prosseguir
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
