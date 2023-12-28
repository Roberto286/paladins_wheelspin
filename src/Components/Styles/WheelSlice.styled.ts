import styled from 'styled-components';

export const Slice = styled.div<{ $sliceheight: number; $color: string }>`
  z-index: 150;
  position: absolute;
  top: ${({ theme }) => `calc(50% - ${theme.wheelProperties.sliceOffset}px)`};
  height: ${({ theme }) => theme.wheelProperties.sliceHeight}px;
  left: 50%;
  width: 50%;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  padding-right: 10px;
  display: block;
  transform-origin: left center;
  transform: ${props => `rotate(${props.$sliceheight}deg)`};

  &::before,
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    margin-bottom: -1px;
    margin-top: -2px;
    border-width: 0 0 calc((${({ theme }) => theme.wheelProperties.sliceHeight}px) / 2 + 4px)
      calc(${({ theme }) => theme.wheelProperties.radius}px + 25px);
    border-color: transparent transparent ${prop => prop.$color} transparent;
  }

  &::after {
    margin-top: -1px;
    margin-bottom: -2px;
    border-width: 0 calc(${({ theme }) => theme.wheelProperties.radius}px + 25px)
      calc(${({ theme }) => theme.wheelProperties.sliceHeight}px / 2 + 4px) 0;
    border-color: transparent ${prop => prop.$color} transparent transparent;
  }
`;

export const Label = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 75%;
  line-height: ${({ theme }) => theme.wheelProperties.sliceHeight}px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 14px;
  text-align: right;
  padding-left: 20px;
`;
