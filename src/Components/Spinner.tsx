import { LoaderContainer, LoaderRing } from './Styles/Spinner.styled';

function Spinner() {
  return (
    <LoaderContainer>
      <LoaderRing>
        <div />
        <div />
        <div />
        <div />
      </LoaderRing>
    </LoaderContainer>
  );
}
export default Spinner;
