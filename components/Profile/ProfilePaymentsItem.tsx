import { IPayment } from '@/types/pay.type';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface ProfilePaymentsItemProps {
  receipt: IPayment;
}
const ProfilePaymentsItem: FunctionComponent<ProfilePaymentsItemProps> = ({
  receipt,
}) => {
  console.log(receipt);

  return (
    <div>
      <h1>asdas</h1>
    </div>
  );
};

export default ProfilePaymentsItem;

const ProfilePaymentsItemContainer = styled.div``;
