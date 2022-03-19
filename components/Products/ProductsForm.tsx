import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';
import { flexCenter } from '@/utils/styles/Theme';
import { IProduct } from '@/types/product.type';

interface ProductsFormProps {
  options: { value: string; label: string }[][] | null;
  product: IProduct;
}

const ProductsForm: FunctionComponent<ProductsFormProps> = ({
  options,
  product,
}) => {
  const method = useForm();
  const [cart, setCart] = useState<
    {
      title: string;
      option: { [x: string]: any } | null;
      price: string;
      count: number;
    }[]
  >(
    options
      ? []
      : [
          {
            title: product.title,
            option: null,
            price: product.price,
            count: 1,
          },
        ],
  );
  const onSubmit = method.handleSubmit(
    useCallback(
      (data) => {
        setCart((prev) =>
          prev.concat({
            title: product.title,
            option: data,
            price: product.price,
            count: 1,
          }),
        );
        if (options && options.length === 1) {
          options.map(() =>
            method.reset({
              [0]: null,
            }),
          );
        } else if (options && options.length === 2) {
          options?.map(() =>
            method.reset({
              [0]: null,
              [1]: null,
            }),
          );
        }
      },
      [method, options, product.price, product.title],
    ),
  );

  const customStyle = useMemo<StylesConfig>(
    () => ({
      control: (styles) => ({
        ...styles,
        backgroundColor: 'var(--color-bgColor)',
        color: 'var(--color-primaryText)',
        fontSize: '1rem',
        marginBottom: '2rem',
      }),
      option: (styles) => {
        return {
          ...styles,
          backgroundColor: 'var(--color-lightColor)',
        };
      },
      menu: (styles) => ({
        ...styles,
        background: 'var(--color-lightColor)',
      }),
      input: (styles) => ({
        ...styles,
        color: 'var(--color-primaryColor)',
      }),
      singleValue: (styles) => ({
        ...styles,
        color: 'var(--color-primaryColor)',
      }),
    }),
    [],
  );
  return (
    <FormProvider {...method}>
      <ProductsFormContainer onSubmit={onSubmit}>
        {options ? (
          <>
            {options.map((option, idx) => (
              <Controller
                key={idx}
                name={`${idx}`}
                control={method.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    styles={customStyle}
                    {...field}
                    options={option}
                    placeholder="옵션 선택"
                  />
                )}
              />
            ))}
            <div className="products-form-button-box">
              <ProductsFormButton>옵션 선택</ProductsFormButton>
            </div>
          </>
        ) : null}
        {cart &&
          cart.map((item) => (
            <div className="products-cart-container" key={item.title}>
              <h1>{item.title}</h1>
              <div className="products-cart-button">
                <button
                  disabled={item.count === 1 ? true : false}
                  onClick={() =>
                    setCart((prev) =>
                      prev.map((editItem) =>
                        editItem.title === item.title
                          ? {
                              ...editItem,
                              count: editItem.count--,
                            }
                          : editItem,
                      ),
                    )
                  }
                >
                  -
                </button>
                <b>{item.count}</b>
                <button
                  onClick={() =>
                    setCart((prev) =>
                      prev.map((editItem) =>
                        editItem.title === item.title
                          ? {
                              ...editItem,
                              count: editItem.count++,
                            }
                          : editItem,
                      ),
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </ProductsFormContainer>
    </FormProvider>
  );
};

export default ProductsForm;

const ProductsFormContainer = styled.form`
  .products-form-button-box {
    ${flexCenter}
  }
  .products-cart-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      color: var(--color-primaryText);
      font-size: 2rem;
    }
    .products-cart-button {
      ${flexCenter}
      button {
        border: 1px solid var(--color-lightColor);
        background: none;
        color: var(--color-primaryText);
        font-size: 2.5rem;
        padding: 0 1rem;
        margin: 0 1rem;
        cursor: pointer;
        font-weight: 200;
      }
      b {
        font-size: 2rem;
        color: var(--color-primaryText);
      }
    }
  }
`;

const ProductsFormButton = styled.button`
  outline: none;
  border: none;
  background: var(--color-mainColor);
  color: var(--color-rPrimaryText);
  font-weight: bold;
  padding: 1rem 3rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;
