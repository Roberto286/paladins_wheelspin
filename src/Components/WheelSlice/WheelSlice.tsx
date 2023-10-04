import './WheelSlice.scss';

type WheelSliceProps = {
  nOfSlice: number;
};
const WheelSlice: React.FC<WheelSliceProps> = ({ nOfSlice }) => {
  const slices = Array.from({ length: nOfSlice }, (_, index) => (
    <div
      className="slice"
      key={index + 1}
    >
      <div className="label">{index + 1}</div>
    </div>
  ));
  return slices;
};
export default WheelSlice;
