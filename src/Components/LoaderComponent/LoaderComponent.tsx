import './LoaderComponent.scss';

function LoaderComponent() {
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
export default LoaderComponent;
