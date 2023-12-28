import { Label, Slice } from './Styles/WheelSlice.styled';

type WheelSliceProps = {
  championName: string;
  sliceHeight: number;
  color: string;
};
function WheelSlice({ championName, sliceHeight, color }: WheelSliceProps) {
  return (
    <Slice
      $sliceheight={sliceHeight}
      $color={color}
    >
      <Label>{championName}</Label>
    </Slice>
  );
}
export default WheelSlice;
