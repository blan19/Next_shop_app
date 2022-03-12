import { FunctionComponent } from 'react';
import { IProduct } from '@/types/product.type';
import styled from 'styled-components';
import EditProductItemImage from './EditProductItemImage';
import { Swiper } from 'swiper/react';

interface EditProductItemProps {
  product: IProduct;
}

const EditProductItem: FunctionComponent<EditProductItemProps> = ({
  product,
}) => {
  return (
    <EditProductItemContainer>
      <h1>{product.title}</h1>
      <EditProductItemImageSwiper className="admin-edit-swiper">
        <EditProductItemImage />
      </EditProductItemImageSwiper>
    </EditProductItemContainer>
  );
};

export default EditProductItem;

const EditProductItemContainer = styled.div``;

const EditProductItemImageSwiper = styled(Swiper)``;
