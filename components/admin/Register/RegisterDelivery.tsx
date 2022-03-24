import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { RegisterErrorMessage } from './RegisterForm';

const RegisterDelivery = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const cost = watch('delivery.costCheck');
  return (
    <RegisterDeliveryContainer>
      {cost && (
        <div className="register-delivery-wrapper">
          <span>택배비 </span>
          <input
            type="number"
            onWheelCapture={(e) => e.currentTarget.blur()}
            {...register('delivery.cost', {
              required: cost
                ? { value: true, message: '택배비용을 입력해주세요' }
                : false,
            })}
          />
        </div>
      )}
      <ErrorMessage
        errors={errors}
        name="delivery.cost"
        render={({ message }) => (
          <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
        )}
      />
      <div className="register-delivery-wrapper">
        <span>택배사 </span>
        <select
          {...register('delivery.company', {
            required: { value: true, message: '택배사를 선택해주세요.' },
          })}
        >
          <option defaultChecked value="우체국">
            우체국
          </option>
          <option value="CJ">CJ</option>
          <option value="롯데">롯데</option>
        </select>
      </div>
      <ErrorMessage
        errors={errors}
        name="delivery.company"
        render={({ message }) => (
          <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
        )}
      />
    </RegisterDeliveryContainer>
  );
};

export default RegisterDelivery;

const RegisterDeliveryContainer = styled.div`
  .register-delivery-wrapper {
    display: flex;
    align-items: center;
    span {
      width: 6rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--color-primaryText);
    }
    select {
      width: 8rem;
      font-size: 1.25rem;
    }
    input {
      outline: none;
      background: none;
      border: none;
      height: 3rem;
      color: var(--color-primaryText);
      font-size: 1.5rem;
      font-weight: bold;
      border-bottom: 1px solid var(--color-mainColor);
    }
  }
`;
