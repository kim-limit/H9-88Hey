import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Title = styled.div`
  ${({ theme }) => {
    const { fonts } = theme;
    return css`
      ${fonts.headingBold1}
    `;
  }}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const Card = styled.div`
  border: 1px solid black;
  padding: 20px;
  width: 200px;
`;
