# Amplify dev notes

Extra notes for managing this mono-repo projects deployed on AWS using AWS Amplify

## Basics

- There are two ways to manage Amplify apps:
  - Amplify Console
  - Amplify CLI
- Some actions can be done only by Amplify console, some by CLI, and some by both.


### Amplify Console

- [Console url](https://ap-northeast-1.console.aws.amazon.com/amplify/home?region=ap-northeast-1#/)
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

## Our Amplify usage

- We have a mono-repo with three apps under `/packages/` root

  - helloero
  - account
  - help

<img width="1754" alt="image" src="https://user-images.githubusercontent.com/24664222/156097684-60d6055d-ca46-49a5-970c-e68c44fc6d5f.png">

- Each app has two front-end and two corresponding backend environments: `main` and `develop`, corresponding to `prod` and `IT` deployments. More info in CI/CD below.

- Front-end console preview
<img width="1502" alt="image" src="https://user-images.githubusercontent.com/24664222/156097761-3f42a6a2-54b5-4b61-b13f-0cae2a50b6ce.png">
- Back-end environments console preview
<img width="1493" alt="image" src="https://user-images.githubusercontent.com/24664222/156097804-659d6122-bb0a-4647-826b-2e1b706e07c9.png">
<img width="1473" alt="image" src="https://user-images.githubusercontent.com/24664222/156097908-f03f9dfa-bc74-48db-8253-3ad83ffd7fa1.png">


### CI/CD

We are following their recommended CI/CD flow, guide can be found [here](https://docs.amplify.aws/cli/reference/files/#amplify-metajson)

### Lambda function

We are using two lamda functions for `helloero` app

- lambda resolver for graphQL Api
- cognito trigger lambda function to add a custom attribute `userid` to newly created user

### Auth

- Provisioned in `helloero` project and imported through `Amplify Studio` in `account` and `help` projects

### Caution ⚠️ 
Cuz `account` and `help` projects have "imported auth" we need to provide some environmental-variables to automatic CI/CD builds to work probably.
- Env-variable are: `AMPLIFY_IDENTITYPOOL_ID, AMPLIFY_USERPOOL_ID, AMPLIFY_NATIVECLIENT_ID, AMPLIFY_WEBCLIENT_ID`
  <img width="1256" alt="image" src="https://user-images.githubusercontent.com/24664222/162371225-93268964-18fb-4b5b-812d-c2e00c708c9a.png">


### GraphQL

- We are using GrapqhQL v2 api, also called AWS Appsync, [reference](https://docs.amplify.aws/cli/graphql/overview/)
- Schema can be found in amplify folder in `/packages/helloero`
- We are using Elastic search enabled by a directive `@searchable` in graphql schema

### Domain management
Is done by amplify setting for corresponding projects

---

## Caution ⚠️ 

- Be careful with `amplify push` until we setup proper service-accounts with particular IAM permissions that we do not end-up deleting resources for some backends
- If you need to modify backend for testing, one way is to clone `develop` backend env and use the cloned-env for testing. Like:
<img width="1482" alt="image" src="https://user-images.githubusercontent.com/24664222/156098064-e35e054a-e3fb-48cd-a1eb-91bcabb73bdd.png">

