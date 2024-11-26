 const tryCatch = (routehandler) => {
  return async (req, res, next) => {
    try {
      await routehandler(req, res, next);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "error",
          status: "failed",
          error_message: error.message,
        });
    }
  };
};
export default tryCatch