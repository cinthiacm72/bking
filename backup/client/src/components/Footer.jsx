const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <footer className=' bg-dark text-white'>
        <div className='footer container-fluid-lg padding-top-md padding-bottom-lg'>
          <ul className='footer-list reset-list'>
            <li className='footer-item margin-bottom-sm'>
              <h4 className='fs-small bold'>Most populars</h4>
            </li>
            <li className='text-light-darken footer-item'>Countries</li>
            <li className='text-light-darken footer-item'>Regions</li>
            <li className='text-light-darken footer-item'>Cities</li>
            <li className='text-light-darken footer-item'>Districs</li>
            <li className='text-light-darken footer-item'>Airports</li>
            <li className='text-light-darken footer-item'>
              Places of interest
            </li>
            <li className='text-light-darken footer-item'>Hotels</li>
          </ul>
          <ul className='footer-list reset-list'>
            <li className='footer-item margin-bottom-sm'>
              <h4 className='fs-small bold'>Search by category</h4>
            </li>

            <li className='text-light-darken footer-item '>Apartments</li>
            <li className='text-light-darken footer-item'>Holidays rentals</li>
            <li className='text-light-darken footer-item'>Reesorts</li>
            <li className='text-light-darken footer-item'>Villas</li>
            <li className='text-light-darken footer-item'>Guest houses</li>
            <li className='text-light-darken footer-item'>Hotels</li>
          </ul>
          <ul className='footer-list margin-bottom-md reset-list'>
            <li className='footer-item margin-bottom-sm'>
              <h4 className='fs-small bold'>Other information</h4>
            </li>

            <li className='text-light-darken footer-item'>About Bking</li>
            <li className='text-light-darken footer-item'>
              Give website feedback
            </li>
            <li className='text-light-darken footer-item'>
              Customer Services help
            </li>
            <li className='text-light-darken footer-item'>Careers</li>
            <li className='text-light-darken footer-item'>Press Center</li>
            <li className='text-light-darken footer-item'>About Bking</li>
            <li className='text-light-darken footer-item'>
              Give website feedback
            </li>
            <li className='text-light-darken footer-item'>
              Customer Services help
            </li>
            <li className='text-light-darken footer-item'>Careers</li>
            <li className='text-light-darken footer-item'>Press Center</li>
          </ul>
          <div className='box bg-darken'>
            <h4 className='margin-bottom-sm fs-large bold'>Bking.com</h4>
            <p className='margin-bottom-sm fs-small text-light'>
              Is based in Buenos Aires, Argentina and supported internationally
              by 125 offices in 30 countries.
            </p>
            <p className='margin-bottom-sm bold text-accent-light'>
              Save time, save money!
            </p>
            <form
              className='form flex flex-column flex-gap-md text-light'
              action=''
              onSubmit={() => handleSubmit(e)}>
              <label>
                Your email
                <input
                  type='email'
                  placeholder='your-email@domain.com'
                  id='email'
                  size='30'
                />
              </label>
              <input
                type='submit'
                value='Login'
                className='button button-accent'
              />
              <div className='flex fs-tiny text-dark-lighten'>
                <input
                  type='checkbox'
                  id='confirm'
                  checked
                  onChange={() => !checked}
                />
                Send me a link to get Free Bking app!
                <label htmlFor='confirm'></label>
              </div>
            </form>
          </div>
        </div>
      </footer>
      <div className='banner fs-x-tiny text-light-darken bg-darken'>
        ©2024 Bking, www.bking.com. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
