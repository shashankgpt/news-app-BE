function errorReponse(requestId, code, message, details, innererror = '') {
  console.log('test2')
  return {
    statusCode: code || 500,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-origin": "*",
      "Access-Control-Allow-Credential": "true",
    },
    body: JSON.stringify({
      error: { message, details, innererror },
      requestId,
    }),
  };
}

function successReponse(code, responseData, message = "SUCCESS") {
  return {
    statusCode: code || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-origin": "*",
      "Access-Control-Allow-Credential": "true",
    },
    body: JSON.stringify({
      message,
      data: responseData,
    }),
  };
}

module.exports = {
  errorReponse,
  successReponse,
};
