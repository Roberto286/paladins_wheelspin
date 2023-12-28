import styled from 'styled-components';

export const Arrow = styled.div`
  position: absolute;
  height: 30px;
  width: 50px;
  left: ${({ theme }) => theme.wheelProperties.diameter + 110}px;
  z-index: 500;
  display: block;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center right;
`;

export const Pointer = styled.span`
  z-index: 500;
  display: block;
  height: 30px;
  width: 50px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 15px 50px;
    border-color: transparent transparent ${({ theme }) => theme.colors.darkOrange} transparent;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 50px 15px 0;
    border-color: transparent ${({ theme }) => theme.colors.darkOrange} transparent transparent;
  }
`;
