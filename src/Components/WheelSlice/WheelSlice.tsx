import './WheelSlice.scss';

type WheelSliceProps = {
  championName: string;
  sliceHeight: number;
  color: string;
};
function WheelSlice({ championName, sliceHeight, color }: WheelSliceProps) {
  return (
    <div
      className="slice"
      style={{ transform: `rotate(${sliceHeight}deg)` }}
    >
      <span
        className="before"
        style={{ borderColor: `transparent transparent ${color} transparent` }}
      />
      <div className="label">{championName}</div>
      <span
        className="after"
        style={{ borderColor: `transparent ${color} transparent transparent` }}
      />
    </div>
  );
}
export default WheelSlice;
