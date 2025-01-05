import moment from "moment-timezone";
import { exponentialBackoff } from "../../src/utils/backoff.util";
import { expect, jest, test, describe, beforeEach } from "@jest/globals";

describe("exponentialBackoff", () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  test("should resolve successfully on the first attempt", async () => {
    mockFn.mockResolvedValue("Success");
    const result = await exponentialBackoff(mockFn);
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should retry on failure and resolve successfully", async () => {
    mockFn
      .mockRejectedValueOnce(new Error("First attempt failed"))
      .mockResolvedValue("Success");

    const result = await exponentialBackoff(mockFn);
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test("should throw an error after reaching max retries", async () => {
    mockFn.mockRejectedValue(new Error("Always fails"));

    await expect(exponentialBackoff(mockFn, 1, 3)).rejects.toThrow(
      "Max retries reached. Last error: Always fails"
    );
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test("should use the correct backoff times", async () => {
    mockFn
      .mockRejectedValueOnce(new Error("First attempt failed"))
      .mockRejectedValueOnce(new Error("Second attempt failed"))
      .mockRejectedValueOnce(new Error("Third attempt failed"))
      .mockResolvedValue("Success");

    const initialBackoff = 1;
    const maxRetries = 4;

    const start = moment();
    await exponentialBackoff(mockFn, initialBackoff, maxRetries);
    const end = moment();

    let backoffDuration = 1000;
    let expectDuration = 0;
    for (let i = initialBackoff; i < maxRetries; i++) {
      if (i == 1) {
        backoffDuration *= initialBackoff;
        expectDuration += backoffDuration * initialBackoff;
      } else {
        backoffDuration *= 2;
        expectDuration += backoffDuration;
      }
    }
    const realDuration = end.diff(start, "millisecond");

    // console.log(expectDuration, realDuration);

    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(realDuration).toBeGreaterThanOrEqual(expectDuration);
    expect(realDuration).toBeLessThanOrEqual(expectDuration + 100);
  }, 10000);
});
