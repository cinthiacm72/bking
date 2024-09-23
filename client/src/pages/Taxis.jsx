import Menu from "../components/Menu";
import InnerHeadline from "../components/InnerHeadline";
import Footer from "../components/Footer";
const Taxis = () => {
  return (
    <>
      <header className='main-header'>
        <Menu />
        <InnerHeadline title='Taxis' textSuccess='Find the best deals!' />
      </header>
      <main
        className='container-fluid-lg margin-top-md'
        data-translate-y-md
        data-rel-zindex-200>
        <div className='box bg-white'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, a quis
          doloremque ut modi cupiditate ratione impedit aspernatur autem facilis
          distinctio nihil qui dolores tempora. Omnis placeat delectus sapiente
          iure? Repudiandae ipsam perferendis, pariatur eum facere quo quas
          necessitatibus a hic officiis harum aliquam. Natus, explicabo eos
          similique harum accusantium voluptatem saepe deleniti quia a nemo
          itaque quis necessitatibus amet.
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Taxis;
