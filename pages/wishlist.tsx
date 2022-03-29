import WishListProduct from '@/components/WishList/WishListProduct';
import Responsive from '@/utils/styles/Responsive';
import Layouts from 'Layouts';
import styled from 'styled-components';

const WishList = () => {
  return (
    <Layouts
      title="위시리스트"
      description="위시리스트 조회를 위한 페이지"
      image={null}
      url={
        process.env.NEXT_PUBLIC_URL
          ? process.env.NEXT_PUBLIC_URL
          : 'https://localhost:3000'
      }
    >
      <WishListResponsive>
        <div className="list-info">
          <h1>위시리스트</h1>
        </div>
        <WishListProduct />
      </WishListResponsive>
    </Layouts>
  );
};

export default WishList;

export const WishListResponsive = styled(Responsive)`
  margin-top: 3rem;
  .list-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5rem;
    h1 {
      position: relative;
      font-size: 4rem;
      color: var(--color-primaryText);
    }
    h1:after {
      content: '';
      display: block;
      width: 100%;
      height: 4px;
      position: absolute;
      left: 0.1rem;
      top: 5rem;
      background: var(--color-mainColor);
    }
  }
`;
