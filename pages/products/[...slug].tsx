import Products from '@/components/Products';
import { IProduct } from '@/types/product.type';
import Responsive from '@/utils/styles/Responsive';
import Layouts from 'Layouts';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

const Product = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layouts>
      <ProductResponsive>
        <Products product={product} />
      </ProductResponsive>
    </Layouts>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const products: IProduct[] = await fetch(
    process.env.NODE_ENV === 'production'
      ? `${process.env.VERCEL_URL}/api/products/product`
      : 'http://localhost:3000/api/products/product',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*',
      },
    },
  ).then((res) => res.json());

  const paths = products.map((product) => ({
    params: {
      slug: [product.uid, product.title],
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const body = {
    uid: slug[0],
  };
  const product: IProduct = await fetch(
    process.env.NODE_ENV === 'production'
      ? `${process.env.VERCEL_URL}/api/products/read`
      : 'http://localhost:3000/api/products/read',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*',
      },
      body: JSON.stringify(body),
    },
  ).then((res) => res.json());
  return {
    props: {
      product,
    },
  };
};

const ProductResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
