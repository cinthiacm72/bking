import { useContext } from "react";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import List from "./pages/List";
import NewUser from "./pages/NewUser";
import NewCity from "./pages/NewCity";
import NewHotel from "./pages/NewHotel";
import NewRoom from "./pages/NewRoom";
import SingleUser from "./components/SingleUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import {
  userColumns,
  cityColumns,
  hotelColumns,
  roomColumns,
} from "./listSource.jsx";
import {
  userInputs,
  cityInputs,
  hotelInputs,
  roomInputs,
} from "./newSource.jsx";
import "./App.css";
import SideMenu from "./components/SideMenu";
import SingleCity from "./components/SingleCity";
import SingleHotel from "./components/SingleHotel";
import SingleRoom from "./components/SingleRoom";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<LoginAdmin />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <Home />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='/logout'></Route>

          <Route path='/users'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <List columns={userColumns} />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path=':userId'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <SingleUser />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path='new'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <NewUser inputs={userInputs} title='Add New User' />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='/cities'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <List columns={cityColumns} />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path=':cityId'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <SingleCity />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path='new'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <NewCity inputs={cityInputs} title='Add New City' />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='/hotels'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <List columns={hotelColumns} />
                  </SideMenu>
                </ProtectedRoute>
              }
            />

            <Route
              path=':hoteltId'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <SingleHotel />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path='new'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <NewHotel inputs={hotelInputs} title='Add New Hotel' />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='/rooms'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <List columns={roomColumns} />{" "}
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path=':roomId'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <SingleRoom />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
            <Route
              path='new'
              element={
                <ProtectedRoute>
                  <SideMenu>
                    <NewRoom inputs={roomInputs} title='Add New Room' />
                  </SideMenu>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
