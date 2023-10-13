import { useEffect, useState } from 'react';
import WheelButton from '../WheelButton/WheelButton';
import WheelSlice from '../WheelSlice/WheelSlice';
import './WheeleStructure.scss';
import { wheelRadius, getRandomAngle, sliceCalc } from '../../Utils/Utils';
import { IChampion } from '../../Utils/Interfaces';
import { getAllChampions, getRandomChamp } from '../../Utils/endpointCalls';

function WheelStructure() {
  const [clicked, setClicked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [displayedValue, setDisplayedValue] = useState<IChampion>();
  const [champsArray, setChampsArray] = useState<IChampion[]>([]);
  const [slice, setSlice] = useState(0);
  const wheelStyle = { transform: `rotate(${rotationAngle}deg)` };

  const startRotation = async () => {
    const randomChamp = await getRandomChamp();
    const randomAngle = getRandomAngle(randomChamp.id);
    const getAngleWithin360 = async () => (await randomAngle) % wheelRadius;
    setRotationAngle(await getAngleWithin360());
    document.documentElement.style.setProperty('--stopAngle', `${await randomAngle}deg`);
    document.documentElement.style.setProperty('--restartAngle', `${rotationAngle}deg`);
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
      setDisplayedValue(randomChamp);
    }, 5000);
  };

  useEffect(() => {
    (async () => {
      const allChampions = await getAllChampions();
      setChampsArray(allChampions);
      setSlice(await sliceCalc());
    })();
  }, []);

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
              {champsArray.map((e, i) => (
                <WheelSlice
                  key={e.id}
                  championName={e.name}
                  sliceHeight={slice * i}
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
        {displayedValue ? (
          <>
            <span className="display-value"> {`${displayedValue.name} won!`}</span>
            <span className="display-value" /> {/* da aggiungere l'immagine */}
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
export default WheelStructure;
