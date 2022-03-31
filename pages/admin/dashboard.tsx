import AdminNoContents from '@/components/admin/AdminNoContents';
import Layouts from 'Layouts';
import React from 'react';
import { RegisterResponsive } from './register';
import { adminLink } from '@/utils/lib/navLink';
import NavBar from '@/components/admin/NavBar';

const DashBoard = () => {
  return (
    <Layouts
      title="dashboard"
      description="상품 관리를 위한 어드민 페이지"
      url={
        process.env.NEXT_PUBLIC_URL
          ? `${process.env.NEXT_PUBLIC_URL}/admin/dashboard`
          : 'http:localhost:3000'
      }
      image={null}
    >
      <RegisterResponsive>
        <NavBar link={adminLink} />
        <AdminNoContents />
      </RegisterResponsive>
    </Layouts>
  );
};

export default DashBoard;
