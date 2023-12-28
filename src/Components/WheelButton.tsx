import { Button } from './Styles/WheelButton.styled';
import Container from './Styles/WheelContent.style';
import WheelButtonProps from './types';

function WheelButton({ event, isDisabled }: WheelButtonProps) {
  const handleButtonClick = () => {
    if (!isDisabled) {
      event();
    }
  };
  return (
    <Container>
      <div>
        <Button
          id="spin"
          disabled={isDisabled}
          onClick={() => handleButtonClick()}
        >
          Spin
        </Button>
      </div>
    </Container>
  );
}
export default WheelButton;
