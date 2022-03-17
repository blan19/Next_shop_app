import { FunctionComponent } from 'react';
import { ProductsLabel } from '.';

interface ProductsSizeProps {
  size: boolean;
  sizeInfo:
    | {
        size: string;
        detail_1: string;
        detail_2: string;
        detail_3: string;
        detail_4: string;
      }[]
    | null;
}

const ProductsSize: FunctionComponent<ProductsSizeProps> = ({
  size,
  sizeInfo,
}) => {
  return (
    <ProductsLabel>
      <h1 className="products-label">Size Info</h1>
      <div className="products-divide" />
      <div className="products-contents">
        <div className="products-contents-wrapper">
          <span>사이즈</span>
        </div>
        {size ? null : <b>단일 사이즈</b>}
      </div>
      {size && (
        <table className="products-size-table">
          <tbody>
            <th>cm</th>
            <th>총장</th>
            <th>어깨너비</th>
            <th>가슴단면</th>
            <th>소매길이</th>
            {sizeInfo?.map((item) => (
              <tr key={item.size}>
                <th>{item.size}</th>
                <td>{item.detail_1}</td>
                <td>{item.detail_2}</td>
                <td>{item.detail_3}</td>
                <td>{item.detail_4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ProductsLabel>
  );
};

export default ProductsSize;
