import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import { Store } from '../utils/Store';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const styles = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Precisamos de uma forma de pagamento selecionada', {
        variant: 'error',
      });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={2} />
      <form className={styles.form} onSubmit={submitHandler}>
        <Typography variant="h1" component="h1">
          Pagamento
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Pag Seguro"
                  value="PagSeguro"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="Dinheiro"
                  value="Dinheiro"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" color="primary" variant="contained">
              Prosseguir
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              onClick={() => router.push('/shipping')}
              variant="contained"
              color="secondary"
            >
              Voltar
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
