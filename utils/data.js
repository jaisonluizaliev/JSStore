import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Jonas',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Joana',
      email: 'joana@joana.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Sandália Rosa',
      slug: 'sandalia-rosa',
      category: 'sandalia',
      image: '/sandalia-rosa.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Sandália rosa pro verão',
    },
    {
      name: 'Sandália Azul',
      slug: 'sandalia-azul',
      category: 'sandalia',
      image: '/sandalia-azul.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.2,
      numReviews: 10,
      countInStock: 20,
      description: 'sandalia azul pro verão ',
    },
    {
      name: 'Scarpin Onça',
      slug: 'scarpin-onca',
      category: 'scarpin',
      image: '/scarpin-onca.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'liberte a selva dentro de voce',
    },
    {
      name: 'Boneca',
      slug: 'boneca',
      category: 'boneca',
      image: '/boneca.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Boneca Para voce boneca',
    },
    {
      name: 'Sandália Prata e Preto',
      slug: 'sandália-prata-e-preto',
      category: 'sandalia',
      image: '/sandália-prata-e-preto.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Salto confortavel',
    },
    {
      name: 'Sandália Salto Curto',
      slug: 'sandalia-salto-curto',
      category: 'Sandalia',
      image: '/sandalia-salto-curto.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'para quem gosta de calçados baixos com classe',
    },
    {
      name: 'Scarpin Salto Baixo',
      slug: 'scarpin-salto-baixo',
      category: 'scarpin',
      image: '/scarpin-salto-baixo.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Estilo e conforto',
    },
    {
      name: 'Scarpin Branco',
      slug: 'scarpin-branco',
      category: 'scarpin',
      image: '/scarpin-branco.jpg',
      price: 59.9,
      brand: 'Amart',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Verniz',
    },
  ],
};

export default data;
