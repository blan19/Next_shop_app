import { useRouter } from 'next/router';

const useQueryParser = function (): string {
  const { query } = useRouter();
  const selectedCategory: string =
    typeof query.category !== 'string' || !query.category
      ? 'All'
      : query.category;
  return selectedCategory;
};

export default useQueryParser;
