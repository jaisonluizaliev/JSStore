import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import useStyles from '../../styles/styles';
import data from '../../utils/data';
import NextLink from 'next/link';
import Image from 'next/image';

export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  const styles = useStyles();

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
                  <Typography component="h1" variant="h6">
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
                        <Typography>
                          {Number(product.price).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{product.countInStock > 0 ? 'Em estoque' : 'Indisponível'}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained" color="primary">
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
