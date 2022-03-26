import Link from 'next/link';
import styled from 'styled-components';
import { GiClothes } from 'react-icons/gi';
import { MdFlatware, MdHouse, MdEmojiSymbols } from 'react-icons/md';
import { useEffect, useState } from 'react';

const navLink = [
  {
    id: '/',
    name: 'Home',
    path: '/',
    icon: <MdHouse />,
  },
  {
    id: '/category/clothes',
    name: 'Clothes',
    path: '/category/clothes',
    icon: <GiClothes />,
  },
  {
    id: '/category/acc',
    name: 'Acc',
    path: '/category/acc',
    icon: <MdEmojiSymbols />,
  },
  {
    id: '/category/food',
    name: 'Food',
    path: '/category/food',
    icon: <MdFlatware />,
  },
];
const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
    <NavBarNavigation>
      {navLink.map((link) => (
        <Link key={link.id} href={link.path} passHref>
          <div
            className={
              window.location.pathname === link.path
                ? 'home-nav-link home-nav-active'
                : 'home-nav-link'
            }
          >
            <span>{link.name}</span>
            {link.icon}
          </div>
        </Link>
      ))}
    </NavBarNavigation>
  ) : null;
};

export default NavBar;

const NavBarNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    .home-nav-link {
      margin-right: 1rem;
    }
  }
  .home-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 14rem;
    background: var(--color-subColor);
    color: var(--color-subText);
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    span {
      font-size: 1.75rem;
      font-weight: bold;
    }
    svg {
      font-size: 2.5rem;
    }
  }
  .home-nav-link.home-nav-active {
    background: var(--color-mainColor);
    color: var(--color-rPrimaryText);
  }
`;
