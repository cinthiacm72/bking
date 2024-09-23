const HotelGallery = ({ imageGallery, handleClick }) => {
  return (
    <ul className='gallery-list translate-y-sm | reset-list'>
      {imageGallery.map((item, index) => (
        <li
          className={
            imageGallery.length > 6 ? "gallery-item-odd" : "gallery-item-even"
          }
          key={index}
          onClick={() => handleClick(index)}>
          <img src={item} />
        </li>
      ))}
    </ul>
  );
};
export default HotelGallery;
