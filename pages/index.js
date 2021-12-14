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
import data from '../utils/data';

export default function Home() {
  const styles = useStyles();
  return (
    <Layout>
      <h1 className={styles.center}>Produtos</h1>
      <Grid container spacing={3}>
        {data.products.map((product) => (
          <Grid item md={3} key={product.name}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={product.image}
                  title={product.name}
                ></CardMedia>
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
              </CardActionArea>
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