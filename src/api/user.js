"use strict";
const jwt = require("jsonwebtoken");
const { errorReponse, successReponse } = require("../services/responses");
const { createUser, getUser, verifyUser } = require("../helper/users.helper");
const { createProfile } = require("../helper/profile.helper");

module.exports.signup = async (event) => {
  try {
    const data = JSON.parse(event.body);
    // TODO: ADD more validations
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
    const user = await getUser(data.username);
    if (Object.keys(user).length > 0)
      return errorReponse(
        event.requestContext.requestId,
        400,
        "Username alreay exists"
      );

    await createUser(event);
    await createProfile(event)

    return successReponse(201, { username: data.username }, "User is created.");
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to create user."
    );
  }
};

module.exports.login = async (event) => {
  try {
    var test ='123';
    const data = JSON.parse(event.body);
    // TODO: ADD more validations
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
    const user = await verifyUser(data.username, data.password);
    console.log(user);
    if (user && user.Item && user.Item.username === data.username) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            username: data.username,
          },
        },
        "secret"
      );
      return successReponse(
        200,
        { username: data.username, token },
        "LOGIN SUCESS"
      );
    }
    return errorReponse(
      event.requestContext.requestId,
      400,
      "Incorrect credentials"
    );
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to create user."
    );
  }
};
