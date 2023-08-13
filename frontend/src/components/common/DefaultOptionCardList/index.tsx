import { useState, useEffect } from 'react';

import {
  DefaultOptionDataProps,
  DefaultOptionProps,
  DefaultSubOptionProps,
  DefaultOptionCardDataProps,
} from '@/types/option';
import { isValidIndex, isIndexLargeThanZero, isIndexSmallThanMaxIndex } from '@/utils';
import { OPTION_CARD_LIST_LENGTH } from '@/constants';
import { useFetch } from '@/hooks/useFetch';

import { PrevButton } from '@/components/common/PrevButton';
import { NextButton } from '@/components/common/NextButton';
import { OptionModalProvider } from '@/components/common/OptionModalProvider';
import { OptionModal } from '@/components/common/OptionModal';

import * as Styled from './style';

interface Props {
  isShow: boolean;
}

const initialData = {
  defaultOptions: [
    {
      category: '',
      subOptions: [
        {
          id: 1,
          name: '',
          imageUrl: '',
          description: '',
        },
      ],
    },
  ],
};

export function DefaultOptionCardList({ isShow }: Props) {
  const { data } = useFetch<DefaultOptionDataProps>({
    defaultValue: initialData,
    url: '/model/1/trim/2/default_option',
  });

  const [defaultOptions, setDafaultOptions] = useState<DefaultOptionProps[]>([]);
  const [subOptions, setSubOptions] = useState<DefaultSubOptionProps[]>([]);
  const [cardList, setCardList] = useState<DefaultOptionCardDataProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [cardListIndex, setCardListIndex] = useState(0);

  const [isShowModal, setIsShowModal] = useState(false);
  const [modal, setModal] = useState({
    name: '',
    imageUrl: '',
  });

  function handleChangeCategoryIndex(index: number) {
    if (index === categoryIndex) {
      return;
    }
    setCategoryIndex(index);
    setCardListIndex(0);
  }

  // TODO: 커스텀 훅으로 빼기
  function handleChangeCardListIndex(index: number, length: number) {
    if (!isValidIndex(index, Math.ceil(length / OPTION_CARD_LIST_LENGTH) - 1)) {
      return;
    }
    setCardListIndex(index);
  }

  function handleOpenModal(name: string, imageUrl: string) {
    setIsShowModal(true);
    setModal({ name, imageUrl });
  }

  function handleCloseModal() {
    setIsShowModal(false);
  }

  // TODO: 커스텀 훅으로 빼기
  useEffect(() => {
    const { defaultOptions } = data;

    const cardListData = defaultOptions[categoryIndex].subOptions.map(({ name, imageUrl }) => ({
      name,
      imageUrl,
    }));

    const startIndex = cardListIndex * OPTION_CARD_LIST_LENGTH;
    let endIndex = startIndex + OPTION_CARD_LIST_LENGTH;
    if (endIndex > cardListData.length) {
      endIndex = cardListData.length;
    }

    setDafaultOptions(defaultOptions);
    setSubOptions(defaultOptions[categoryIndex].subOptions);
    setCardList(cardListData.slice(startIndex, endIndex));
    setCategories(defaultOptions.map(({ category }) => category));
  }, [data, categoryIndex, cardListIndex]);

  return (
    <Styled.Container isShow={isShow}>
      <Styled.CategoryWrapper>
        {categories.map((category, index) => (
          <Styled.Category
            isActive={index === categoryIndex}
            onClick={() => handleChangeCategoryIndex(index)}
            key={category}
          >
            {category}
          </Styled.Category>
        ))}
      </Styled.CategoryWrapper>
      <Styled.OptionCardWrapper>
        <PrevButton
          width="48"
          height="48"
          onClick={() => handleChangeCardListIndex(cardListIndex - 1, subOptions.length)}
          isShow={isIndexLargeThanZero(cardListIndex)}
        />
        {cardList.map(({ name, imageUrl }, index) => (
          <Styled.OptionCard key={index} onClick={() => handleOpenModal(name, imageUrl)}>
            <Styled.Image src={imageUrl} />
            <Styled.TextWrapper>
              <Styled.Text>{name}</Styled.Text>
              <Styled.SubText>기본 포함</Styled.SubText>
            </Styled.TextWrapper>
          </Styled.OptionCard>
        ))}
        <NextButton
          width="48"
          height="48"
          onClick={() => handleChangeCardListIndex(cardListIndex + 1, subOptions.length)}
          isShow={isIndexSmallThanMaxIndex(cardListIndex, subOptions.length)}
        />
      </Styled.OptionCardWrapper>
      {isShowModal && (
        <OptionModalProvider>
          <OptionModal name={modal.name} imageUrl={modal.imageUrl} onClick={handleCloseModal} />
        </OptionModalProvider>
      )}
    </Styled.Container>
  );
}
