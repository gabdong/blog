/**
 * * Get HTTP header cookie
 *
 * @param {String} str : cookie string
 * @param {String} target : target key
 *
 * @return {String} value : cookie value
 */
exports.getCookie = (str, target) => {
  if (!str) return null;

  const split = str.split(";");

  for (const cookieString of split) {
    const arr = cookieString.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();

    if (key == target) return value;
  }

  return null;
};
