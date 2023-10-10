import './WheelButton.scss';

type WheelButtonProps = {
  event: (() => void)[];
  isDisabled: boolean;
};
function WheelButton({ event, isDisabled }: WheelButtonProps) {
  const [startRotation, refreshRandomChamp] = event;

  const handleButtonClick = () => {
    if (!isDisabled) {
      startRotation();
      refreshRandomChamp();
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
