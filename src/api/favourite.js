"use strict";

const { errorReponse, successReponse } = require("../services/responses");
const { createFavorite, deleteFavorite, getFavForUser } = require("../helper/favorite.helper");

module.exports.createFavorite = async (event) => {
  try {
    const profile = await createFavorite("test", event);
    return successReponse(200, profile, "Favorite is updated.");
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to add fav."
    );
  }
};

module.exports.deleteFavourite = async (event) => {
  try {
    await deleteFavorite("test", event);
    return successReponse(200, {}, "Favorite is deleted.");
  } catch (err) {
    console.log(err);
    return errorReponse(
      event.requestContext.requestId,
      500,
      "Unable to create user."
    );
  }
};

module.exports.getAllFavByUser = async (event) => {
    try {
       const data =  await getFavForUser("test");
        return successReponse(200, data, "Favorite is fetched.");
    } catch (err) {
      console.log(err);
      return errorReponse(
        event.requestContext.requestId,
        500,
        "Unable to create user."
      );
    }
  };
