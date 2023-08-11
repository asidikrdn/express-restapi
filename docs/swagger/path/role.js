const {
  createRoleRequest,
  updateRoleRequest,
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
  tags: ["Roles"],
  summary: "Get list of roles",
  description: "Retrieve a list of roles",
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
                id: 1,
                role: "Superadmin",
              },
              {
                id: 2,
                role: "Admin",
              },
              {
                id: 3,
                role: "User",
              },
            ],
          },
        },
      },
    },
    404: NotFoundError,
    401: UnauthorizedError,
  },
};

const findOne = {
  tags: ["Roles"],
  summary: "Get detail of one role data",
  description: "Retrieve detail of one role data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "roleId",
      in: "path",
      description: "role id",
      required: true,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
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
            data: {
              id: 2,
              role: "Admin",
            },
          },
        },
      },
    },
    404: NotFoundError,
    401: UnauthorizedError,
  },
};

const update = {
  tags: ["Roles"],
  summary: "Update some role data",
  description: "Update something detail of one role data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "roleId",
      in: "path",
      description: "role id",
      required: true,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
      },
    },
  ],
  requestBody: updateRoleRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            data: {
              id: 4,
              role: "reseller",
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

const deleteRole = {
  tags: ["Roles"],
  summary: "Delete some role data",
  description: "Delete one role data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "roleId",
      in: "path",
      description: "role id",
      required: true,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
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
            data: {
              id: 4,
              role: "reseller",
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

const createRole = {
  tags: ["Roles"],
  summary: "Create role data",
  description: "Create one role data",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: createRoleRequest,
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          example: {
            status: 200,
            message: "OK",
            data: {
              id: 4,
              role: "reseller",
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

const rolePath = {
  "/roles": {
    get: findAll,
    post: createRole,
  },
  "/roles/{roleId}": {
    get: findOne,
    patch: update,
    delete: deleteRole,
  },
};

module.exports = rolePath;
