import './WheelSlice.scss';

type WheelSliceProps = {
  championName: string;
  sliceHeight: number;
};
function WheelSlice({ championName, sliceHeight }: WheelSliceProps) {
  return (
    <div
      className="slice"
      style={{ transform: `rotate(${sliceHeight}deg)` }}
    >
      <div className="label">{championName}</div>
    </div>
  );
}
export default WheelSlice;
