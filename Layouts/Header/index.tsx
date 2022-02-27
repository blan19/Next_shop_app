import React, { useState } from 'react';
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
import { flexCenter } from '@/utils/styles/Theme';
const DarkToggle = dynamic(() => import('../../components/Common/DarkToggle'), {
  ssr: false,
});

const Header = () => {
  const [visible, setVisible] = useState(false);
  return (
    <HeaderContainer>
      <HeaderResponsive>
        <div className="left">
          <h1>Everything</h1>
        </div>
        <div className="right">
          <ul>
            <li>
              <div className="header-hover-box header-like">
                {visible ? (
                  <IoHeartSharp onMouseLeave={() => setVisible(false)} />
                ) : (
                  <IoHeartOutline onMouseOver={() => setVisible(true)} />
                )}
              </div>
            </li>
            <li>
              <div className="header-cart-box">
                <IoCartSharp />
              </div>
            </li>
            <li>
              <div className="header-user">
                <div className="header-hover-box">
                  <IoPerson />
                </div>
                <div className="header-hover-box">
                  <IoEllipsisVerticalSharp />
                </div>
              </div>
            </li>
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
  .left {
    h1 {
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
        .header-cart-box {
          padding: 7.5px;
          margin-left: 5px;
          border-radius: 6px;
          background: var(--color-primaryText);
          svg {
            color: var(--color-rPrimaryText);
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
