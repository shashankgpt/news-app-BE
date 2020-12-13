"use strict";
var jwt = require("jsonwebtoken");
const { errorReponse, successReponse } = require("../services/responses");
const { updateProfile, getProfile } = require("../helper/profile.helper");
const { getUser } = require("../helper/users.helper");

module.exports.updateProfile = async (event) => {
  try {
    const username = event.requestContext.authorizer.principalId;
    const user = await getUser(username);
    if (Object.keys(user).length < 1)
      return errorReponse(
        event.requestContext.requestId,
        400,
        "No Data Found"
      );

    const profile = await updateProfile(username, event);
    if (Object.keys(user).length < 0)
      return errorReponse(
        event.requestContext.requestId,
        400,
        "No data found"
      );

    return successReponse(200, profile, "Profile is updated.");
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to find user."
    );
  }
};

module.exports.getProfile = async (event) => {
  try {
    const username = event.requestContext.authorizer.principalId;
    const user = await getUser(username);
    console.log(user);
    console.log("hello");
    if (Object.keys(user).length < 1)
      return errorReponse(
        event.requestContext.requestId,
        400,
        "No Data Found"
      );

    const profile = await getProfile(username);
    if (Object.keys(user).length < 0)
      return errorReponse(
        event.requestContext.requestId,
        400,
        "No data found"
      );

    return successReponse(200, profile, "Profile is fetched.");
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to create user."
    );
  }
};
