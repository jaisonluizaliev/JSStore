import {
  Button,
  Card,
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
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import { Store } from '../utils/Store';
import { currencyPTBR } from '../utils/currency';

function PlaceOrder() {
  const styles = useStyles();
  const router = useRouter();
  const { state /*dispatch*/ } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Separar Pedido">
      <CheckoutWizard activeStep={3} />
      <Typography variant="h1" component="h1">
        Separar Pedido
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography variant="h2" component="h2">
                  Endereço de Entrega
                </Typography>
              </ListItem>
              <ListItem>
                <strong>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </strong>
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
              <ListItem>
                <strong>{paymentMethod}</strong>
              </ListItem>
            </List>
          </Card>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography variant="h2" component="h2">
                  Resumo do Pedido
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Preço</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
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
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {currencyPTBR(item.price)}
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
              <ListItem>
                <Button variant="contained" fullWidth color="primary">
                  Fechar Pedido
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
