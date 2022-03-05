import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { FormProps } from '@/components/Auth/AuthForm';
import firebase from 'firebase/compat/app';

type useAuthHooksProps = {
  user: any;
  join: (userData: FormProps) => Promise<any>;
  login: (userData: FormProps) => Promise<any>;
  logout: () => Promise<void>;
};

const authContext = createContext({ user: {} });

const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth: any = () => {
  return useContext(authContext);
};

export default function useAuthProvider(): useAuthHooksProps {
  const [user, setUser] = useState<any>(null);
  const createUser = async (user: any) => {
    return await firebaseDb
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };
  const join = async (userData: FormProps) => {
    const { email, password, address, addressDetail } = userData;
    const fullAddress = `${address} ${addressDetail}`;
    return await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) =>
        createUser({ uid: res.user?.uid, email, fullAddress }),
      )
      .catch((error) => {
        return { error };
      });
  };

  const login = async (userData: FormProps) => {
    const { email, password } = userData;
    return await firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (res: firebase.auth.UserCredential) => {
        setUser(res.user);
        await getUserAdditionalData(res.user);
        return res.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = async (user: any): any => {
    return await firebaseDb
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser(userData.data());
        }
      });
  };

  const handleAuthStateChanged = async (user: firebase.User): any => {
    setUser(user);
    if (user) {
      await getUserAdditionalData(user);
    }
  };

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = firebaseDb
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  const logout = async () => {
    return await firebaseAuth.signOut().then(() => setUser(false));
  };

  return {
    user,
    join,
    login,
    logout,
  };
}
