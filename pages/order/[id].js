import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../../utils/Store';
import useStyles from '../../styles/styles';
import Image from 'next/image';
import NextLink from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import CheckoutWizard from '../../components/CheckoutWizard';
import Layout from '../../components/Layout';
import { currencyPTBR } from '../../utils/currency';

import {
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      return state;
  }
}

function Order({ params }) {
  const orderId = params.id;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const styles = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
    }
  );

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    if (
      !order._id ||
      successPay ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'BRL' },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, successPay]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      closeSnackbar();
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = axios.put(`/api/orders/${order._id}/pay`, details, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar('Pagamento Efetuado!', { variant: 'success' });
      } catch (error) {
        dispatch({ type: 'PAY_FAIL', payload: getError(error) });
        enqueueSnackbar(getError(error), { variant: 'error' });
      }
    });
  }

  function onError(err) {
    closeSnackbar();
    enqueueSnackbar(getError(err), { variant: 'error' });
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <CheckoutWizard activeStep={4} />
      <Typography variant="h1" component="h1">
        Pedido Nº {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={styles.error}></Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Endereço de Entrega
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country},{' '}
                </ListItem>
                <ListItem>
                  Progresso:{' '}
                  {isDelivered ? `Enviado em ${deliveredAt}` : 'Não enviado'}
                </ListItem>
              </List>
            </Card>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography variant="h2" component="h2">
                    Forma de Pagamento
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                  Progresso: {isPaid ? `pago em ${paidAt}` : 'Não pago'}
                </ListItem>
              </List>
            </Card>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography variant="h2" component="h2">
                    Relação dos pares selecionados
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Foto</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantidade</TableCell>
                          <TableCell align="right">Preço</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography> 
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <Typography align="right">
                                {item.quantity}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography align="right">
                                {currencyPTBR(item.price)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography variant="h2">Resumo dos Valores</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Itens :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {currencyPTBR(itemsPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Taxa: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {currencyPTBR(taxPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Entrega:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {currencyPTBR(shippingPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>{currencyPTBR(totalPrice)}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress/>
                    ) : (
                      <div className={styles.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
