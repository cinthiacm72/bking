const SingleHeader = ({ img, title, text }) => {
  return (
    <header className='margin-bottom-md flex flex-gap-sm flex-a-center flex-wrap'>
      {!img ? (
        ""
      ) : (
        <img
          style={{
            borderRadius: "100vmin",
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
          src={img}
          alt=''
        />
      )}
      <div>
        <h1 className='fs-x-huge bold caps'>{title}</h1>
        <p className='fs-small'>{text}</p>
      </div>
    </header>
  );
};

export default SingleHeader;
