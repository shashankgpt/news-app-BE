"use strict";

const { errorReponse } = require("../services/responses");
const { createUser } = require("../helper/users.helper");

module.exports.create = async (event) => {
  try {
    const data = JSON.parse(event.body);
    if (
      typeof data.username !== "string" ||
      typeof data.password !== "string"
    ) {
      console.error("Validation Failed");
      return errorReponse(
        event.requestContext.requestId,
        400,
        "Unable to create user."
      );
    }
    return await createUser(event);
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to create user."
    );
  }
};
