const {
  registerUserRequest,
  registerAdminRequest,
  updateUserRequest,
  loginRequest,
  resendOTPRequest,
  verifyOTPRequest,
} = require("../component/request");
const {
  UnauthorizedError,
  CreateError,
  DeleteError,
  NotFoundError,
  UpdateError,
  BadRequestError,
} = require("../component/response");

const findAll = {
  tags: ["Users"],
  summary: "Get list of users",
  description: "Retrieve a list of users",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "page",
      in: "query",
      description: "Page number for pagination",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
      },
    },
    {
      name: "limit",
      in: "query",
      description: "Number of items per page",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 10,
      },
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalData: 3,
            totalPage: 1,
            currentPage: 1,
            data: [
              {
                id: "6a3e28cc-d132-493b-a8e1-ac5d35b22e4e",
                fullname: "Superadmin",
                email: "superadmin@mail.com",
                isEmailVerified: true,
                phone: null,
                isPhoneVerified: null,
                address: null,
                image: null,
                role: {
                  id: 1,
                  role: "Superadmin",
                },
              },
              {
                id: "01aaa0a6-23d7-4518-8cf0-d5e786d70b35",
                fullname: "Ahmad Sidik",
                email: "sidikrudini16@gmail.com",
                isEmailVerified: false,
                phone: "087711356758",
                isPhoneVerified: false,
                address: "kota bogor",
                image: null,
                role: {
                  id: 3,
                  role: "User",
                },
              },
              {
                id: "36004950-32f2-468f-b6e7-7e1ab0cce579",
                fullname: "Ahmad",
                email: "admin@gmail.com",
                isEmailVerified: false,
                phone: "087711356759",
                isPhoneVerified: false,
                address: "Kota Bogor",
                image: null,
                role: {
                  id: 2,
                  role: "Admin",
                },
              },
            ],
          },
        },
      },
    },
    401: UnauthorizedError,
  },
};

const findOne = {
  tags: ["Users"],
  summary: "Get detail of one user data",
  description: "Retrieve detail of one user data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "user id",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "36004950-32f2-468f-b6e7-7e1ab0cce579",
              fullname: "Ahmad",
              email: "admin@gmail.com",
              isEmailVerified: false,
              phone: "087711356759",
              isPhoneVerified: false,
              address: "Kota Bogor",
              image: null,
              role: {
                id: 2,
                role: "Admin",
              },
            },
          },
        },
      },
    },
    404: NotFoundError,
    401: UnauthorizedError,
  },
};

const deleteUser = {
  tags: ["Users"],
  summary: "Delete some user data",
  description: "Delete one user data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "user id",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "36004950-32f2-468f-b6e7-7e1ab0cce579",
              fullname: "Ahmad",
              email: "admin@gmail.com",
              isEmailVerified: false,
              phone: "087711356759",
              isPhoneVerified: false,
              address: "Kota Bogor",
              image: null,
              role: {
                id: 2,
                role: "Admin",
              },
            },
          },
        },
      },
    },
    404: NotFoundError,
    500: DeleteError,
    401: UnauthorizedError,
  },
};

const login = {
  tags: ["Auth"],
  summary: "Login",
  description: "Login",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: loginRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "366a6855-1a80-410a-9852-e9da7072a88d",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NmE2ODU1LTFhODAtNDEwYS05ODUyLWU5ZGE3MDcyYTg4ZCIsImZ1bGxuYW1lIjoiU3VwZXJhZG1pbiIsImVtYWlsIjoic3VwZXJhZG1pbkBtYWlsLmNvbSIsInJvbGVJZCI6MSwiaWF0IjoxNjkyMTAxMDU1LCJleHAiOjE2OTIxODc0NTUsImlzcyI6IkFobWFkIFNpZGlrIFJ1ZGluaSJ9.1L71Pf9ULYeOY_GPOJw3hTOqHWeAh6ocH1Hdd50lLeI",
            },
          },
        },
      },
    },
    400: BadRequestError,
    500: CreateError,
    401: UnauthorizedError,
  },
};

