exports.UnauthorizedError = {
  description: "Unauthorized",
  content: {
    "application/json": {
      example: {
        status: 401,
        message: "Token not found || Your'e not allowed to access this",
      },
    },
  },
};

exports.BadRequestError = {
  description: "Bad Request",
  content: {
    "application/json": {
      example: {
        status: 400,
        message: "request data invalid",
      },
    },
  },
};

exports.UpdateError = {
  description: "Update failed",
  content: {
    "application/json": {
      example: {
        status: 500,
        message: "error on update data",
      },
    },
  },
};

exports.CreateError = {
  description: "Create failed",
  content: {
    "application/json": {
      example: {
        status: 500,
        message: "error on create data",
      },
    },
  },
};

exports.DeleteError = {
  description: "Delete failed",
  content: {
    "application/json": {
      example: {
        status: 500,
        message: "error on delete data",
      },
    },
  },
};

exports.NotFoundError = {
  description: "Data not found",
  content: {
    "application/json": {
      example: {
        status: 404,
        message: "error on get data",
      },
    },
  },
};
