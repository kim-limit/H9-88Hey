import * as Styled from './style';

interface Props {
  name: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
}

export function OptionModal({ name, imageUrl, description, onClick }: Props) {
  return (
    <>
      <Styled.Container onClick={onClick} />
      <Styled.ModalWrapper>
        <Styled.TitleBox>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Icon src="/src/assets/icons/icon_close.svg" onClick={onClick} />
        </Styled.TitleBox>
        <Styled.Line />
        <Styled.ContentBox>
          <Styled.ImageBox>
            <Styled.Image src={imageUrl} />
          </Styled.ImageBox>
          <Styled.DescriptionBox>
            <Styled.Description>{description}</Styled.Description>
          </Styled.DescriptionBox>
        </Styled.ContentBox>
        <Styled.ButtonBox>
          <Styled.Button onClick={onClick}>확인</Styled.Button>
        </Styled.ButtonBox>
      </Styled.ModalWrapper>
    </>
  );
}