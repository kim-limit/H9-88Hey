import * as Styled from './style';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useEffect, useRef, useState } from 'react';

export function Test() {
  const [cards, setCards] = useState<TestProps[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const manRef = useRef<HTMLDivElement>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreElement);

  interface ResponseType<T> {
    status: number;
    message: string;
    data: T;
  }
  interface TestProps {
    id: number;
    name: string;
    imageURL: string;
    additionalPrice: number;
    description: string;
  }

  async function fetcher(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const { data } = (await response.json()) as ResponseType<TestProps[]>;
      if (data.length === 0) {
        setHasNext(false);
        return;
      }
      setCards(cards => [...cards, ...data]);
    } catch (error: unknown) {}
  }

  function masonryLayout() {
    const masonryItems = manRef.current?.childNodes;
    masonryItems?.forEach(item => {
      const element = item as HTMLElement;
      const innerElement = element.children[0];
      const innerElementHeight = innerElement.getBoundingClientRect().height;

      element.style.gridRowEnd = `span ${Math.ceil((innerElementHeight + 10) / 50)}`;
    });
  }

  useEffect(() => {
    masonryLayout();
  }, [cards]);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetcher('/test');
    }
  }, [intersecting]);

  return (
    <>
      <Styled.Container ref={manRef}>
        {cards.map((data: any, idx) => (
          <Styled.Card key={data.description + idx}>
            <Styled.Content>
              <Styled.Title>{data.name + idx}</Styled.Title>
              {data.description}
            </Styled.Content>
          </Styled.Card>
        ))}
      </Styled.Container>
      <div style={{ position: 'absolute' }} ref={fetchMoreElement}>
        loading...
      </div>
    </>
  );
}
