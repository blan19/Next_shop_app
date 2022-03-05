import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthProvider from './useAuth';

export default function useRequireAuth() {
  const auth = useAuthProvider();
  const router = useRouter();
  useEffect(() => {
    if (auth.user === false) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
}
