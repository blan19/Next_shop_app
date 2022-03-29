import Products from '@/components/Products';
import { IProduct } from '@/types/product.type';
import { firebaseDb } from '@/utils/firebase/clientApp';
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
    <Layouts
      title={product.title}
      description={`${product.title} ${product.category}`}
      image={null}
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
    >
      <ProductResponsive>
        <Products product={product} />
      </ProductResponsive>
    </Layouts>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const snapsoht = await firebaseDb.collection('products').get();
    const res = snapsoht.docs.map((doc) => doc.data());
    const products: IProduct[] = JSON.parse(JSON.stringify(res));
    const paths = products.map((product) => ({
      params: {
        slug: [product.uid, product.title],
      },
    }));
    return { paths, fallback: false };
  } catch (e) {
    throw e;
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  try {
    const snapshot = await firebaseDb.collection('products').doc(slug[0]).get();
    const product: IProduct = JSON.parse(JSON.stringify(snapshot.data()));
    return {
      props: {
        product,
      },
    };
  } catch (e) {
    throw e;
  }
};

const ProductResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
