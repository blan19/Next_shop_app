import { IProduct } from '@/types/product.type';
import { firebaseDb } from '@/utils/firebase/clientApp';
import Layouts from 'Layouts';
import Home from 'Layouts/Home';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CategoryList from '@/components/Category';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface CategoryQuery extends ParsedUrlQuery {
  category: string;
}

const Category = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter();
  const { category } = query as CategoryQuery;
  return (
    <Layouts>
      <Home>
        {category && (
          <CategoryList products={products} category={category.toUpperCase()} />
        )}
      </Home>
    </Layouts>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const snapshot = await firebaseDb.collection('products').get();
    const res = snapshot.docs.map((doc) => doc.data());
    const products: IProduct[] = JSON.parse(JSON.stringify(res));
    return {
      props: {
        products,
      },
    };
  } catch (e) {
    throw e;
  }
};
