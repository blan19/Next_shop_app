import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layouts from 'Layouts';
import AdminNav from '@/components/admin/AdminNav';
import { RegisterResponsive } from './register';
import EditProductList from '@/components/admin/Edit/EditProductList';
import useSWR from 'swr';
import { IProduct } from '@/types/product.type';

const Edit = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: products, mutate: mutateProducts } = useSWR<IProduct[]>(
    '/api/products/product',
  );
  const router = useRouter();
  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push('/');
    }
    if (!user.admin) {
      router.push('/');
    }
  }, [router, user.admin, user.isLoggedIn]);
  return (
    <Layouts>
      <RegisterResponsive>
        <AdminNav />
        {products ? (
          <EditProductList mutate={mutateProducts} products={products} />
        ) : null}
      </RegisterResponsive>
    </Layouts>
  );
};

export default Edit;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;
  if (user === undefined) {
    res.setHeader('location', '/auth/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, email: '', uid: '', admin: false },
      },
    };
  }
  if (user.email === process.env.NEXT_PRIVATE_ADMIN_EMAIL) {
    return {
      props: {
        user: { ...req.session.user, admin: true },
      },
    };
  } else {
    return {
      props: {
        user: { ...req.session.user, admin: false },
      },
    };
  }
},
sessionOptions);
