import useFetch from "../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteFile, deleteCityFile, deleteFiles } from "../firebase/config";
import Loader from "../components/Loader";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/${path}`
  );
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const deleteUserImage = (urlImage) => {
    deleteFile(urlImage);
  };

  const deleteCityImage = (urlImage) => {
    deleteCityFile(urlImage);
  };

  const deleteHotelImages = (urlsImages) => {
    deleteFiles(urlsImages);
  };

  const handleDelete = async (id, url) => {
    try {
      if (path === "users") {
        let urlImageToDel = url;
        urlImageToDel ? deleteUserImage(url) : "";
      } else if (path === "cities") {
        let urlImageToDel = url;
        urlImageToDel ? deleteCityImage(url) : "";
      } else {
        let urlsImagesToDel = url;
        urlsImagesToDel ? deleteHotelImages(url) : "";
      }
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/${path}/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
          },
        }
      );

      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/${path}/${params.row._id}`}>View</Link>

            {path === "users" || path === "cities" || path === "hotels" ? (
              <button
                className='deleteButton'
                onClick={() => {
                  path === "users" || path === "cities"
                    ? handleDelete(params.row._id, params.row.image)
                    : handleDelete(params.row._id, params.row.images);
                }}>
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return (
    <section className='main-section'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <header className='margin-bottom-sm flex flex-a-center flex-jc-between flex-wrap flex-gap-md'>
            <div>
              <h1 className='fs-x-huge bold caps'>{path}</h1>
              <p className='fs-small'>
                Currently {data.length} of {path}
              </p>
            </div>

            <Link
              className='button-sm button-sm-primary fs-small bold'
              to={`/${path}/new`}>
              Add new
            </Link>
          </header>

          <div className='datagrid-container'>
            <DataGrid
              rows={list}
              columns={columns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 20,
                  },
                },
              }}
              pageSizeOptions={[20]}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={(row) => row._id}
            />
          </div>
        </>
      )}
      {error && <div className='message message-danger'>{error.message}</div>}
    </section>
  );
};

export default Datatable;
