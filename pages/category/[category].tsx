import { IProduct } from '@/types/product.type';
import { firebaseDb } from '@/utils/firebase/clientApp';
import Layouts from 'Layouts';
import Home from 'Layouts/Home';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import CategoryList from '@/components/Category';
import { ParsedUrlQuery } from 'querystring';

interface CategoryQuery extends ParsedUrlQuery {
  category: string;
}

const Category = ({
  category,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layouts
      title={category}
      description={`앱 카테고리 ${category}`}
      image={null}
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
    >
      <Home>
        <CategoryList products={products} category={category} />
      </Home>
    </Layouts>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const snapsoht = await firebaseDb.collection('products').get();
    const res = snapsoht.docs.map((doc) => doc.data());
    const products: IProduct[] = JSON.parse(JSON.stringify(res));
    const paths = Array.from(
      new Set<string>(products.map((product) => product.category)),
    ).map((string) => {
      return {
        params: {
          category: string.toLowerCase(),
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    throw e;
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params as CategoryQuery;
  try {
    const snapshot = await firebaseDb
      .collection('products')
      .where('category', '==', category.toUpperCase())
      .get();
    const res = snapshot.docs.map((doc) => doc.data());
    const products: IProduct[] = JSON.parse(JSON.stringify(res));
    return {
      props: {
        category: category.toUpperCase(),
        products,
      },
    };
  } catch (e) {
    throw e;
  }
};
