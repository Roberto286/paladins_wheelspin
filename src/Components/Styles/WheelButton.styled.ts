import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    width: 100%;
    height: 100%;
  }
`;
export const Button = styled.button.attrs({
  type: 'button',
})`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
