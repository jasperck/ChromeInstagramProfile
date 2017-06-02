/**
 * fixIdWithBigNumber
 * 
 * Id in payload responsed from Instagram API is a big number,
 * directly parse it into object will cause number overflow be rounded,
 * thus we convert it into string first and parse it after.
 * @param {Object} response api response 
 * @returns {Object}
 */
export const fixIdWithBigNumber = (response) => {
  let regx = /"next_max_id": (\d+)/g;
  
  return response.replace(regx, '"next_max_id": "$1"');
};

/**
 * parseJson
 * 
 * Parse response into object
 * @param {Object} response api response
 * @returns {Object}
 */
export const parseJson = (response) => JSON.parse(response);

/**
 * transformResponse
 * 
 * Transform response before it passed to then/catch
 * @param {Object} response api response 
 */
export const transformResponse = (response) => {
  response = fixIdWithBigNumber(response);

  response = parseJson(response);

  return response;
};