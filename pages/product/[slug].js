import React, { useContext } from 'react';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../styles/styles';
import NextLink from 'next/link';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { currencyPTBR } from '../../utils/currency';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const styles = useStyles();

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      alert('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <>
      {!product ? (
        <h1>Produto não encontrado</h1>
      ) : (
        <Layout title={product.name} description={product.description}>
          <div className={styles.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Voltar a Pagina Principal</Typography>
              </Link>
            </NextLink>
          </div>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <div className={styles.imageSlug}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width="90%"
                  height="90%"
                  layout="responsive"
                />
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Categoria: {product.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Marca: {product.brand}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    Classificação: {product.rating} estrelas (
                    {product.numReviews} visualizações)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Estoque: {product.countInStock} Pares</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Descrição: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Preço</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{currencyPTBR(product.price)}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0
                            ? 'Em estoque'
                            : 'Indisponível'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                    >
                      Adicionar ao Carrinho
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Layout>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
