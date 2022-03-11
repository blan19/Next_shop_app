import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useState } from 'react';

interface SelectProps {
  value: string;
  label: string;
}

const options = [
  {
    value: 'ALL',
    label: 'All',
  },
  {
    value: 'CLOTHES',
    label: 'Clothes',
  },
  {
    value: 'ACC',
    label: 'Acc',
  },
  {
    value: 'FOOD',
    label: 'Food',
  },
];

const adminLink = [
  {
    id: '/admin/register',
    name: '상품등록',
    path: '/admin/register',
  },
  {
    id: '/admin/edit',
    name: '상품수정',
    path: '/admin/edit',
  },
];

const AdminNav = () => {
  const [select, setSelect] = useState<SelectProps>({
    value: 'ALL',
    label: 'All',
  });
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  return (
    <AdminNavContainer>
      {adminLink.map((link) => (
        <Link key={link.id} href={link.path} passHref>
          <div
            className={
              router.pathname === link.path
                ? 'admin-nav-wrapper admin-nav-active'
                : 'admin-nav-wrapper'
            }
          >
            <div className="admin-nav-link">
              {link.path === '/admin/register' ? (
                <AiFillFileAdd />
              ) : (
                <AiFillEdit />
              )}
              <a>{link.name}</a>
            </div>
            <div className="divider" />
          </div>
        </Link>
      ))}
      {router.pathname === '/admin/edit' && (
        <div className="admin-nav-select-container">
          <div
            onClick={() => setVisible((prev) => !prev)}
            className="admin-nav-select"
          >
            <span>{select.label}</span>
            <MdOutlineArrowDropDown />
          </div>
          {visible && (
            <div className="admin-nav-option">
              {options.map((value) => (
                <span
                  onClick={() => {
                    setSelect(value);
                    setVisible(false);
                  }}
                  key={value.value}
                >
                  {value.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminNavContainer>
  );
};

export default AdminNav;

const AdminNavContainer = styled.nav`
  display: flex;
  margin-bottom: 2.25rem;
  .admin-nav-wrapper {
    padding-right: 2rem;
    .admin-nav-link {
      display: flex;
      align-items: center;
      font-size: 1.75rem;
      color: var(--color-subText);
      a {
        padding-left: 0.75rem;
      }
    }
  }
  .admin-nav-wrapper.admin-nav-active {
    .admin-nav-link {
      color: var(--color-primaryText);
      a {
        font-weight: bold;
      }
    }
    .divider {
      width: 100%;
      height: 2px;
      background: var(--color-primaryText);
      margin-top: 0.75rem;
    }
  }
  .admin-nav-select-container {
    position: relative;
    .admin-nav-select {
      width: 85px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--color-subColor);
      border-radius: 4px;
      cursor: pointer;
      color: var(--color-primaryText);
      span {
        font-size: 12.5px;
        padding-left: 5px;
      }
      svg {
        font-size: 20px;
      }
    }
    .admin-nav-option {
      position: absolute;
      top: 35px;
      display: flex;
      flex-direction: column;
      width: 85px;
      padding: 5px 0;
      background: var(--color-subColor);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      border-radius: 4px;
      span {
        color: var(--color-primaryText);
        font-size: 10px;
        padding-left: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;
