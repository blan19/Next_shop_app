import { FC, useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import RegisterDelivery from './RegisterDelivery';
import RegisterField from './RegisterField';
import ThumbInput from './ThumbInput';
import { ErrorMessage } from '@hookform/error-message';
import {
  firebaseDb,
  firebaseStorage,
  uploadBytesResumable,
} from '@/utils/firebase/clientApp';
import RegisterLoading from './RegisterLoading';
import { getDownloadURL, UploadTaskSnapshot } from 'firebase/storage';
import { uid } from 'uid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDarkMode from 'use-dark-mode';

type sizeDetailType = {
  detail_1: string;
  detail_2: string;
  detail_3: string;
  detail_4: string;
  size: string;
};

type optionDetailType = {
  contents: string;
};

interface RegisterFormTpyes {
  title: string;
  thumbnail: File[];
  productInfo: File[];
  price: string;
  size: boolean;
  sizeDetail: sizeDetailType[];
  option: boolean;
  optionDetail: optionDetailType[];
  category: string;
  delivery: {
    costCheck: boolean;
    cost: string;
    company: string;
  };
}

const RegisterForm: FC = () => {
  const { value: darkMode } = useDarkMode(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm<RegisterFormTpyes>({
    mode: 'onBlur',
  });
  const {
    formState: { errors },
  } = methods;
  const uploadTaskPromise = (path: string, images: File[] | undefined) => {
    return new Promise((resolve) => {
      if (!images) return;
      const url = images.map((file) => {
        return new Promise((resolver, reject) => {
          const storageRef = firebaseStorage.ref(`${path}${file.name}`);
          uploadBytesResumable(storageRef, file, {
            contentType: file.type,
          }).on(
            'state_changed',
            (snapshot: UploadTaskSnapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              console.log(error);
              reject();
            },
            () => {
              getDownloadURL(storageRef).then((url) => resolver(url));
            },
          );
        });
      });
      resolve(Promise.all(url));
    });
  };
  const onSubmit = methods.handleSubmit(
    useCallback(
      async (data) => {
        const {
          title,
          thumbnail,
          productInfo,
          price,
          size,
          sizeDetail,
          option,
          optionDetail,
          category,
          delivery: { costCheck, cost, company },
        } = data;
        setLoading(true);
        try {
          const thumbUrl = await uploadTaskPromise('Thumbnail/', thumbnail);
          if (productInfo !== undefined) {
            const infoUrl = await uploadTaskPromise('Info/', productInfo);
            await firebaseDb
              .collection('products')
              .doc(uid(24))
              .set({
                title,
                price,
                thumbPath: thumbUrl,
                infoPath: infoUrl,
                size,
                sizeInfo: size ? sizeDetail : null,
                option,
                optionInfo: option ? optionDetail : null,
                category,
                deliveryFree: costCheck,
                deliveryCost: costCheck ? cost : null,
                deliveryCompany: company,
                clear: false,
              })
              .then(() => {
                setLoading(false);
                methods.reset();
                toast('등록을 완료했습니다.', {
                  position: 'top-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeButton: false,
                  theme: darkMode ? 'dark' : 'light',
                  style: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: 'var(--color-primaryText)',
                    borderRadius: '0.5rem',
                  },
                });
              })
              .catch((e) => console.log(e));
          }
          await firebaseDb
            .collection('products')
            .doc(uid(24))
            .set({
              title,
              price,
              thumbPath: thumbUrl,
              infoPath: null,
              size,
              sizeInfo: size ? sizeDetail : null,
              option,
              optionInfo: option ? optionDetail : null,
              category,
              deliveryFree: costCheck,
              deliveryCost: costCheck ? cost : null,
              deliveryCompany: company,
              clear: false,
            })
            .then(() => {
              setLoading(false);
              methods.reset();
              toast('등록을 완료했습니다.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false,
                theme: darkMode ? 'dark' : 'light',
                style: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: 'var(--color-primaryText)',
                  borderRadius: '0.5rem',
                },
              });
            })
            .catch((e) => console.log(e));
        } catch (e) {
          console.error(e);
        }
      },
      [darkMode, methods],
    ),
  );
  const option = methods.watch('option');
  const size = methods.watch('size');

  useEffect(() => {
    return () => methods.reset();
  }, [methods]);
  return (
    <>
      <FormProvider {...methods}>
        <RegisterFormContainer onSubmit={onSubmit}>
          <div className="register-left">
            <label>
              <span className="register-label">상품명</span>
              <RegisterInputStyles
                {...methods.register('title', {
                  required: '상품명을 입력해주세요.',
                })}
                type="text"
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
            </label>
            <label>
              <span className="register-label">썸네일</span>
              <ThumbInput
                accept="image/png, image/jpg, image/jpeg"
                multiple
                name="thumbnail"
                mode="append"
              />
              <ErrorMessage
                errors={errors}
                name="thumbnail"
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
            </label>
            <label>
              <span className="register-label">상품 Information</span>
              <ThumbInput
                accept="image/png, image/jpg, image/jpeg"
                multiple
                name="productInfo"
                mode="append"
              />
            </label>
            <label>
              <span className="register-label">가격</span>
              <RegisterInputStyles
                {...methods.register('price', {
                  required: {
                    value: true,
                    message: '상품가격을 입력해주세요.',
                  },
                })}
                type="number"
              />
              <ErrorMessage
                errors={errors}
                name="price"
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
            </label>
          </div>
          <div className="register-right">
            <div className="register-option">
              <span className="register-label">옵션</span>
              <input
                type="checkbox"
                {...methods.register('option')}
                id="option"
              />
              <label htmlFor="option" />
              {option && <RegisterField mode="option" name="optionDetail" />}
            </div>
            <div className="register-size">
              <span className="register-label">사이즈</span>
              <input type="checkbox" {...methods.register('size')} id="size" />
              <label htmlFor="size" />
              {size && <RegisterField mode="size" name="sizeDetail" />}
            </div>
            <div className="register-category">
              <span className="register-label">카테고리</span>
              <select
                {...methods.register('category', {
                  required: {
                    value: true,
                    message: '카테고리를 선택해주세요.',
                  },
                })}
              >
                <option value="CLOTHES">CLOTHES</option>
                <option value="ACC">ACC</option>
                <option value="Food">Food</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="category"
                render={({ message }) => (
                  <RegisterErrorMessage>❌ {message}</RegisterErrorMessage>
                )}
              />
            </div>
            <div className="register-delivery">
              <span className="register-label">배송</span>
              <div className="register-delivery-wrapper">
                <span>무료/유료 </span>
                <input
                  type="checkbox"
                  {...methods.register('delivery.costCheck')}
                  id="delivery"
                />
                <label htmlFor="delivery" />
              </div>
              <RegisterDelivery />
            </div>
          </div>
          <div className="register-submit-button">
            <button type="submit">등록</button>
          </div>
        </RegisterFormContainer>
      </FormProvider>
      {loading && (
        <RegisterLoading
          type="spinningBubbles"
          color="#fff"
          width="64px"
          height="64px"
        />
      )}
      <ToastContainer />
    </>
  );
};

