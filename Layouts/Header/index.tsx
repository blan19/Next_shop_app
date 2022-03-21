import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Responsive from '@/utils/styles/Responsive';
import styled from 'styled-components';
import {
  IoCartSharp,
  IoEllipsisVerticalSharp,
  IoPerson,
  IoHeartOutline,
  IoHeartSharp,
} from 'react-icons/io5';
import { RiAdminFill } from 'react-icons/ri';
import { flexCenter } from '@/utils/styles/Theme';
import { useRouter } from 'next/router';
import { hookAuth } from '@/utils/firebase/clientApp';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import useUser from '@/hooks/useUser';
const DarkToggle = dynamic(() => import('../../components/Common/DarkToggle'), {
  ssr: false,
});

const Header = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [more, setMore] = useState(false);
  const logout = useCallback(async () => {
    await axios.post('/api/logout', null);
    await signOut(hookAuth);
    mutateUser();
  }, [mutateUser]);
  const onPushAdmin = useCallback(() => {
    router.push('/admin/register');
  }, [router]);
  return (
    <HeaderContainer>
      <HeaderResponsive>
        <div className="left">
          <h1 onClick={() => router.push('/')}>Everything</h1>
        </div>
        <div className="right">
          <ul>
            {user?.isLoggedIn ? (
              <>
                <li>
                  {user.admin && (
                    <div className="header-hover-box">
                      <RiAdminFill onClick={onPushAdmin} />
                    </div>
                  )}
                </li>
                <li>
                  <div
                    className="header-hover-box header-like"
                    onClick={() => router.push('/wishlist')}
                  >
                    {visible ? (
                      <IoHeartSharp onMouseLeave={() => setVisible(false)} />
                    ) : (
                      <IoHeartOutline onMouseOver={() => setVisible(true)} />
                    )}
                  </div>
                </li>
                <li>
                  <div
                    className="header-cart-box"
                    onClick={() => router.push('/payment/cart')}
                  >
                    <IoCartSharp />
                  </div>
                </li>
                <li>
                  <div className="header-user">
                    <div
                      className="header-hover-box"
                      onClick={() => router.push('/profile')}
                    >
                      <IoPerson />
                    </div>
                    <div className="header-hover-box header-logout-box">
                      <IoEllipsisVerticalSharp
                        onClick={() => setMore((prev) => !prev)}
                      />
                      {more && (
                        <div className="header-logout-ab">
                          <span onClick={() => logout()}>logout</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <div className="header-cart-box">
                  <span onClick={() => router.push('/auth/login')}>login</span>
                </div>
              </li>
            )}
            <li>
              <label>
                <DarkToggle />
              </label>
            </li>
          </ul>
        </div>
      </HeaderResponsive>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: var(--color-bgColor);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const HeaderResponsive = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  @media screen and (max-width: 768px) {
    padding: 20px 2.5rem;
  }
  .left {
    h1 {
      cursor: pointer;
      font-size: 2.5rem;
      color: var(--color-primaryText);
    }
  }
  .right {
    ul {
      display: flex;
      align-items: center;
      li {
        ${flexCenter}
        .header-user {
          ${flexCenter}
        }
        .header-hover-box {
          padding: 7.5px;
          margin-left: 5px;
          border-radius: 6px;
          &:hover {
            background: var(--color-hoverColor);
          }
          svg {
            color: var(--color-primaryText);
          }
        }
        .header-hover-box.header-like {
          svg:hover {
            color: red;
          }
        }
        .header-logout-box {
          position: relative;
          .header-logout-ab {
            position: absolute;
            background: var(--color-subColor);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-radius: 4px;
            z-index: 999;
            padding: 1rem 2rem;
            top: 40px;
            left: -1.8rem;
            span {
              cursor: pointer;
              color: var(--color-primaryText);
              font-weight: bold;
              font-size: 1.25rem;
            }
          }
        }
        .header-cart-box {
          padding: 7.5px;
          margin-left: 5px;
          border-radius: 6px;
          background: var(--color-primaryText);
          svg {
            color: var(--color-rPrimaryText);
          }
          span {
            color: var(--color-rPrimaryText);
            font-weight: bold;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0 1rem;
          }
        }
        svg {
          font-size: 19px;
          cursor: pointer;
        }
        label {
          margin-left: 5px;
        }
      }
    }
  }
`;
