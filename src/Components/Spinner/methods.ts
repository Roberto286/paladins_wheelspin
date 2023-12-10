const isLoaderVisible = (v: boolean) => {
  const ldsContainer = document.querySelector('.lds-container');
  if (ldsContainer) {
    ldsContainer.classList.toggle('hide', !v);
  }
};
export default isLoaderVisible;
