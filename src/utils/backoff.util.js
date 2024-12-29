/**
 * Executes a function with an exponential backoff strategy in case of failures.
 *
 * This function attempts to execute the provided asynchronous function `fn`.
 * If the function fails, it will retry the execution with an exponential backoff
 * delay until the maximum number of retries is reached.
 *
 * @param {Function} fn - The asynchronous function to execute. It should return a promise.
 * @param {number} [initialBackoff=2] - The base backoff time in seconds. The delay will double with each retry.
 * @param {number} [maxRetries=10] - The maximum number of retry attempts before giving up.
 * @returns {Promise<*>} - A promise that resolves to the result of the function if successful.
 * @throws {Error} Throws an error if the maximum number of retries is reached.
 */
export const exponentialBackoff = async (
  fn,
  initialBackoff = 2,
  maxRetries = 10
) => {
  let attempt = 0;
  let backoff = initialBackoff * 1000;

  while (attempt < maxRetries) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
      attempt++;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, backoff));
        backoff *= 2;
      } else {
        throw new Error(`Max retries reached. Last error: ${error.message}`);
      }
    }
  }
};
