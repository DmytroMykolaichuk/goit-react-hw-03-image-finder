import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  position: relative;

  grid-template-columns: 1fr;

  grid-gap: 16px;

  padding-bottom: 24px;
`;

export const StartText = styled.p`
  margin: 0 auto;
  font-size: 20px;
  padding-top: 20px;
`;

export const ErrorText = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding-top: 20px;
  color: red;
`;
