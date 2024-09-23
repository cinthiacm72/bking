const MailList = () => {
  return (
    <section className='bg-accent'>
      <div className='container-fluid-md flex flex-j-content flex-a-center'>
        <img
          style={{ mixBlendMode: "darken", height: "200px" }}
          src='../assets/imgs/globo-terraqueo.jpeg'
        />
        <div className='padding-top-md padding-bottom-lg text-light'>
          <h2
            className='margin-bottom-x-sm fs-x-huge text-secondary bolder'
            data-text-shadow>
            Save time, save money!
          </h2>
          <p className='margin-bottom-sm'>
            Sign up and we'll send the best deals to you
          </p>

          <form
            className='maillist form flex flex-a-end flex-gap-md text-light'
            action=''>
            <label>
              Your email
              <input type='text' placeholder='your-email@domain.com' />
            </label>

            <input
              className='button button-dark'
              type='submit'
              value='Suscribe me!'
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default MailList;
