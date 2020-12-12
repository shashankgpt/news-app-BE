# News App Backend

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Configure Credential
Linux:
export AWS_ACCESS_KEY_ID=<KEY_ID>
export AWS_SECRET_ACCESS_KEY=<ACCESS_KEY>

windows(powershell):
setx AWS_ACCESS_KEY_ID <KEY_ID>
setx AWS_SECRET_ACCESS_KEY <ACCESS_KEY>

serverless config credentials --provider aws --key <KEY> --secret <secret>

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:


## FAQ

- Did you use any bootstrap template?
A.  Yes, I have used serverless framework examples

- Do we have linting ?
A.  Yes, Airbnb style guide. Moreover we can have husky And/or sonarqube

- Do we test setup ?
A.  No, It will add jest framework for testing

- why serverless ?
A.  Matches with the JD and currently working on same. It is cloud agonistic unlike AWS SAM

- should we keep test files along with code js files or we should create a separate directory structure?
A.  As per me, unit test should present along with the code file

- Will you keep database schema and api function in same yml file
A.  A Big NO, because database will deployed once. So I will keep infrastrcture like dynamodb and DAX in their separate files.

- should we keep test files along with code js files or we should create a separate directory structure?
A.  As per me, unit test should present along with the code file and also I will add a folder called __test__ to add postman files and environment for other users and help in creating  cypress test cases.

- What you will do for api testing?
A.  I will use cypress

Known Issue:

Lint script is not working as expected
