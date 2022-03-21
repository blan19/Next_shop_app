import { ErrorMessage } from '@hookform/error-message';
import { FC, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { RegisterErrorMessage } from './RegisterForm';

interface RegisterFieldProps {
  name: string;
  mode: 'size' | 'option';
}

const RegisterField: FC<RegisterFieldProps> = ({ name, mode }) => {
  const {
    register,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();
  const option = watch('option');
  const size = watch('size');
  const { fields, remove, append } = useFieldArray({ control, name });

  useEffect(() => {
    if (mode === 'option') {
      append({ contents: '' });
    } else if (mode === 'size') {
      append({ size: '' });
    }

    return () => resetField(name);
  }, []);
  return (
    <RegisterFieldUl>
      {fields.map((item, idx) => (
        <li key={item.id}>
          {mode === 'option' && (
            <div className="field-option">
              <div className="field-option-wrapper">
                <span>옵션 </span>
                <RegisterFieldOptionInput
                  type="text"
                  {...register(`${name}.${idx}.contents`, {
                    required: option
                      ? { value: true, message: '상품옵션을 입력해주세요' }
                      : false,
                  })}
                />
              </div>
              <ErrorMessage
                name={`${name}.${idx}.contents`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <button type="button" onClick={() => remove(idx)}>
                취소
              </button>
            </div>
          )}
          {mode === 'size' && (
            <div className="field-size">
              <div className="field-size-wrapper">
                <span>사이즈 </span>
                <select
                  {...register(`${name}.${idx}.size`, {
                    required: size
                      ? { value: true, message: '사이즈를 선택해주세요.' }
                      : false,
                  })}
                >
                  <option defaultChecked value="S">
                    S
                  </option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <ErrorMessage
                name={`${name}.${idx}.size`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <div className="field-size-wrapper">
                <span>총장 </span>
                <RegisterFieldOptionInput
                  type="number"
                  step="0.1"
                  onWheelCapture={(e) => e.currentTarget.blur()}
                  {...register(`${name}.${idx}.detail_1`, {
                    required: size
                      ? { value: true, message: '총장을 입력해주세요.' }
                      : false,
                  })}
                />
              </div>
              <ErrorMessage
                name={`${name}.${idx}.detail_1`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <div className="field-size-wrapper">
                <span>어깨너비 </span>
                <RegisterFieldOptionInput
                  type="number"
                  step="0.1"
                  onWheelCapture={(e) => e.currentTarget.blur()}
                  {...register(`${name}.${idx}.detail_2`, {
                    required: size
                      ? { value: true, message: '어꺠너비을 입력해주세요.' }
                      : false,
                  })}
                />
              </div>
              <ErrorMessage
                name={`${name}.${idx}.detail_2`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <div className="field-size-wrapper">
                <span>가슴단면 </span>
                <RegisterFieldOptionInput
                  type="number"
                  step="0.1"
                  onWheelCapture={(e) => e.currentTarget.blur()}
                  {...register(`${name}.${idx}.detail_3`, {
                    required: size
                      ? { value: true, message: '가슴단면을 입력해주세요.' }
                      : false,
                  })}
                />
              </div>
              <ErrorMessage
                name={`${name}.${idx}.detail_3`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <div className="field-size-wrapper">
                <span>소매길이 </span>
                <RegisterFieldOptionInput
                  type="number"
                  step="0.1"
                  onWheelCapture={(e) => e.currentTarget.blur()}
                  {...register(`${name}.${idx}.detail_4`, {
                    required: size
                      ? { value: true, message: '소매길이을 입력해주세요.' }
                      : false,
                  })}
                />
              </div>
              <ErrorMessage
                name={`${name}.${idx}.detail_4`}
                errors={errors}
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
              <button type="button" onClick={() => remove(idx)}>
                취소
              </button>
            </div>
          )}
        </li>
      ))}
      {mode === 'option' && (
        <button
          className="field-append"
          type="button"
          onClick={() => append({ contents: '' })}
        >
          추가
        </button>
      )}
      {mode === 'size' && (
        <button
          className="field-append"
          type="button"
          onClick={() => append({ size: '' })}
        >
          추가
        </button>
      )}
    </RegisterFieldUl>
  );
};

export default RegisterField;

const RegisterFieldUl = styled.ul`
  li {
    padding-top: 1rem;

    .field-option {
      display: flex;
      button {
      }
    }
    .field-size,
    .field-option {
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem;
      border-radius: 5px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      .field-size-wrapper,
      .field-option-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        span {
          width: 7rem;
          font-weight: bold;
          font-size: 1rem;
          color: var(--color-primaryText);
        }
      }
      button {
        outline: none;
        border: none;

        background: var(--color-mainColor);
        color: var(--color-rPrimaryText);
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 0.5rem 0;
      }
    }
  }
  .field-append {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    color: var(--color-primaryText);
    margin-top: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem 3.5rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const RegisterFieldOptionInput = styled.input`
  outline: none;
  background: none;
  border: none;

  width: 100%;
  height: 3rem;

  color: var(--color-primaryText);
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-mainColor);
`;
