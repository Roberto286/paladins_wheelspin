import './WheelButton.scss';
import WheelButtonProps from './types';

function WheelButton({ event, isDisabled }: WheelButtonProps) {
  const handleButtonClick = () => {
    if (!isDisabled) {
      event();
    }
  };
  return (
    <div className="content-container">
      <div className="pre">
        <button
          id="spin"
          type="button"
          disabled={isDisabled}
          onClick={() => handleButtonClick()}
        >
          Spin
        </button>
      </div>
    </div>
  );
}
export default WheelButton;
