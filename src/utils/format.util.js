import _ from "lodash";
import moment from "moment-timezone";
import { TZ } from "./env.util.js";

/**
 * Transforms an object from snake_case to camelCase.
 * @param {Object|Array} obj - The object or array to be transformed.
 * @returns {Object|Array} - The transformed object or array in camelCase.
 */
export const transformSnakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformSnakeToCamel(item));
  } else if (obj !== null && typeof obj === "object") {
    return _.mapValues(
      _.mapKeys(obj, (value, key) => _.camelCase(key)),
      (value) => {
        if (value instanceof Date) {
          return moment(value).tz(TZ).format("YYYY-MM-DD HH:mm:ss ZZ");
        }
        return transformSnakeToCamel(value);
      }
    );
  }
  return obj;
};

/**
 * Transforms an object from camelCase to snake_case.
 * @param {Object|Array} obj - The object or array to be transformed.
 * @returns {Object|Array} - The transformed object or array in snake_case.
 */
export const transformCamelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformCamelToSnake(item));
  } else if (obj !== null && typeof obj === "object") {
    return _.mapValues(
      _.mapKeys(obj, (value, key) => _.snakeCase(key)),
      (value) => {
        if (value instanceof Date) {
          return moment(value).tz(TZ).format("YYYY-MM-DD HH:mm:ss ZZ");
        }
        return transformCamelToSnake(value);
      }
    );
  }
  return obj;
};

/**
 * Removes the deleted_at and deletedAt properties from an object.
 * @param {Object|Array} obj - The object or array to be processed.
 * @returns {Object|Array} - The object or array without the deleted_at and deletedAt properties.
 */
export const omitDeletedAtProperties = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => omitDeletedAtProperties(item));
  } else if (obj !== null && typeof obj === "object") {
    return _.mapValues(
      _.omitBy(
        obj,
        (value, key) => key === "deleted_at" || key === "deletedAt"
      ),
      (value) => {
        if (value instanceof Date) {
          return value;
        }
        return omitDeletedAtProperties(value);
      }
    );
  }
  return obj;
};

/**
 * Removes the password property from an object.
 * @param {Object|Array} obj - The object or array to be processed.
 * @returns {Object|Array} - The object or array without the password property.
 */
export const omitPasswordProperty = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => omitPasswordProperty(item));
  } else if (obj !== null && typeof obj === "object") {
    return _.mapValues(_.omit(obj, "password"), (value) => {
      if (value instanceof Date) {
        return value;
      }
      return omitPasswordProperty(value);
    });
  }
  return obj;
};
