import React from 'react';
import {
  MdDashboardCustomize,
  MdOutlineReceiptLong,
  MdPayment,
} from 'react-icons/md';
import { AiFillEdit, AiFillFileAdd, AiOutlineUser } from 'react-icons/ai';

export const adminLink = [
  {
    id: '/admin/dashboard',
    name: '대시보드',
    path: '/admin/dashboard',
    icon: <MdDashboardCustomize />,
  },
  {
    id: '/admin/register',
    name: '상품등록',
    path: '/admin/register',
    icon: <AiFillFileAdd />,
  },
  {
    id: '/admin/edit',
    name: '상품수정',
    path: '/admin/edit',
    icon: <AiFillEdit />,
  },
  {
    id: '/admin/receipt',
    name: '결제내역',
    path: '/admin/receipt',
    icon: <MdOutlineReceiptLong />,
  },
];

export const profileLink = (id: string) => [
  {
    id: `/profile/[id]`,
    name: '프로필',
    path: `/profile/${id}`,
    icon: <AiOutlineUser />,
  },
  {
    id: `/profile/payments`,
    name: '결제내역',
    path: `/profile/payments`,
    icon: <MdPayment />,
  },
];
