import AdminNav from '@/components/admin/AdminNav';
import AdminNoContents from '@/components/admin/AdminNoContents';
import Layouts from 'Layouts';
import React from 'react';
import { RegisterResponsive } from './register';

const DashBoard = () => {
  return (
    <Layouts>
      <RegisterResponsive>
        <AdminNav />
        <AdminNoContents />
      </RegisterResponsive>
    </Layouts>
  );
};

export default DashBoard;
