import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  userId: undefined,
  hotelId: undefined,
  roomId: undefined,
  /*  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  }, */
};

export const ReserveContext = createContext(INITIAL_STATE);

const ReserveReducer = (state, action) => {
  switch (action.type) {
    case "NEW_RESERVE":
      return action.payload;
    case "DELETE_RESERVE":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const ReserveContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReserveReducer, INITIAL_STATE);
  return (
    <ReserveContext.Provider
      value={{
        userId: state.userId,
        hotelId: state.hotelId,
        roomId: state.roomId,
        dispatch,
      }}>
      {children}
    </ReserveContext.Provider>
  );
};
