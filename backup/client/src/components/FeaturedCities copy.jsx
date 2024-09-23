import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import React, { useState, useEffect } from "react";

const FeaturedCities = ({ destination, setDestination }) => {
  /*   const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL +
      "/hotels/countByCity?cities=madrid,berlin,buenos%20aires"
  ); */

  /*  const ciudades = ["buenos aires", "london", "berlin"]; */

  const navigate = useNavigate();

  const photos = [
    {
      city: "buenos aires",
      image: "../assets/cities/buenos-aires.jpg",
    },

    {
      city: "berlin",
      image: "../assets/cities/berlin.jpg",
    },
    {
      city: "london",
      image: "../assets/cities/london.jpg",
    },

    {
      city: "paris",
      image: "../assets/cities/paris.jpg",
    },
  ];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/cities"
  );

  /*   console.log("DATA", data); */

  let mergedDataCities = [];

  for (let i = 0; i < 3; i++) {
    mergedDataCities.unshift({
      ...data.find((el) => el._id.city === photos[i].city),
      ...photos[i],
    });
  }
  /*  console.log("Merged", mergedData); */

  return (
    <>
      <h2 className='margin-bottom-sm fs-x-huge text-dark-lighten bolder'>
        Trending destinations
      </h2>
      <p className='fs-large text-dark-lighten margin-bottom-sm'>
        Most popular choices for travellers from Bking.
      </p>
      <ul
        className='featured-list reset-list padding-bottom-md'
        style={{ padding: "1rem" }}>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {mergedDataCities.map((item, index) => (
              <li
                className='featured-item'
                key={index}
                /* onClick={setDestination(item.city)} */
              >
                {/*  <Link to={`/hotels-by-city/${item.city}`}> */}
                <Link to={`/hotels-by-city/${item.city}`}>
                  <header className='featured-item-header'>
                    <h3 className='fs-large bold caps text-light'>
                      {item.city}
                    </h3>
                    <p className=' fs-tiny text-light margin-bottom-sm'>
                      {item.count} properties
                    </p>
                    <button
                      className='button-small-accent fs-x-tiny bold text-dark'
                      /* onClick={() => {
                        navigate(`/hotels-by-city/${item.city}`);
                      }} */
                    >
                      See properties
                    </button>
                    {/*  <Link
                    to={
                      import.meta.env.VITE_BACKEND_URL + "/hotels/hotelsbycity"
                    }
                    className='button-small-accent fs-x-tiny bold text-dark'>
                    See properties
                  </Link> */}
                  </header>

                  <img src={item.image} alt='' />
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FeaturedCities;
