const dynamodb = require("../services/dynamodb");
const passwordHash = require("password-hash");
const { errorReponse, successReponse } = require("../services/responses");

async function createUser(event) {
  try {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        username: data.username,
        password: passwordHash.generate(data.password),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    await dynamodb.put(params).promise();
    return successReponse(
      201,
      { userId: params.Item.id, username: params.Item.username },
      "User is created"
    );
  } catch (err) {
    return errorReponse(
      event.requestContext.requestId,
      501,
      "Unable to create user"
    );
  }
}

module.exports = {
  createUser,
};
