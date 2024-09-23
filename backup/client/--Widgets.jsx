const Widgets = () => {
  return (
    <aside className='flex flex-gap-md'>
      <article
        className=''
        style={{
          position: "relative",

          height: "320px",
          padding: "1.5rem",
          borderRadius: "14px",
          overflow: "hidden",
        }}>
        <header
          className='bg-white'
          style={{ borderRadius: "10px", padding: "1.4rem" }}>
          <h3 className='margin-bottom-sm fs-large bold'>
            Get the 10%
            <br />
            <span className='fs-normal'>on summer travel!</span>
          </h3>
          <p className='fs-small'>
            Summer's almost here. We put together the ultimate cheat sheet to
            help you save on trips throughout the season.
          </p>
        </header>

        <img
          style={{
            position: "absolute",
            zIndex: "-1",
            top: "0",
            left: "0",
            overflow: "hidden",
            borderRadius: "14px",
            objectFit: "cover",
          }}
          src='https://imageio.forbes.com/specials-images/imageserve/647facd9f5654bc6b057b386/Couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island/960x0.jpg?format=jpg&width=960'
          alt=''
        />
      </article>
      <article
        className='bg-white'
        style={{ padding: "1.5rem", borderRadius: "14px" }}>
        <h3 className='fs-x-large bold'>Get the 411 on summer travel!</h3>
        <p>
          Summer's almost here. We put together the ultimate cheat sheet to help
          you save on trips throughout the season.
        </p>
      </article>
    </aside>
  );
};

export default Widgets;
