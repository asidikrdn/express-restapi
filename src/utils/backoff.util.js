/**
 * Executes an async function with exponential backoff on failure.
 *
 * @param {Function} fn - Async function returning a promise.
 * @param {number} [initialBackoff=2] - Initial backoff time in seconds.
 * @param {number} [maxRetries=10] - Maximum retry attempts.
 * @returns {Promise<*>} - Result of the function if successful.
 * @throws {Error} - If all retries fail.
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
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        throw new Error(`Max retries reached. Last error: ${error.message}`);
      }
      await new Promise(res => setTimeout(res, backoff));
      backoff *= 2;
    }
  }
};
