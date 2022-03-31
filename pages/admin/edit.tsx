import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layouts from 'Layouts';
import { RegisterResponsive } from './register';
import EditProductList from '@/components/admin/Edit/EditProductList';
import useSWR from 'swr';
import { IProduct } from '@/types/product.type';
import { adminLink } from '@/utils/lib/navLink';
import NavBar from '@/components/admin/NavBar';

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
    <Layouts
      title="Edit"
      description="상품 관리를 위한 어드민 페이지"
      url={
        process.env.NEXT_PUBLIC_URL
          ? `${process.env.NEXT_PUBLIC_URL}/admin/edit`
          : 'http:localhost:3000'
      }
      image={null}
    >
      <RegisterResponsive>
        <NavBar link={adminLink} />
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
