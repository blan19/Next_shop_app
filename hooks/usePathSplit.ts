import { useRouter } from 'next/router';

export default function usePathSplit() {
  const { pathname } = useRouter();
  return pathname.split('/').map((string) => string.toUpperCase());
}
