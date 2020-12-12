const dynamodb = require("../services/dynamodb");

async function createProfile(event) {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE_PROFILE,
      Item: {
        username: data.username,
        firstName:data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        gender: data.gender || '',
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
  
    const resp = await dynamodb.put(params).promise();
    return resp;
  }

  async function updateProfile(username,event) {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE_PROFILE,
      Key: {
          username
      }, 
      UpdateExpression: "set firstname = :firstname, lastname = :lastname, email = :email, gender = :gender, updatedAt= :updatedAt",
      ExpressionAttributeValues: {
          ":firstname": data.firstName || '',
          ":lastname": data.lastname || '',
          ":email": data.email || '',
          ":gender": data.gender || '',
          ":updatedAt": timestamp,
      },
      ReturnValues:"UPDATED_NEW"
    };
  
    const resp = await dynamodb.update(params).promise();
    console.log(resp);
    return resp;
  }

  async function getProfile(username) {
    // TODO: remove password from projection
    const params = {
      TableName: process.env.DYNAMODB_TABLE_PROFILE,
      Key: {
        username,
      },
    };
    // fetch todo from the database
    const resp = dynamodb.get(params).promise();
    delete resp.password
    return resp;
  }

  module.exports = {
      createProfile,
      updateProfile,
      getProfile
  };
  