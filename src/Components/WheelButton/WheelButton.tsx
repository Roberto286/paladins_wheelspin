import './WheelButton.scss';

type WheelButtonProps = {
  event: () => void;
  isDisabled: boolean;
};
function WheelButton({ event, isDisabled }: WheelButtonProps) {
  return (
    <div className="content-container">
      <div className="pre">
        <button
          id="spin"
          type="button"
          disabled={isDisabled}
          onClick={() => {
            event();
          }}
        >
          Spin
        </button>
      </div>
    </div>
  );
}
export default WheelButton;
