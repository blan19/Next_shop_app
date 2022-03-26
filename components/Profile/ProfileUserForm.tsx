import { IFirebaseUser } from '@/types/auth.type';
import { flexCenter, flexColCenter } from '@/utils/styles/Theme';
import { FunctionComponent } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface ProfileUserFormProps {
  user: IFirebaseUser;
}

const ProfileUserForm: FunctionComponent<ProfileUserFormProps> = ({ user }) => {
  return (
    <ProfileUserFormContainer>
      <div className="profile-user-wrapper">
        <div className="profile-user-email">
          <FaUserCircle />
          <h1>{user.email}</h1>
        </div>
        <div className="profile-user-info">
          <p>이름</p>
          <label>
            <input type="text" value={user.name} readOnly />
          </label>
          <p>주소</p>
          <label>
            <input type="text" value={user.address} readOnly />
          </label>
        </div>
        <div className="profile-user-button">
          <button type="button" className="profile-user-button-delete">
            Delete
          </button>
          <button type="button">Edit</button>
        </div>
      </div>
    </ProfileUserFormContainer>
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
