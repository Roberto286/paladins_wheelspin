import { Champions } from '../../Utils/Interfaces';
import './WheelSlice.scss';

type WheelSliceProps = {
  nOfSlice: Champions;
};
function WheelSlice({ nOfSlice }: WheelSliceProps) {
  return (
    <div className="slice">
      <div className="label">{nOfSlice.name}</div>
    </div>
  );
}
export default WheelSlice;
