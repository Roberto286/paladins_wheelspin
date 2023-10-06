import { useState } from 'react';
import WheelButton from '../WheelButton/WheelButton';
import WheelSlice from '../WheelSlice/WheelSlice';
import './WheeleStructure.scss';
import { numberOfSlices, wheelRadius, prizeDisplay, createDynamicObject } from '../../Utils/Utils';

function WheelStructure() {
  // getting the randomized variable to add to the final count of revolutions
  const randomAngle = Math.floor(Math.random() * wheelRadius) + 1;
  // degrees that the wheels will do
  const stopAngle = 4000 + randomAngle;
  // this is the side product of the degree, it will show the raw value within 360 degrees
  const angleWithin360 = stopAngle % wheelRadius;
  const [clicked, setClicked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(0);
  const wheelStyle = { transform: `rotate(${rotationAngle}deg)` };

  const startRotation = () => {
    setRotationAngle(angleWithin360);
    document.documentElement.style.setProperty('--stopAngle', `${stopAngle}deg`);
    document.documentElement.style.setProperty('--restartAngle', `${rotationAngle}deg`);
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
      const calculatedValue = prizeDisplay(angleWithin360, createDynamicObject());
      setDisplayedValue(calculatedValue);
    }, 5000);
  };

  return (
    <>
      <div className="container">
        <h1>Paladins wheel of fortune</h1>
        <div className="board">
          <div className="spinner-table">
            <div
              className={`dial ${clicked ? 'spinning' : ''}`}
              style={wheelStyle}
            >
              {Array.from({ length: numberOfSlices }, (_, index) => (
                <WheelSlice
                  key={index}
                  nOfSlice={index}
                />
              ))}
            </div>
          </div>
          <div className="arrow">
            <span className="pointer" />
          </div>
        </div>
        <WheelButton
          event={startRotation}
          isDisabled={clicked}
        />
      </div>
      <div className="display-container">
        <span className="display-value">{displayedValue ? `${displayedValue} won!` : ''}</span>
      </div>
    </>
  );
}

export default WheelStructure;
