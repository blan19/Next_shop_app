import { IProduct } from '@/types/product.type';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  products: IProduct[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  products: IProduct[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount((value) => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  useEffect(() => setCount(1), []);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= products.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.current?.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, products.length]);

  return {
    containerRef,
    products: products.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
