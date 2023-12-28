import styled, { css, keyframes } from 'styled-components';

const rotate = (start: number, finish: number) => keyframes`
  from {
    transform: rotate(${start}deg);
  }

  to {
    transform: rotate(${finish}deg);
  }
`;

export const Container = styled.div`
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  h1 {
    text-align: center;
  }
`;
export const Board = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  padding: 50px;
`;

export const SpinningTable = styled.div`
  height: ${({ theme }) => theme.wheelProperties.wheelSize}px;
  width: ${({ theme }) => theme.wheelProperties.wheelSize}px;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
`;

type DialProps = {
  $randomangle: number;
  $rotationangle: number;
};
export const Dial = styled.div<DialProps>`
  height: 100%;
  transition: all 5s ease-out;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-duration: 5s;
  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  animation-name: ${props => rotate(props.$rotationangle, props.$randomangle)};
`;

export const DialBefore = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  background: ${({ theme }) => theme.colors.white};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  z-index: 200;
`;
