exports.createRoleRequest = {
  description: "Request body for create role",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          role: {
            type: "string",
          },
        },
      },
      example: {
        role: "reseller",
      },
    },
  },
};

exports.updateRoleRequest = {
  description: "Request body for update role",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          role: {
            type: "string",
          },
        },
      },
      example: {
        role: "reseller",
      },
    },
  },
};
