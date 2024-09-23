export const userColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className='cellgrid flex align-center'>
          <img
            className='cellgrid-img'
            src={params.row.image || "../assets/imgs/default-avatar.png"}
            alt='avatar'
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

export const cityColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "city",
    headerName: "City",
    width: 200,
    renderCell: (params) => {
      return (
        <div className='cellgrid flex align-center'>
          <img
            className='cellgrid-img'
            src={params.row.image || "../assets/imgs/default-avatar.png"}
            alt='avatar'
          />
          {params.row.city}
        </div>
      );
    },
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
