const { createClient } = require("redis");

let redisClient;
const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}/0`;

try {
  redisClient = createClient({
    url: redisUrl,
  });
} catch (error) {
  console.error("Invalid Redis URL !");
}

exports.client = redisClient;

exports.redisInit = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully !");
  } catch (error) {
    console.log("Redis connection error", error);
  }
};
