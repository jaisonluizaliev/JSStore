import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../styles/styles';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // console.log({existItem, product, quantity });
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      alert('sorry. Product out in stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };

  const styles = useStyles();
  return (
    <Layout>
      <h1 className={styles.center}>Produtos</h1>
      {/* <Button onClick={addToCartHandler}>Ve ae </Button> */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={3} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>
                  {Number(product.price).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  colocar no carrinho
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const product = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: product.map(db.convertDocToObj),
    },
  };
}
