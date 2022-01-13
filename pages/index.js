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

export default function Home(props) {
  const { products } = props;
  const styles = useStyles();
  return (
    <Layout>
      <h1 className={styles.center}>Produtos</h1>
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
                <Button size="small" color="primary">
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
      products : product.map(db.convertDocToObj)
    }
  }
}