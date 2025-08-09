import { expect, test, describe } from "@jest/globals";
import {
  omitDeletedAtProperties,
  omitPasswordProperty,
  transformKeyToSnakeCase,
  transformKeyToCamelCase,
} from "../../src/utils/format.js";

// Utility test for format functions
describe("Format Utility Tests", () => {
  // --- Transform Functions ---
  describe("Transform Functions", () => {
    const mockSnake = [
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

    const mockCamel = [
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

    // Test snake_case to camelCase
    test("transformKeyToCamelCase: single object", () => {
      const result = transformKeyToCamelCase(mockSnake[0]);
      // Pastikan semua key sudah camelCase
      Object.keys(result).forEach((key) => {
        expect(/^[a-z]+([A-Z][a-z]*)*$/.test(key)).toBe(true);
      });
    });

    test("transformKeyToCamelCase: array of objects", () => {
      const result = transformKeyToCamelCase(mockSnake);
      result.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          expect(/^[a-z]+([A-Z][a-z]*)*$/.test(key)).toBe(true);
        });
      });
    });

    // Test camelCase to snake_case
    test("transformKeyToSnakeCase: single object", () => {
      const result = transformKeyToSnakeCase(mockCamel[0]);
      // Pastikan semua key sudah snake_case
      Object.keys(result).forEach((key) => {
        expect(/^[a-z]+(_[a-z]+)*$/.test(key)).toBe(true);
      });
    });

    test("transformKeyToSnakeCase: array of objects", () => {
      const result = transformKeyToSnakeCase(mockCamel);
      result.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          expect(/^[a-z]+(_[a-z]+)*$/.test(key)).toBe(true);
        });
      });
    });
  });

  // --- Omit Functions ---
  describe("Omit Functions", () => {
    const mockWithDeletedAt = [
      { id: 1, name: "Test User", deleted_at: "2025-01-01T00:00:00Z" },
      { id: 2, name: "User Test", deleted_at: "2025-01-02T00:00:00Z" },
    ];

    const mockWithPassword = [
      { id: 1, name: "Test User", password: "secret" },
      { id: 2, name: "User Test", password: "secret" },
    ];

    // Test hapus properti deleted_at/deletedAt
    test("omitDeletedAtProperties: single object", () => {
      const result = omitDeletedAtProperties(mockWithDeletedAt[0]);
      ["deleted_at", "deletedAt"].forEach((key) => {
        expect(result).not.toHaveProperty(key);
      });
    });

    test("omitDeletedAtProperties: array of objects", () => {
      const result = omitDeletedAtProperties(mockWithDeletedAt);
      result.forEach((obj) => {
        ["deleted_at", "deletedAt"].forEach((key) => {
          expect(obj).not.toHaveProperty(key);
        });
      });
    });

    // Test hapus properti password
    test("omitPasswordProperty: single object", () => {
      const result = omitPasswordProperty(mockWithPassword[0]);
      expect(result).not.toHaveProperty("password");
    });

    test("omitPasswordProperty: array of objects", () => {
      const result = omitPasswordProperty(mockWithPassword);
      result.forEach((obj) => {
        expect(obj).not.toHaveProperty("password");
      });
    });
  });
});

/*
  Catatan:
  - Setiap fungsi diuji untuk input object tunggal dan array of objects.
  - Regex pada expect memastikan format key sesuai (camelCase atau snake_case).
  - Fungsi omit diuji agar field sensitif/deleted tidak ada di hasil.
*/
