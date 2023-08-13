import { useEffect, useRef, useState } from 'react';

import { ReviewOption } from '@/components/review/ReviewOption';
import { SlidePrevButton } from '@/components/review/SlidePrevButton';
import { ReviewDescripion } from '@/components/review/ReviewDescription';

import * as Styled from './style';

const TOTAL_SLIDES = 4; // 나중엔 데이터 보고 할거

export function Review() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  function handleNextSlide() {
    currentSlide <= TOTAL_SLIDES && setCurrentSlide(prev => prev + 1);
  }

  function handlePrevSlide() {
    currentSlide > 0 && setCurrentSlide(prev => prev - 1);
  }

  useEffect(() => {
    if (slideRef.current !== null) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  return (
    <Styled.Container>
      <Styled.SliderWrapper>
        {currentSlide !== 0 && (
          <Styled.PrevButton>
            <SlidePrevButton onClick={handlePrevSlide} />
          </Styled.PrevButton>
        )}
        <Styled.SliderBox ref={slideRef}>
          <Styled.Slide>
            <ReviewDescripion onClick={handleNextSlide} />
          </Styled.Slide>
          <Styled.Slide>
            <ReviewOption
              name={'디젤 2.2'}
              description="높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다."
              tags={['주행을 편하게 해요', '뒷자석도 편안해요', '조용한 드라이빙']}
              image="https://www.hyundai.com/contents/spec/LX24/20_darkwheel_s.jpg"
              onClick={handleNextSlide}
            />
          </Styled.Slide>
          <Styled.Slide>
            <ReviewOption
              name={'디젤 2.2'}
              description="높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다."
              tags={['주행을 편하게 해요', '뒷자석도 편안해요', '조용한 드라이빙']}
              image="https://www.hyundai.com/contents/spec/LX24/20_darkwheel_s.jpg"
              onClick={handleNextSlide}
            />
          </Styled.Slide>
          <Styled.Slide>
            <ReviewOption
              name={'디젤 2.2'}
              description="높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다."
              tags={['주행을 편하게 해요', '뒷자석도 편안해요', '조용한 드라이빙']}
              image="https://www.hyundai.com/contents/spec/LX24/20_darkwheel_s.jpg"
              onClick={handleNextSlide}
            />
          </Styled.Slide>
        </Styled.SliderBox>
      </Styled.SliderWrapper>
    </Styled.Container>
  );
}