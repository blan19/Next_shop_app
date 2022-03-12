import AdminNav from '@/components/admin/AdminNav';
import Layouts from 'Layouts';
import React from 'react';
import { RegisterResponsive } from './register';

const dasgboard = () => {
  return (
    <Layouts>
      <RegisterResponsive>
        <AdminNav />
        <h1>DashBoard</h1>
      </RegisterResponsive>
    </Layouts>
  );
};

export default dasgboard;
