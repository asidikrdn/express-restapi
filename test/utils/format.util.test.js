import { expect, test, describe } from "@jest/globals";
import {
  omitDeletedAtProperties,
  omitPasswordProperty,
  transformCamelToSnake,
  transformSnakeToCamel,
} from "../../src/utils/format.util";
import _ from "lodash";

describe("Format Utility Tests", () => {
  describe("Transform Functions", () => {
    const mockDataSnake = [
      {
        first_name: "John",
        last_name: "Doe",
        created_at: new Date("2025-01-01T00:00:00Z"),
        deleted_at: null,
      },
      {
        first_name: "Doe",
        last_name: "Da",
        created_at: new Date("2025-01-01T00:00:00Z"),
        deleted_at: new Date("2025-01-03T00:00:00Z"),
      },
    ];

    test("test transformSnakeToCamel with single object", () => {
      const result = transformSnakeToCamel(mockDataSnake[0]);
      _.forIn(result, (val, key) => {
        expect(/^[a-z]+([A-Z][a-z]*)*$/.test(key)).toBe(true);
      });
    });

    test("test transformSnakeToCamel with array of object", () => {
      const result = transformSnakeToCamel(mockDataSnake);
      result.forEach((res) => {
        _.forIn(res, (val, key) => {
          expect(/^[a-z]+([A-Z][a-z]*)*$/.test(key)).toBe(true);
        });
      });
    });

    const mockDataCamel = [
      {
        firstName: "Jane",
        lastName: "Doe",
        createdAt: new Date("2025-01-01T00:00:00Z"),
        deletedAt: null,
        password: "secret",
      },
      {
        firstName: "Doe",
        lastName: "John",
        createdAt: new Date("2025-01-01T00:00:00Z"),
        deletedAt: new Date("2025-01-03T00:00:00Z"),
        password: "secret",
      },
    ];

    test("test transformCamelToSnake with single object", () => {
      const result = transformCamelToSnake(mockDataCamel[0]);
      _.forIn(result, (val, key) => {
        expect(/^[a-z]+(_[a-z]+)*$/.test(key)).toBe(true);
      });
    });

    test("test transformCamelToSnake with array of object", () => {
      const result = transformCamelToSnake(mockDataCamel);
      result.forEach((res) => {
        _.forIn(res, (val, key) => {
          expect(/^[a-z]+(_[a-z]+)*$/.test(key)).toBe(true);
        });
      });
    });
  });

  describe("Omit Functions", () => {
    const mockDataWithDeletedAt = [
      {
        id: 1,
        name: "Test User",
        deleted_at: "2025-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "User Test",
        deleted_at: "2025-01-02T00:00:00Z",
      },
    ];

    test("test omitDeletedAtProperties with single object", () => {
      const result = omitDeletedAtProperties(mockDataWithDeletedAt[0]);
      ["deleted_at", "deletedAt"].forEach((key) => {
        expect(result).not.toHaveProperty(key);
      });
    });

    test("test omitDeletedAtProperties with array object", () => {
      const result = omitDeletedAtProperties(mockDataWithDeletedAt);
      result.forEach((res) => {
        ["deleted_at", "deletedAt"].forEach((key) => {
          expect(res).not.toHaveProperty(key);
        });
      });
    });

    const mockDataWithPassword = [
      {
        id: 1,
        name: "Test User",
        password: "secret",
      },
      {
        id: 2,
        name: "User Test",
        password: "secret",
      },
    ];

    test("test omitPasswordProperty with single object", () => {
      const result = omitPasswordProperty(mockDataWithPassword[0]);
      expect(result).not.toHaveProperty("password");
    });

    test("test omitPasswordProperty with single object", () => {
      const result = omitPasswordProperty(mockDataWithPassword);
      result.forEach((res) => {
        expect(res).not.toHaveProperty("password");
      });
    });
  });
});
