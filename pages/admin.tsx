import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Responsive from '@/utils/styles/Responsive';
import Layouts from '../Layouts';

const Admin = () => {
  const [mounted, setMounted] = useState(true);
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
