# Amplify dev notes

Extra notes for managing this mono-repo projects deployed on AWS using AWS Amplify

## Basics

- There are two ways to manage Amplify apps:
  - Amplify Console
  - Amplify CLI
- Some actions can be done only by Amplify dashboard, some by CLI, and some by both.

-

### Amplify Console

- [Url](https://ap-northeast-1.console.aws.amazon.com/amplify/home?region=ap-northeast-1#/)
- Can create apps, set-up CI/CD, view and manage AWS resources for each app
- Domain setting, CI/CD branch setting, Environmental variable addition etc. can also be done here

### Amplify CLI

- Provisioning or adding AWS resources by using AWS Amplify through their cli-tool, [Amplify CLI](https://docs.amplify.aws/cli/)
- Adding, modifying lambda function, auth, graphql api through this tool.
- This creates an `amplify` folder in project-root containing config files (aka meta-jsons) or other information for the provisioning backend.
- Some files should be committed and some shouldn't, details can be found [here](https://docs.amplify.aws/cli/reference/files/#amplify-metajson)

<br/>
  
> Extra: [Welcome guide](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)

---

<br/>

## Our Amplify usage

- We have a mono-repo with three apps under `/packages/` root

  - helloero
  - account
  - help

- Each app has two front-end and two corresponding backend environments: `main` and `develop`, corresponding to `prod` and `IT` deployments. More info in CI/CD below.

### CI/CD

We are following their recommended CI/CD flow, guide can be found [here](https://docs.amplify.aws/cli/reference/files/#amplify-metajson)

### Lambda function

We are using two lamda functions for `helloero` app

- lambda resolver for graphQL Api
- cognito trigger lambda function to add a custom attribute `userid` to newly created user

### Auth

- Provisioned in `helloero` project and imported through `Amplify Studio` in `account` and `help` projects

### GraphQL

- We are using GrapqhQL v2 api, also called AWS Appsync, [reference](https://docs.amplify.aws/cli/graphql/overview/)
- Schema can be found in amplify folder in `/packages/helloero`
- We are using Elastic search enabled by a directive `@searchable` in graphql schema

---

<br/>

## Caution

- Be careful with `amplify push` until we setup proper service-accounts with particular IAM permissions that we do not end-up deleting resources for some backends
- If you need to modify backend for testing, one way is to clone `develop` backend env and use the cloned-env for testing.
