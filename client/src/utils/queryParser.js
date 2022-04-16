const getQueryParams = (paramName, location) => {
  if (location.search === '') {
    return [];
  }
  const objectOfParams = {};
  const substring = location.search.split('?')[1].split('&');
  substring.forEach((param) => {
    const keyVluePair = param.split('=');
    objectOfParams[keyVluePair[0]] = keyVluePair[1];
  });
  if (!objectOfParams.hasOwnProperty(paramName)) {
    return [];
  }
  return objectOfParams[paramName].split(',');
};

export default getQueryParams;
