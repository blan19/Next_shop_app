import Responsive from '@/utils/styles/Responsive';
import React, { useState } from 'react';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import {
  IoCartSharp,
  IoEllipsisVerticalSharp,
  IoPerson,
  IoHeartOutline,
  IoHeartSharp,
} from 'react-icons/io5';
import Switch from 'react-switch';
import { flexCenter } from '@/utils/styles/Theme';

const Header = () => {
  const darkMode = useDarkMode(false);
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
                <Switch
                  checked={darkMode.value}
                  onChange={() => darkMode.toggle()}
                  width={50}
                  height={25}
                  handleDiameter={18}
                  offColor="#D2D2D2"
                  onColor="#F1C945"
                />
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
  background: ${(props) => props.theme.bgColor};
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
      color: ${(props) => props.theme.fontColor};
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
            background: ${(props) => props.theme.hoverColor};
          }
          svg {
            color: ${(props) => props.theme.fontColor};
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
          background: ${(props) => props.theme.fontColor};
          svg {
            color: ${(props) => props.theme.rFontColor};
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
