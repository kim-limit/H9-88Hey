import { useState, useEffect, MouseEvent } from 'react';

import { OptionDataProps, OptionProps, SubOptionProps, OptionCardDataProps } from '@/types/option';
import { isValidIndex } from '@/utils';
import { OPTION_CARD_LIST_LENGTH } from '@/constants';
import { useFetch } from '@/hooks/useFetch';

import { OptionImageBox } from '@/components/common/OptionImageBox';
import { OptionDescription } from '@/components/common/OptionDescription';
import { OptionDetailCard } from '@/components/common/OptionDetailCard';
import { OptionCategory } from '@/components/common/OptionCategory';
import { OptionCardList } from '@/components/common/OptionCardList';
import { DefaultOptionCardList } from '@/components/common/DefaultOptionCardList';

import * as Styled from './style';

const initialData = {
  selectOptions: [
    {
      id: 1,
      name: '',
      imageUrl: '',
      additionalPrice: 0,
      tags: [],
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

export function Option() {
  const { data } = useFetch<OptionDataProps>({
    defaultValue: initialData,
    url: '/model/1/trim/2/select_option',
  });

  const [option, setOption] = useState<OptionProps>({
    id: 1,
    name: '',
    additionalPrice: 0,
    imageUrl: '',
    tags: [],
    subOptions: [],
  });
  const [subOption, setSubOption] = useState<SubOptionProps>({
    id: 1,
    name: '',
    imageUrl: '',
    description: '',
  });
  const [cardListData, setCardListData] = useState<OptionCardDataProps[]>([]);

  const [menu, setMenu] = useState(0);
  const [cardListIndex, setCardListIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [subOptionIndex, setSubOptionIndex] = useState(0);

  function handleChangeMenu(menu: number) {
    setMenu(menu);
  }

  function handleChangeOptionIndex(index: number, event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    if (index === optionIndex || target.tagName === 'BUTTON') {
      return;
    }
    setOptionIndex(index);
    setSubOptionIndex(0);
  }

  function handleChangeSubOptionIndex(index: number) {
    const { length } = option.subOptions;
    const newIndex = isValidIndex(index, length - 1) ? index : (index + length) % length;
    setSubOptionIndex(newIndex);
  }

  function handleChangeCardListIndex(index: number, length: number) {
    if (!isValidIndex(index, Math.ceil(length / OPTION_CARD_LIST_LENGTH) - 1)) {
      return;
    }
    setCardListIndex(index);
  }

  useEffect(() => {
    const { selectOptions } = data;

    const { id, name, additionalPrice, imageUrl, tags, subOptions } = selectOptions[optionIndex];
    const subOption = subOptions[subOptionIndex];
    const cardListData = selectOptions.map(({ id, name, additionalPrice, imageUrl, subOptions }, index) => ({
      id,
      index,
      name,
      additionalPrice,
      imageUrl,
      subOptionNames: subOptions.map(({ name }) => name),
    }));

    setOption({ id, name, additionalPrice, imageUrl, tags, subOptions });
    setSubOption({
      id: subOption.id,
      name: subOption.name,
      imageUrl: subOption.imageUrl,
      description: subOption.description,
    });
    setCardListData(cardListData);
  }, [data, optionIndex, subOptionIndex]);

  return (
    <Styled.Container>
      <Styled.OptionWrapper>
        <Styled.ImageBox>
          <OptionImageBox imageUrl={subOption.imageUrl} />
        </Styled.ImageBox>
        <Styled.DescriptionBox>
          <OptionDescription name={option.name} additionalPrice={option.additionalPrice} tags={option.tags} />
          <OptionDetailCard
            index={subOptionIndex}
            length={option.subOptions.length}
            name={subOption.name}
            description={subOption.description}
            onClick={handleChangeSubOptionIndex}
          />
        </Styled.DescriptionBox>
      </Styled.OptionWrapper>
      <Styled.CardWrapper>
        <OptionCategory menu={menu} onClick={handleChangeMenu} />
        <OptionCardList
          isShow={menu === 0}
          selectedIndex={optionIndex}
          cardListIndex={cardListIndex}
          data={cardListData}
          onClickCard={handleChangeOptionIndex}
          onClickArrowButton={handleChangeCardListIndex}
        />
        <DefaultOptionCardList isShow={menu === 1} />
      </Styled.CardWrapper>
    </Styled.Container>
  );
}
