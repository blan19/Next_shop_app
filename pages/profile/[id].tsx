import NavBar from '@/components/admin/NavBar';
import ProfileUserForm from '@/components/Profile/ProfileUserForm';
import useUser from '@/hooks/useUser';
import { IFirebaseUser } from '@/types/auth.type';
import { firebaseDb } from '@/utils/firebase/clientApp';
import { profileLink } from '@/utils/lib/navLink';
import Responsive from '@/utils/styles/Responsive';
import Layouts from 'Layouts';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import styled from 'styled-components';

interface ProfileQuery extends ParsedUrlQuery {
  id: string;
}

const Profile = ({
  id,
  user: firebaseUser,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      if (!user.isLoggedIn) {
        router.push('/');
      }
    }
  }, [router, user]);
  return (
    <Layouts
      title={firebaseUser.email}
      description={`${firebaseUser.email} 프로필`}
      image={null}
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
    >
      <ProfileResponsive>
        <NavBar link={profileLink(id)} />
        <ProfileUserForm user={firebaseUser} mutate={mutateUser} />
      </ProfileResponsive>
    </Layouts>
  );
};

export default Profile;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const snapsoht = await firebaseDb.collection('users').get();
    const res = snapsoht.docs.map((doc) => doc.data());
    const users: IFirebaseUser[] = JSON.parse(JSON.stringify(res));
    const paths = users.map((user) => ({
      params: {
        id: user.uid,
      },
    }));
    return { paths, fallback: false };
  } catch (e) {
    throw e;
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as ProfileQuery;
  const snapshot = await firebaseDb.collection('users').doc(id).get();
  const user: IFirebaseUser = JSON.parse(JSON.stringify(snapshot.data()));
  return {
    props: {
      id,
      user,
    },
  };
};

export const ProfileResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
