import { FunctionComponent, useCallback, useState } from 'react';
import { IProduct } from '@/types/product.type';
import styled from 'styled-components';
import Thumbnail from '@/components/Common/Thumbnail';
import { MdPointOfSale } from 'react-icons/md';
import fetchJson from '@/utils/lib/fetchJson';
import { KeyedMutator } from 'swr';
import Modal from '@/components/Common/Modal';

interface EditProductItemProps {
  product: IProduct;
  mutate: KeyedMutator<IProduct[]>;
}

const EditProductItem: FunctionComponent<EditProductItemProps> = ({
  product,
  mutate,
}) => {
  const [visible, setVisible] = useState(false);
  const onProductToClear = useCallback(
    async (uid: string, clear: boolean) => {
      if (!uid) return;
      const body = {
        uid,
        clear,
      };
      await fetchJson('/api/products/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(() => mutate())
        .catch((error) => console.error(error));
    },
    [mutate],
  );
  const onProductDelete = useCallback(
    async (uid: string) => {
      if (!uid) return;
      const body = {
        uid,
      };
      await fetchJson('/api/products/edit', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(() => mutate())
        .catch((error) => console.error(error));
    },
    [mutate],
  );
  return (
    <EditProductItemContainer>
      <Thumbnail width="400px" height="400px" images={product.thumbPath} />
      <div className="product-item-wrapper">
        <h1>{product.title}</h1>
        <p>
          <MdPointOfSale />
          <span>
            판매: <b>0</b>
          </span>
        </p>
        {product.clear ? (
          <button
            className="product-item-clear"
            onClick={() => onProductToClear(product.uid, product.clear)}
          >
            품절취소
          </button>
        ) : (
          <button onClick={() => onProductToClear(product.uid, product.clear)}>
            품절
          </button>
        )}
        <button onClick={() => setVisible(true)}>등록취소</button>
      </div>
      <Modal visible={visible} setVisible={setVisible}>
        <h1>정말 상품 등록을 취소하시겠습니까?</h1>
        <div className="modal-button">
          <button onClick={() => onProductDelete(product.uid)}>등록취소</button>
          <button onClick={() => setVisible((prev) => !prev)}>돌아가기</button>
        </div>
      </Modal>
    </EditProductItemContainer>
  );
};

export default EditProductItem;

const EditProductItemContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 0.5rem;
  .product-item-wrapper {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    h1 {
      margin-top: 1rem;
      font-size: 1.5rem;
      color: var(--color-primaryText);
    }
    p {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: var(--color-subText);
      svg {
        font-size: 1.75rem;
      }
      span {
        padding-left: 0.5rem;
        font-size: 1.25rem;
        b {
        }
      }
    }
    button {
      outline: none;
      background: none;
      border: none;
      font-size: 1.25rem;
      background: var(--color-mainColor);
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-weight: bold;
      color: var(--color-rPrimaryText);
      border-radius: 0.5rem;
      cursor: pointer;
    }
    button.product-item-clear {
      background: var(--color-subColor);
      color: var(--color-primaryText);
    }
  }
`;
