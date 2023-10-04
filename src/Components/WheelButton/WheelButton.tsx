import './WheelButton.scss'
type WheelButton={
  event:Function
  isDisabled:boolean
}
export const WheelButton:React.FC<WheelButton> = ({event,isDisabled}) => {
  return (
    <div className="content-container">
      <div className="pre">
        <button id="spin" disabled={isDisabled} onClick={()=>{event()}}>Spin</button>
      </div>
    </div>
  );
};
