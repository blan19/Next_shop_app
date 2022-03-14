import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
} from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Modal: FunctionComponent<ModalProps> = ({
  visible,
  setVisible,
  children,
}) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!visible) return null;
  return (
    <ModalContainer onClick={() => setVisible(false)}>
      <div onClick={stopPropagation}>{children}</div>
    </ModalContainer>
  );
};

export default Modal;