export default RegisterForm;

const RegisterFormContainer = styled.form`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  .register-label {
    position: relative;
    font-weight: bold;
    font-size: 2rem;
    padding-bottom: 1.5rem;
    color: var(--color-primaryText);
  }
  .register-label:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0.1rem;
    top: 2.75rem;
    background: var(--color-mainColor);
  }

  .register-left {
    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
  }
  .register-right {
    .register-category {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
    .register-size,
    .register-option,
    .register-delivery {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
      .register-delivery-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        span {
          width: 6rem;
          font-weight: bold;
          color: var(--color-primaryText);
        }
      }
      input[type='checkbox'] {
        display: none;
      }
      input[type='checkbox'] + label {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        border: 2px solid var(--color-mainColor);
        border-radius: 0.5rem;
        position: relative;
      }
      input[id='size']:checked + label::after,
      input[id='option']:checked + label::after,
      input[id='delivery']:checked + label::after {
        content: '✔';
        font-size: 1.5rem;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .register-submit-button {
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;
    button {
      outline: none;
      border: none;

      background: var(--color-mainColor);
      color: var(--color-rPrimaryText);
      padding: 0.5rem 2rem;
      border-radius: 0.5rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export const RegisterInputStyles = styled.input`
  outline: none;
  background: none;
  border: none;

  background: var(--color-mainColor);
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;

  color: var(--color-rPrimaryText);
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 1rem;
`;

export const RegisterErrorMessage = styled.div`
  padding: 1rem 0;
  font-weight: bold;
  font-size: 1.5rem;
  color: red;
`;
