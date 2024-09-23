import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Widget from "../components/Widget";
import PieChart from "../components/PieChart";
import RankingChart from "../components/RankingChart";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className='main-section'>
      <header className='margin-bottom-md'>
        <h1 className='fs-small text-dark-lighten'>
          Hi {user.username}
          <br />
          <span className='fs-x-huge bold text-dark'>
            Welcome to Dashboard!
          </span>
        </h1>
        <p>Monitor key metrics. Check reporting and review insights.</p>
      </header>

      <ul className='widget-list flex flex-wrap flex-gap-md reset-list'>
        <li style={{ flex: "1" }}>
          <Widget type='user' />
        </li>
        <li style={{ flex: "1" }}>
          <Widget type='city' />
        </li>
        <li style={{ flex: "1" }}>
          <Widget type='hotel' />
        </li>
        <li style={{ flex: "1" }}>
          <Widget type='room' />
        </li>
      </ul>

      <article className='flex flex-gap-md flex-wrap margin-top-md'>
        <PieChart />
        <RankingChart />
      </article>
    </section>
  );
};

export default Home;
