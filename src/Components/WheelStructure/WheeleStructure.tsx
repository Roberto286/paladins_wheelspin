import { WheelButton } from "../WheelButton/WheelButton";
import { WheelSlice } from "../WheelSlice/WheelSlice";
import "./WheeleStructure.scss";
import "../../Utils/Utils";
import { sliceSize, numberOfSlices, wheelRadius, prizeDisplay, createDynamicObject } from "../../Utils/Utils";
import { useState } from "react";

export const WheeleStructure = () => {

  //getting the randomized variable to add to the final count of revolutions
  const randomAngle = Math.floor(Math.random()* wheelRadius) + 1 ;
  //degrees that the wheels will do
  const stopAngle = 4000 + randomAngle;
  //this is the side product of the degree, it will show the raw value within 360 degrees
  const angleWithin360 = stopAngle % wheelRadius;
  const [clicked, setClicked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [displayedValue, setDisplayedValue] = useState("");
  const wheelStyle = {transform: `rotate(${rotationAngle}deg)`}
  
  
 
  
  
  const showSample = () => {
      setRotationAngle(angleWithin360)
      document.documentElement.style.setProperty('--stopAngle', `${stopAngle}deg`);
      document.documentElement.style.setProperty('--restartAngle', `${rotationAngle}deg`);
      setClicked(true);
      setTimeout(() => {
      setClicked(false);
      const calculatedValue = prizeDisplay(angleWithin360, sliceSize, createDynamicObject(numberOfSlices));
      setDisplayedValue(calculatedValue);
      console.log(displayedValue);
      
      }, 5000);
  };

  return (
    <div className="container">
      <div className="board">
        <div className="spinner-table">
          <div className={`dial ${clicked ? "spinning" : ""}`} style={wheelStyle} >
            <WheelSlice nOfSlice={numberOfSlices} />
          </div>
        </div>
        <div className="arrow">
          <span className="pointer"></span>
        </div>
      </div>
      <WheelButton event={showSample} isDisabled={clicked} />
      <div className="display-container">
        <span className="display-value">{}</span>
      </div>
    </div>
  );
};
