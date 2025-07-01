import moment from "moment-timezone";
import { exponentialBackoff } from "../../src/utils/backoff.util";
import { expect, jest, test, describe, beforeEach } from "@jest/globals";

// Test suite for exponentialBackoff utility
describe("exponentialBackoff", () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  // Test: resolves immediately if no error
  test("resolves on first attempt", async () => {
    mockFn.mockResolvedValue("Success");
    const result = await exponentialBackoff(mockFn);
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  // Test: retries once on failure, then succeeds
  test("retries on failure and then resolves", async () => {
    mockFn
      .mockRejectedValueOnce(new Error("First attempt failed"))
      .mockResolvedValue("Success");

    const result = await exponentialBackoff(mockFn);
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  // Test: throws after max retries
  test("throws after reaching max retries", async () => {
    mockFn.mockRejectedValue(new Error("Always fails"));

    await expect(exponentialBackoff(mockFn, 1, 3)).rejects.toThrow(
      "Max retries reached. Last error: Always fails"
    );
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  // Test: correct backoff timing between retries
  test(
    "uses correct backoff times",
    async () => {
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

      // Calculate expected total backoff duration
      let backoff = 1000;
      let expectedDuration = 0;
      for (let i = initialBackoff; i < maxRetries; i++) {
        backoff *= i === 1 ? initialBackoff : 2;
        expectedDuration += backoff;
      }
      const actualDuration = end.diff(start, "millisecond");

      expect(mockFn).toHaveBeenCalledTimes(4);
      expect(actualDuration).toBeGreaterThanOrEqual(expectedDuration);
      expect(actualDuration).toBeLessThanOrEqual(expectedDuration + 100);
    },
    10000 // timeout for this test
  );
});
