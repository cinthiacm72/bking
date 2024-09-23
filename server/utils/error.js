export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  console.log("ErrStatus: ", err.status);
  err.message = message;
  console.log("ErrMessage: ", err.message);
  console.log("createError", message);
  return err;
};
