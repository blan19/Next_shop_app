import { IPayment } from '@/types/pay.type';
import convertDate from '@/utils/lib/convertDate';
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
    <ProfilePaymentsItemContainer>
      <div className="profile-payments-item-info">
        <p>{convertDate(receipt.createAt.seconds)}</p>
        <h1>{receipt.paymentData.name}</h1>
      </div>
      <div className="profile-payments-item-pay">
        <p>{receipt.paymentData.pay_method}</p>
        <h1>
          ₩
          {receipt.paymentData.amount.toLocaleString('ko-Kr', {
            maximumFractionDigits: 4,
          })}
        </h1>
      </div>
    </ProfilePaymentsItemContainer>
  );
};

export default ProfilePaymentsItem;

const ProfilePaymentsItemContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  background: var(--color-bgColor);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  .profile-payments-item-info {
    color: var(--color-primaryText);
    p {
      font-size: 1.5rem;
      font-weight: 300;
    }
    h1 {
      margin-top: 0.5rem;
      font-size: 2.5rem;
      font-weight: 400;
    }
  }
  .profile-payments-item-pay {
    p {
      font-size: 1.5rem;
      font-weight: 300;
      color: var(--color-subText);
    }
    h1 {
      margin-top: 0.5rem;
      font-size: 2.5rem;
      font-weight: 500;
      color: var(--color-primaryText);
    }
  }
`;
