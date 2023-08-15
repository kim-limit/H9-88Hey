import { useState } from 'react';

import { MyChivingDataProps } from '@/types/myChiving';
import { useFetch } from '@/hooks/useFetch';

import { MyCarList } from '@/components/MyChiving/MyCarList';
import { PrevButton } from '@/components/common/PrevButton';
import { NextButton } from '@/components/common/NextButton';

import * as Styled from './style';

const savedInitialData = {
  myarchivings: [
    {
      id: 111,
      model: '',
      trim: '',
      isSaved: true,
      trimOptions: [''],
      lastModifiedDate: '',
      selectedOptions: [
        {
          name: '',
          imageUrl: '',
        },
      ],
    },
  ],
};

const tempInitialData = {
  myarchivings: [
    {
      id: 222,
      model: '',
      trim: '',
      isSaved: false,
      trimOptions: [''],
      lastModifiedDate: '',
      selectedOptions: [
        {
          name: '',
          imageUrl: '',
        },
      ],
    },
  ],
};

export function MySavedCar() {
  const { data: tempData } = useFetch<MyChivingDataProps>({ defaultValue: tempInitialData, url: '/mychiving/temp' });
  const { data: savedData } = useFetch<MyChivingDataProps>({ defaultValue: savedInitialData, url: '/mychiving' });
  const allData = [...tempData.myarchivings, ...savedData.myarchivings];

  const [page, setPage] = useState(0);
  const rangeArray = Array.from({ length: 4 }, (_, index) => index + page * 4);

  return (
    <Styled.Contianer>
      <PrevButton
        width="60"
        height="60"
        onClick={() => {
          setPage(prev => prev - 1);
        }}
        isShow={page !== 0}
      />
      {allData.length > 0 ? (
        <Styled.MyCarBox>
          {rangeArray.map(index =>
            index < allData.length ? (
              <MyCarList
                key={allData[index].id}
                isSaved={allData[index].isSaved}
                model={allData[index].model}
                trim={allData[index].trim}
                trimOptions={allData[index].trimOptions}
                lastModifiedDate={allData[index].lastModifiedDate}
                selectedOptions={allData[index].selectedOptions}
              />
            ) : (
              <Styled.EmptyBox key={index}></Styled.EmptyBox>
            )
          )}
        </Styled.MyCarBox>
      ) : (
        <Styled.NoDataInfoBox>
          <Styled.NoDataInfoText>내 차 목록에 저장한 차량이 없어요</Styled.NoDataInfoText>
          <Styled.CreateMyCarButton>내 차 만들기</Styled.CreateMyCarButton>
        </Styled.NoDataInfoBox>
      )}
      <NextButton
        width="60"
        height="60"
        onClick={() => {
          setPage(prev => prev + 1);
        }}
        isShow={page !== Math.floor(allData.length < 1 ? 0 : Math.floor((allData.length - 1) / 4))}
      />
    </Styled.Contianer>
  );
}