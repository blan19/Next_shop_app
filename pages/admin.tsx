import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Responsive from '@/utils/styles/Responsive';
import Layouts from '../Layouts';
import { firebaseAuth, firebaseDb, hookAuth } from '@/utils/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const Admin = () => {
  const [user] = useAuthState(hookAuth);
  const [mounted, setMounted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(async () => {
    if (mounted) {
      await firebaseDb.collection('users').doc(user?.uid).get();
    }
  }, []);

  return (
    <Layouts>
      <AdminResponsive>
        <h1>admin page</h1>
      </AdminResponsive>
    </Layouts>
  );
};

export default Admin;

const AdminResponsive = styled(Responsive)``;
