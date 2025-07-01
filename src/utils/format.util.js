import _ from "lodash";
import moment from "moment-timezone";
import { TZ } from "./env.util.js";

// Format Date to string with timezone
const formatDate = (value) =>
  value instanceof Date
    ? moment(value).tz(TZ).format("YYYY-MM-DD HH:mm:ss ZZ")
    : value;

// Recursively transform object keys and format Date values
const transformKeysAndValues = (data, keyTransformer) => {
  if (Array.isArray(data)) {
    return data.map((item) => transformKeysAndValues(item, keyTransformer));
  }
  if (data instanceof Date) {
    return formatDate(data);
  }
  if (_.isObject(data)) {
    return _.reduce(
      data,
      (result, value, key) => {
        result[keyTransformer(key)] = transformKeysAndValues(value, keyTransformer);
        return result;
      },
      {}
    );
  }
  return data;
};

// Convert all keys from snake_case to camelCase
export const transformSnakeToCamel = (obj) =>
  transformKeysAndValues(obj, _.camelCase);

// Convert all keys from camelCase to snake_case
export const transformCamelToSnake = (obj) =>
  transformKeysAndValues(obj, _.snakeCase);

// Recursively omit specified keys from object
const omitKeys = (obj, keys) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => omitKeys(item, keys));
  }
  if (obj && typeof obj === "object") {
    return _.mapValues(_.omit(obj, keys), (v) =>
      v instanceof Date ? v : omitKeys(v, keys)
    );
  }
  return obj;
};

// Omit 'deleted_at' and 'deletedAt' properties
export const omitDeletedAtProperties = (obj) =>
  omitKeys(obj, ["deleted_at", "deletedAt"]);

// Omit 'password' property
export const omitPasswordProperty = (obj) => omitKeys(obj, ["password"]);
