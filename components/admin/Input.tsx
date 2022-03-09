// components/FormComponents/Input.tsx
import React from 'react';
import { useFormContext, ValidationRule, FieldError } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FaInfoCircle } from 'react-icons/fa';

export const get = (
  errors: DeepMap<Record<string, any>, FieldError>,
  name: string,
): FieldError => {
  const result = name.split('.').reduce((prev, cur) => prev?.[cur], errors);
  return result;
};

export interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  validate?: ValidationRule;
}

const Input: React.FC<IInputProps> = (props) => {
  const { name, label = name, validate } = props;
  const { errors, register } = useFormContext();
  const errorMessage = get(errors, name)?.message;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...props} id={name} {...register(validate)} />
      {errorMessage && (
        <p>
          <FaInfoCircle /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
