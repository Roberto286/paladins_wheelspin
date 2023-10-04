import './WheelSlice.scss';

type WheelSliceProps = {
  nOfSlice: number;
};
function WheelSlice({ nOfSlice }: WheelSliceProps) {
  const slices = Array.from({ length: nOfSlice }, (_, index) => (
    <div
      className="slice"
      key={index + 1}
    >
      <div className="label">{index + 1}</div>
    </div>
  ));
  return slices;
}
export default WheelSlice;
