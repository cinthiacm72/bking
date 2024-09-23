import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Loader from "./Loader";

const SingleGalleryImages = ({ data, path, id }) => {
  return (
    <article style={{ flex: "1" }} className='widget'>
      <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
        <h2 className='fs-large bold caps'>{path} image</h2>

        <ImageOutlinedIcon />
      </div>
      {data.image ? (
        !data.image ? (
          <Loader />
        ) : (
          <img src={data.image} alt='City Panoramic Image' />
        )
      ) : (
        ""
      )}

      {data.images ? (
        <ul className='flex flex-gap-sm flex-wrap reset-list'>
          {data.images.map((item, index) => (
            <li style={{ width: "370px", height: "250px" }} key={index}>
              {!item ? (
                <Loader />
              ) : (
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={item}
                  alt='Hotel Image'
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </article>
  );
};

export default SingleGalleryImages;
