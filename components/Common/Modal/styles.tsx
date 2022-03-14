import { flexCenter } from '@/utils/styles/Theme';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  ${flexCenter}

  & > div {
    display: inline-block;
    position: relative;
    background: var(--color-bgColor);
    padding: 2rem;
    border-radius: 0.5rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    .modal-button {
      ${flexCenter}
      button {
        outline: none;
        border: none;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        background: var(--color-mainColor);
        color: var(--color-rPrimaryText);
        font-weight: bold;
        padding: 0.5rem 2rem;
        margin: 0 1rem;
        cursor: pointer;
      }
    }
  }
`;
