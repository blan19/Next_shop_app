import NavBar from '@/components/admin/NavBar';
import useUser from '@/hooks/useUser';
import Layouts from 'Layouts';
import { ProfileResponsive } from './[id]';
import { profileLink } from '@/utils/lib/navLink';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ProfilePaymentsItem from '@/components/Profile/ProfilePaymentsItem';
import { IPayment } from '@/types/pay.type';

const Payments = () => {
  const { user } = useUser();
  const { data: userPaymentData } = useSWR(
    user?.uid ? `/api/payment/${user.uid}` : null,
  );
  const router = useRouter();
  useEffect(() => {
    if (user) {
      if (!user.isLoggedIn) {
        router.push('/');
      }
    }
  }, [router, user]);
  return (
    <Layouts>
      <ProfileResponsive>
        {user && user.isLoggedIn && <NavBar link={profileLink(user.uid)} />}
        {userPaymentData && userPaymentData.data.length > 0
          ? userPaymentData.data
              .sort(
                (a: IPayment, b: IPayment) =>
                  b.createAt.seconds - a.createAt.seconds,
              )
              .map((receipt: IPayment) => (
                <ProfilePaymentsItem
                  key={receipt.merchant_uid}
                  receipt={receipt}
                />
              ))
          : null}
      </ProfileResponsive>
    </Layouts>
  );
};

export default Payments;