const registerUser = {
  tags: ["Auth"],
  summary: "Create user data",
  description: "Create one user data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: registerUserRequest,
  responses: {
    201: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 201,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "c99edf4d-9aad-41fb-ab40-5edf08431cab",
              fullname: "Ahmad Sidik",
              email: "sidikrudini16@gmail.com",
              isEmailVerified: false,
              phone: "087711356758",
              isPhoneVerified: false,
              address: "kota bogor",
              image: null,
              role: {
                id: 3,
                role: "User",
              },
            },
          },
        },
      },
    },
    400: BadRequestError,
    500: CreateError,
    401: UnauthorizedError,
  },
};

const registerAdmin = {
  tags: ["Auth"],
  summary: "Create user data",
  description: "Create one user data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: registerAdminRequest,
  responses: {
    201: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 201,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "4b983e77-82df-4c5f-8fb8-f0e34ce3047e",
              fullname: "Ahmad",
              email: "admin@gmail.com",
              isEmailVerified: false,
              phone: "087711356759",
              isPhoneVerified: false,
              address: "Kota Bogor",
              image: null,
              role: {
                id: 2,
                role: "Admin",
              },
            },
          },
        },
      },
    },
    400: BadRequestError,
    500: CreateError,
    401: UnauthorizedError,
  },
};

const updateUser = {
  tags: ["Users"],
  summary: "Update some user data",
  description: "Update something detail of one user data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "user id",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: updateUserRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "01aaa0a6-23d7-4518-8cf0-d5e786d70b35",
              fullname: "Ahmad Sidik Rudini",
              email: "ahmadsidikr.work@gmail.com",
              isEmailVerified: false,
              phone: "087711356799",
              isPhoneVerified: false,
              address: "Tanjung Priok",
              image: null,
              role: {
                id: 2,
                role: "Admin",
              },
            },
          },
        },
      },
    },
    400: BadRequestError,
    500: UpdateError,
    401: UnauthorizedError,
  },
};

const checkAuth = {
  tags: ["Auth"],
  summary: "Check Auth",
  description: "Checking is user still authenticated",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "cbba6d45-bd49-45bd-a256-1c49ef05b5ca",
              fullname: "Ahmad Sidik",
              email: "sidikrudini16@gmail.com",
              isEmailVerified: true,
              phone: "087711356758",
              isPhoneVerified: false,
              address: "kota bogor",
              image: null,
              role: {
                id: 3,
                role: "User",
              },
            },
          },
        },
      },
    },
    401: UnauthorizedError,
  },
};

const resendOTP = {
  tags: ["Auth"],
  summary: "Resend OTP",
  description: "Resend OTP Code to user's mail",
  requestBody: resendOTPRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: "OTP successfully sent to user's email",
          },
        },
      },
    },
    404: NotFoundError,
    400: BadRequestError,
  },
};

const verifyOTP = {
  tags: ["Auth"],
  summary: "Verify OTP",
  description: "Verify OTP Code and change use's email to be verified",
  requestBody: verifyOTPRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            totalPage: 1,
            currentPage: 1,
            data: {
              id: "cbba6d45-bd49-45bd-a256-1c49ef05b5ca",
              fullname: "Ahmad Sidik",
              email: "sidikrudini16@gmail.com",
              isEmailVerified: true,
              phone: "087711356758",
              isPhoneVerified: false,
              address: "kota bogor",
              image: null,
              role: {
                id: 3,
                role: "User",
              },
            },
          },
        },
      },
    },
    404: NotFoundError,
    400: BadRequestError,
  },
};

const userPath = {
  "/users": {
    get: findAll,
  },
  "/users/{userId}": {
    get: findOne,
    patch: updateUser,
    delete: deleteUser,
  },
  "/login": {
    post: login,
  },
  "/register": {
    post: registerUser,
  },
  "/register/admin": {
    post: registerAdmin,
  },
  "/checkauth": {
    get: checkAuth,
  },
  "/resend-otp": {
    post: resendOTP,
  },
  "/verify-otp": {
    post: verifyOTP,
  },
};

module.exports = userPath;
