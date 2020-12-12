const dynamodb = require("../services/dynamodb");
const passwordHash = require("password-hash");
const { errorReponse, successReponse } = require("../services/responses");

async function createUser(event) {
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

    const resp = await dynamodb.put(params).promise();
    return resp;
}

module.exports = {
  createUser,
};
