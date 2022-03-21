import styled from 'styled-components';

const CartList = () => {
  return (
    <CartListContainer>
      <div className="cart-list-head">
        <span>전체삭제</span>
      </div>
      <h1>Cart List</h1>
    </CartListContainer>
  );
};

export default CartList;

const CartListContainer = styled.div`
  .cart-list-head {
    margin-bottom: 2rem;
    span {
      cursor: pointer;
      color: var(--color-subText);
      font-size: 1.5rem;
      border-bottom: 1.5px solid var(--color-subText);
    }
  }
`;
