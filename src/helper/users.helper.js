const dynamodb = require("../services/dynamodb");
const passwordHash = require("password-hash");

async function createUser(event) {
  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE_USER,
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
    TableName: process.env.DYNAMODB_TABLE_USER,
    Key: {
      username,
    },
  };
  // fetch todo from the database
  const resp = dynamodb.get(params).promise();
  delete resp.password
  return resp;
}

async function verifyUser(username, password) {
  // TODO: remove password from projection
  const params = {
    TableName: process.env.DYNAMODB_TABLE_USER,
    Key: {
      username,
    },
  };
  const resp = await dynamodb.get(params).promise();
console.log(resp);
  if(resp.Item && resp.Item.password && passwordHash.verify(password, resp.Item.password)) {
  delete resp.password
  return resp;
  }
  return {}
}

module.exports = {
  createUser,
  getUser,
  verifyUser,
};
