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

async function getUser(username) {
    // TODO: remove password from projection
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          username,
        },
      };
      // fetch todo from the database
      const resp = dynamodb.get(params).promise();
      return resp;
}

async function verifyUser(username, password) {
    // TODO: remove password from projection
    const params = {
        TableName : process.env.DYNAMODB_TABLE,
        KeyConditionExpression: "username = :username and password = :password",
        Key: {
            username,
          },
        ExpressionAttributeValues: {
            ":username": username,
            ":password": password,
        }
    };
      // fetch todo from the database
      const resp = dynamodb.get(params).promise();
      return resp;
}

module.exports = {
  createUser,
  getUser,
  verifyUser
};
