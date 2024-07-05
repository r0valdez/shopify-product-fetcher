import { GraphQLClient, gql } from 'graphql-request';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import dotenv from 'dotenv';

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .options({
    name: {
      alias: 'n',
      description: 'Product name to search for',
      type: 'string',
      demandOption: true,
    }
  })
  .argv;

const shopifyDomain = process.env.SHOPIFY_DOMAIN;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

const client = new GraphQLClient(`${shopifyDomain}/admin/api/2024-04/graphql.json`, {
  headers: {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  },
});

const getProductQuery = gql`
  query($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          title
          variants(first: 100) {
            edges {
              node {
                title
                price
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchProducts(productName) {
  try {
    const query = `title:*${productName}*`
    const variables = { query };
    const data = await client.request(getProductQuery, variables);

    const products = data.products.edges.map(edge => edge.node);
    let variants = [];

    products.forEach(product => {
      product.variants.edges.forEach(variantEdge => {
        variants.push({
          productName: product.title,
          variantName: variantEdge.node.title,
          price: parseFloat(variantEdge.node.price),
        });
      });
    });

    variants.sort((a, b) => a.price - b.price);

    variants.forEach(variant => {
      console.log(`${variant.productName} - ${variant.variantName} - price $${variant.price}`);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

const productName = argv.name;
if (productName) {
  fetchProducts(productName);
} else {
  console.log('Please provide a product name using --name or -n');
}
