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

exports.loginRequest = {
  description: "Request body for login",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      example: {
        username: "superadmin@mail.com",
        password: "inirahasia",
      },
    },
  },
};

exports.registerUserRequest = {
  description: "Request body for create user",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      example: {
        fullname: "Ahmad Sidik",
        email: "sidikrudini16@gmail.com",
        phone: "087711356758",
        address: "kota bogor",
        password: "inirahasia",
      },
    },
  },
};

exports.registerAdminRequest = {
  description: "Request body for create user",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
          password: {
            type: "string",
          },
          roleId: {
            type: "integer",
          },
        },
      },
      example: {
        fullname: "Ahmad",
        email: "admin@gmail.com",
        phone: "087711356759",
        address: "Kota Bogor",
        password: "inirahasia",
        roleId: 2,
      },
    },
  },
};

exports.updateUserRequest = {
  description: "Request body for update user's data",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
          roleId: {
            type: "integer",
          },
        },
      },
      example: {
        fullname: "Ahmad Sidik Rudini",
        email: "ahmadsidikr.work@gmail.com",
        phone: "087711356799",
        address: "Tanjung Priok",
        roleId: 2,
      },
    },
    "multipart/form-data": {
      schema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
          roleId: {
            type: "integer",
          },
          profileImage: {
            type: "file",
            format: "binary", // Indicates file upload
          },
        },
      },
      example: {
        fullname: "Ahmad Sidik Rudini",
        email: "ahmadsidikr.work@gmail.com",
        phone: "087711356799",
        address: "Tanjung Priok",
        roleId: 2,
      },
    },
  },
};

exports.resendOTPRequest = {
  description: "Request body for resend otp",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
        },
      },
      example: {
        email: "superadmin@mail.com",
      },
    },
  },
};

exports.verifyOTPRequest = {
  description: "Request body for resend otp",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          otp: {
            type: "string",
          },
        },
      },
      example: {
        email: "superadmin@mail.com",
        otp: "4557",
      },
    },
  },
};
