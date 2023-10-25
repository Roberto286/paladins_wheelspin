import { useEffect, useState } from 'react';
import WheelButton from '../WheelButton/WheelButton';
import WheelSlice from '../WheelSlice/WheelSlice';
import './WheelStructure.scss';
import { getRandomAngle, sliceCalc, wheelRadius } from '../../Utils/Utils';
import { IChampion } from '../../Utils/Interfaces';
import { getAllChampions, getRandomChamp } from '../../Utils/endpointCalls';
import LoaderComponent from '../LoaderComponent/LoaderComponent';

function WheelStructure() {
  const [clicked, setClicked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [displayedValue, setDisplayedValue] = useState<IChampion>();
  const [champions, setChampions] = useState<IChampion[]>([]);
  const [slice, setSlice] = useState(0);
  const wheelStyle = { transform: `rotate(${rotationAngle}deg)` };

  const fetchData = async () => {
    const allChampions = await getAllChampions();
    setChampions(allChampions);
    setSlice(sliceCalc(allChampions.length));
  };

  const startRotation = async () => {
    const randomChamp = await getRandomChamp();
    const randomAngle = getRandomAngle(randomChamp.id, champions.length);
    const angleWithin360 = randomAngle % wheelRadius;

    document.documentElement.style.setProperty('--stopAngle', `${randomAngle}deg`);
    document.documentElement.style.setProperty('--restartAngle', `${rotationAngle}deg`);

    setRotationAngle(angleWithin360);
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
      setDisplayedValue(randomChamp);
    }, 5000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const slicesArray = champions.map((champion, index) => (
    <WheelSlice
      key={champion.id}
      championName={champion.name}
      sliceHeight={slice * index}
      color={champion.dominant_color}
    />
  ));

  return (
    <>
      <LoaderComponent />
      <div className="container">
        <h1>Paladins wheel of fortune</h1>
        <div className="board">
          <div className="spinner-table">
            <div
              className={`dial ${clicked ? 'spinning' : ''}`}
              style={wheelStyle}
            >
              <div className="dial-before">
                <WheelButton
                  event={startRotation}
                  isDisabled={clicked}
                />
              </div>
              {slicesArray}
            </div>
          </div>
          <div className="arrow">
            <span className="pointer" />
          </div>
        </div>
        <div className="display-container">
          {displayedValue ? (
            <>
              <span className="display-value">{`${displayedValue.name} won!`}</span>
              <span className="display-value" /> {/* Add the image here */}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default WheelStructure;
