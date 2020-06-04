import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
    'A red t-shirt, perfect for days with non-red weather.',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'Can also be used for tea! Something used to drink tea.',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    "What the content is? Why would that matter? It's a limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    'https://images.unsplash.com/photo-1586158291800-2665f07bba79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    5.49
  ),
];

export default PRODUCTS;
