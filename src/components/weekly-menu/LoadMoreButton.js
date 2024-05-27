/**
 * @component LoadMoreButton
 * @description Button component for loading more meals or showing less.
 * @param {Object} props - The component props.
 * @param {Function} props.onLoadMore - Function to handle the 'Load More' button click.
 * @param {boolean} props.showAll - Indicates whether all items are currently displayed.
 * @param {boolean} props.disabled - Indicates whether the button should be disabled.
 * @returns {JSX.Element} The JSX representation of the LoadMoreButton component.
 */
export default function LoadMoreButton({
  mainMenuData,
  onLoadMore,
  showAll,
  disabled,
}) {
  return (
    <>
      <button className='load_btn' onClick={onLoadMore} disabled={disabled}>
        {showAll ? "Show Less" : "Load More"}
      </button>
    </>
  );
}
