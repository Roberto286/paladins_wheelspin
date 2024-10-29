import './Spinner.scss';

function Spinner() {
  return (
    <div className="lds-container hide">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
export default Spinner;
