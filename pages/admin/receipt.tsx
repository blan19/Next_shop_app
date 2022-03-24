import AdminNoContents from '@/components/admin/AdminNoContents';
import Layouts from 'Layouts';
import React from 'react';
import { RegisterResponsive } from './register';
import { adminLink } from '@/utils/lib/navLink';
import NavBar from '@/components/admin/NavBar';

const Receipt = () => {
  return (
    <Layouts>
      <RegisterResponsive>
        <NavBar link={adminLink} />
        <AdminNoContents />
      </RegisterResponsive>
    </Layouts>
  );
};

export default Receipt;
