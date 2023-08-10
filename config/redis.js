const { createClient } = require("redis");

const client = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}/0`,
});

// console.log(
//   `URL : redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}/0`
// );

client.on("error", (err) => console.log("Redis Client Error", err));

exports.redisInit = async () => {
  await client.connect();
};

exports.setValue = async (key, value, expiry) => {
  await client.set(key, value, {
    EX: expiry,
  });
};

exports.getValue = async (key) => {
  const value = await client.get(key);
  return value;
};