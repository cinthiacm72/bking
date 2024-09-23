const SecondayHeadline = ({ text, title }) => {
  return (
    <section className='headline container-fluid-lg margin-bottom-md '>
      <h1 className='fs-x-gigantic bolder margin-top-md margin-bottom-sm text-accent-secondary text-shadow'>
        {title}
      </h1>
      <p className='fs-large padding-bottom-x-lg text-white'>{text}</p>
    </section>
  );
};

export default SecondayHeadline;
