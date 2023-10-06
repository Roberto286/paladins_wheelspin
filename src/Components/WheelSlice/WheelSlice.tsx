import './WheelSlice.scss';

type WheelSliceProps = {
  nOfSlice: number;
};
function WheelSlice({ nOfSlice }: WheelSliceProps) {
  return (
    <div className="slice">
      <div className="label">{nOfSlice + 1}</div>
    </div>
  );
}
export default WheelSlice;
