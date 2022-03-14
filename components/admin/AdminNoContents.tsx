import styled from 'styled-components';
import { FaSadTear } from 'react-icons/fa';

const AdminNoContents = () => {
  return (
    <AdminNoContentsContainer>
      <h1>
        No Contents..!&nbsp;&nbsp;
        <FaSadTear />
      </h1>
      <p>아직 페이지를 준비중입니다</p>
    </AdminNoContentsContainer>
  );
};

export default AdminNoContents;

const AdminNoContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    display: flex;
    align-items: center;
    font-size: 5rem;
    color: var(--color-primaryText);
  }
  p {
    margin-top: 2rem;
    font-size: 1.5rem;
    color: var(--color-subText);
  }
`;
