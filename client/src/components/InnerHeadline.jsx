const InnerHeadline = ({ data, title, textSuccess, textFailure }) => {
  return (
    <section className='container-fluid-lg padding-bottom-x-lg text-shadow'>
      {data === undefined ? (
        <>
          <h1
            className='margin-top-md fs-x-gigantic bolder text-accent-secondary caps'
            data-text-shadow>
            {title}
          </h1>
          <p className='fs-x-huge bolder text-white '>{textSuccess}</p>
        </>
      ) : data.length === 0 ? (
        <>
          <h1
            className='margin-top-md fs-x-huge bolder caps text-accent-secondary'
            data-text-shadow>
            {title}
          </h1>
          <p className='fs-x-huge bolder text-white '>{textFailure}</p>
        </>
      ) : (
        <>
          <h1
            className='margin-top-md fs-x-gigantic bolder text-accent-secondary caps'
            data-text-shadow>
            {title}
          </h1>
          <p className='fs-x-huge bolder text-white '>{textSuccess}</p>
        </>
      )}
    </section>
  );
};
export default InnerHeadline;
