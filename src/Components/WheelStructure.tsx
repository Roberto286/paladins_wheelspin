import { useEffect, useState } from 'react';
import WheelButton from './WheelButton';
import WheelSlice from './WheelSlice';
import ContentContainer from './Styles/WheelContent.style';
import { getRandomAngle, sliceCalc, wheelRadius } from '../Utils/Utils';
import { Champion } from '../interfaces/Champion';
import { getAllChampions, getRandomChamp } from '../network/endpointCalls';
import { Board, Container, Dial, DialBefore, SpinningTable } from './Styles/WheelStructure.styled';
import { Arrow, Pointer } from './Styles/WheelArrow.styled';

function WheelStructure() {
  const [clicked, setClicked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [randomAngle, setRandomAngle] = useState(0);
  const [displayedValue, setDisplayedValue] = useState<Champion>();
  const [champions, setChampions] = useState<Champion[]>([]);
  const [slice, setSlice] = useState(0);

  const fetchData = async () => {
    const allChampions = await getAllChampions();
    setChampions(allChampions);
    setSlice(sliceCalc(allChampions?.length));
  };

  const startRotation = async () => {
    const randomChamp = await getRandomChamp();
    setRandomAngle(getRandomAngle(randomChamp.id, champions.length));
    const angleWithin360 = randomAngle % wheelRadius;
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

  const slicesArray = champions?.map((champion, index) => (
    <WheelSlice
      key={champion.id}
      championName={champion.name}
      sliceHeight={slice * index}
      color={champion.dominant_color}
    />
  ));

  return (
    <Container>
      <h1>Paladins wheel of fortune</h1>
      <Board>
        <SpinningTable>
          <Dial
            $randomangle={randomAngle}
            $rotationangle={rotationAngle}
          >
            <DialBefore>
              <WheelButton
                event={startRotation}
                isDisabled={clicked}
              />
            </DialBefore>
            {slicesArray}
          </Dial>
        </SpinningTable>
        <Arrow>
          <Pointer />
        </Arrow>
      </Board>
      <ContentContainer>
        {displayedValue ? (
          <>
            <span>{`${displayedValue.name} won!`}</span>
            <span /> {/* Add the image here */}
          </>
        ) : null}
      </ContentContainer>
    </Container>
  );
}

export default WheelStructure;
