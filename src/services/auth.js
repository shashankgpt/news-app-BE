'use strict';

const jwt = require('jsonwebtoken');

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {principalId:'',policyDocument:{}};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {Version:'',Statement:[]};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [{Action:'',Effect:'',Resource:''}];
    const statementOne = {Action:'',Effect:'',Resource:''};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
function authorize(event, context, cb) {
    if (event.authorizationToken) {
    jwt.verify(event.authorizationToken.replace(/^Bearer\s/, ''), "secret", (err, decoded) => {
        if (err) {
          console.log('Unauthorized user:', err.message);
          cb('Unauthorized');
        } else {
          console.log(decoded)
          cb(null, generatePolicy(decoded.data.username, 'Allow', '*'));
        }
      });
    }
    else {
        console.log('No authorizationToken found in the header.');
        cb('Unauthorized');
      }
    return;
};

module.exports = {
    authorize
};
