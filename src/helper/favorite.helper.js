const dynamodb = require("../services/dynamodb");

async function createFavorite(username,event) {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE_FAV,
      Item: {
        username,
        newsId: data.newsId,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    console.log("fav");
  console.log(params)
    const resp = await dynamodb.put(params).promise();
    return resp;
  }

  async function deleteFavorite(event) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_FAV,
      Key: {
          username,
          newsId: data.newsId,
      }
    };
  
    const resp = await dynamodb.delete(params).promise();
    return resp;
  }

  async function getFavForUser(username) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_FAV,
      FilterExpression: "#username = :username",
      ExpressionAttributeNames: {
          "#username": "username",
      },
      ExpressionAttributeValues: {
           ":username": username,
      }
    };
  
    const resp = await dynamodb.scan(params).promise();
    return resp;
  }


  module.exports = {
    createFavorite,
    deleteFavorite,
    getFavForUser
};
