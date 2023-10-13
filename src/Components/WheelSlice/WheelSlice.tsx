import './WheelSlice.scss';

type WheelSliceProps = {
  championName: string;
  slice: number;
};
function WheelSlice({ championName, slice }: WheelSliceProps) {
  return (
    <div
      className="slice"
      style={{ transform: `rotate(${slice}deg)` }}
    >
      <div className="label">{championName}</div>
    </div>
  );
}
export default WheelSlice;
