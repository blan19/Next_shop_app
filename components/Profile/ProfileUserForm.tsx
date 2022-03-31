import { IFirebaseUser } from '@/types/auth.type';
import { flexCenter, flexColCenter } from '@/utils/styles/Theme';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from 'pages/api/user';
import { FunctionComponent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { KeyedMutator } from 'swr';
import useDarkMode from 'use-dark-mode';
import Modal from '../Common/Modal';

interface FormTypes {
  name: string;
  address: string;
}

interface ProfileUserFormProps {
  user: IFirebaseUser;
  mutate: KeyedMutator<User>;
}

const ProfileUserForm: FunctionComponent<ProfileUserFormProps> = ({
  user,
  mutate,
}) => {
  const router = useRouter();
  const darkMode = useDarkMode();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>();
  const [visible, setVisible] = useState(false);
  const onSubmit = useCallback(
    async (data: FormTypes) => {
      const { name, address } = data;
      await axios({
        url: '/api/edit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ name, address }),
      })
        .then(async (res) => {
          toast('등록을 완료했습니다.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            theme: darkMode.value ? 'dark' : 'light',
            style: {
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: 'var(--color-primaryText)',
              borderRadius: '0.5rem',
            },
          });
          mutate();
        })
        .catch((error) => console.error(error));
    },
    [darkMode.value, mutate],
  );
  const onDelete = useCallback(async () => {
    await axios('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ userUid: user.uid }),
    })
      .then(async (res) => {
        await axios.get('/api/logout');
        mutate();
        router.push('/');
      })
      .catch((error) => console.error(error));
  }, [mutate, router, user.uid]);
  return (
    <>
      <ProfileUserFormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-user-wrapper">
          <div className="profile-user-email">
            <FaUserCircle />
            <h1>{user.email}</h1>
          </div>
          <div className="profile-user-info">
            <p>이름</p>
            <label>
              <input
                type="text"
                defaultValue={user.name}
                {...register('name', { required: '이름을 적어주세요' })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <ProfileUserFormError>
                  <b>❌ {message}</b>
                </ProfileUserFormError>
              )}
            />
            <p>주소</p>
            <label>
              <input
                type="text"
                defaultValue={user.address}
                {...register('address', { required: '주소를 적어주세요' })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <ProfileUserFormError>
                  <b>❌ {message}</b>
                </ProfileUserFormError>
              )}
            />
          </div>
          <div className="profile-user-button">
            <button
              type="button"
              className="profile-user-button-delete"
              onClick={() => setVisible(true)}
            >
              Delete
            </button>
            <button type="submit">Edit</button>
          </div>
        </div>
      </ProfileUserFormContainer>
      <ToastContainer />
      <Modal visible={visible} setVisible={setVisible}>
        <h1>정말로 계정을 삭제하시겠습니까?</h1>
        <div className="modal-button">
          <button onClick={onDelete}>계정삭제</button>
          <button onClick={() => setVisible((prev) => !prev)}>돌아가기</button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileUserForm;

const ProfileUserFormContainer = styled.form`
  ${flexCenter}
  .profile-user-wrapper {
    width: 50rem;
    display: flex;
    flex-direction: column;
    .profile-user-email {
      width: 100%;
      ${flexColCenter}
      color: var(--color-primaryText);
      svg {
        font-size: 10rem;
      }
      h1 {
        margin-top: 1rem;
        font-size: 3.5rem;
        font-weight: 500;
      }
    }
    .profile-user-info {
      margin-top: 3rem;
      p {
        color: var(--color-primaryText);
        font-size: 2rem;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
      }
      label {
      }
      input {
        width: 100%;
        border: 1px solid var(--color-subColor);
        background: var(--color-lightColor);
        color: #000;
        padding: 0.5rem 1rem;
        font-size: 2rem;
        font-weight: 300;
        border-radius: 0.5rem;
        &:focus {
          outline: 1px solid var(--color-mainColor);
        }
      }
    }
    .profile-user-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5rem;
      button {
        cursor: pointer;
        border: 1px solid var(--color-subColor);
        background: var(--color-lightColor);
        outline: none;
        padding: 1rem;
        font-size: 1.5rem;
        color: #000;
        font-weight: 300;
        border-radius: 0.5rem;
        &:hover {
          border: 1px solid var(--color-subText);
        }
      }
      button.profile-user-button-delete {
        background: red;
        border: none;
        color: #fff;
        &:hover {
          border: none;
        }
      }
    }
  }
`;

const ProfileUserFormError = styled.div`
  margin-top: 1rem;
  b {
    font-size: 1.75rem;
    color: red;
  }
`;
