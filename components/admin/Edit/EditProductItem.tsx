import { IProduct } from '@/types/product.type';
import React, { FunctionComponent } from 'react';

interface EditProductItemProps {
  product: IProduct;
}

const EditProductItem: FunctionComponent<EditProductItemProps> = ({
  product,
}) => {
  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
};

export default EditProductItem;
