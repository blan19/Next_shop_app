import { useRouter } from 'next/router';

const useQueryParser = function (): string {
  const { query } = useRouter();

  const selectedCategory: string =
    typeof query.category !== 'string' || !query.category
      ? 'ALL'
      : query.category;
  return selectedCategory;
};

export default useQueryParser;
