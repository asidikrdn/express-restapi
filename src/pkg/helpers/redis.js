const { client } = require("../../../config/redis");

exports.setRedisValue = async (key, value, expiry) => {
  try {
    await client.set(key, value, {
      EX: expiry,
    });
  } catch (error) {
    console.log("Set Value error : ", error);
    return error;
  }
};

exports.getRedisValue = async (key) => {
  const response = { data: null, error: null };

  try {
    const value = await client.get(key);
    response.data = value;
  } catch (error) {
    console.log("Get Value error : ", error);
    response.error = error;
  }

  return response;
};
