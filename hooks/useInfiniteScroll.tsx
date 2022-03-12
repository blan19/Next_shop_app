import { IProduct } from '@/types/product.type';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  products: IProduct[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  selectedCategory: string,
  products: IProduct[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  const productListByCategory = useMemo<IProduct[]>(
    () =>
      products.filter((post) =>
        selectedCategory !== 'ALL'
          ? post.category.includes(selectedCategory)
          : true,
      ),
    [products, selectedCategory],
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount((value) => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= productListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.current?.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, productListByCategory.length, selectedCategory]);

  return {
    containerRef,
    products: productListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
