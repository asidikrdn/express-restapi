const httpStatus = require("http-status");

exports.successResponse = ({ res, status, data, totalData, limit, page }) => {
  res.status(status || httpStatus.OK).json({
    status: status || httpStatus.OK,
    message: "OK",
    totalData: totalData,
    totalPage: Math.ceil(totalData / limit) || 1,
    currentPage: parseInt(page) || 1,
    data: data,
  });
};

exports.errorResponse = ({ res, error }) => {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
    status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message,
    // data: null, // null == undefined
  });
};
