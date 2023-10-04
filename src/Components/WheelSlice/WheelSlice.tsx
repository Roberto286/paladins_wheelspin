import './WheelSlice.scss'
type WheelSlice = {
    nOfSlice:number
}
export const WheelSlice:React.FC<WheelSlice> = ({nOfSlice}) =>{

    const slices = Array.from({ length: nOfSlice }, (_, index) => (
        <div className="slice" key={index + 1}>
          <div className="label">{index + 1}</div>
        </div>
      ));
      return <>{slices}</>;
}