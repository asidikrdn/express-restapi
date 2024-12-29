/**
 * Extracts data from Sequelize instances by converting them to plain objects.
 * If the input is an array, it recursively extracts data from each item.
 *
 * @param {Object|Array} data - The Sequelize instance or array of instances to be processed.
 * @returns {Object|Array} - The plain object or array of plain objects extracted from the Sequelize instances.
 */
export const extractSequelizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => extractSequelizeData(item));
  } else if (data !== null && typeof data === "object") {
    return { ...data.toJSON() };
  }
  return data;
};
