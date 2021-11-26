# Specs

## User-flow

- LOGIN -> entry-> on code inpu5
  - Step1: Call wabit api for code check
  - Step 2: Disply code activation page
- My library -> play play?wabiken=<token?

## GQL requirements

- Schema
  - WabikenMeta
  - ContentMeta
  - PlayInfo
  - UserWabikenMeta <DONE>
- Queries
  - getWabikenMeta <DONE>
  - getPlayInfo <DONE>
  - listUserWabikenMeta <DONE>
- Mutation
  - activateWabiken <DONE>
  - createUserWabikenMeta <DONE>
  - updateUserWabikenMeta <DONE>

### TODO

- [x] Complete remaining query/mutations
- [x] Add custom error-handling
- [ ] Make GQL/DyanmoDB code production-ready
- [ ] Confirm
  - [ ] required/null values in apis, cuz this might break GQL resovlers (one common meeting to sync-up with wabit-api team)
  - [ ] lock-value for activation of wabit-token should be cognitoIdentityId or something else?
- [x] Make a test release to main branch
  - [x] to setup/test AWS amplify `prod` env
  - [x] Cognito pool for main/prod
  - [x] (delete master branch to avoid confusion)
- [ ] Domain setting
- [ ] Keep learning about AWS Amplify, Cognito, AppSync GQL and update the code with best practices

## Notes on deployment so far

- On merging PR into master, I had to duplicate some of the steps I did for adding a new lambda resolver
  - Go to `Function` and had to add `WABIT_URL` env var manually from `Configuration` tab
  - Go to `Api`
    - Update response mapping to `Function`
    - Update role for lambda function data source

## Production ready

- DyanmoDB
  - AWS Backup
    - Setup automatic backup daily-monthly-yearly retention
    - Enabled point-in-time recovery

## References

- Wiki for WABIT API:
  <https://wiki.unext-info.jp/pages/viewpage.action?pageId=110732081>

- Slack link:
  <https://u-next.slack.com/archives/C01KWP2ULBX/p1636940846110200?thread_ts=1636940413.109600&cid=C01KWP2ULBX>

- Jamboard
  <https://jamboard.google.com/d/19fziSl-cLKguzeTon36kORA0odIXKDxcp2XKYrf2BNI/viewer?f=0>

---

# POC Notes

- AWS Amplify is a tool for building backed and provisioning resources on AWS using `amplify cli`
- Auto-syncing of schema with DynamoDB models, Auto-generation of Queries/Mutations for CRUD operations on DynamoDB models
- Amplify push/publish would be CI/CD tasks

## Impression so far

- Helpful tool if we need to use just DynamoDB and AWS AppSyncGQL API
- Customization might be limited
- Not sure about performance and costs
- Still weighing Pros-Cons but if we need to much customisation and external connections, a separate GQL server might be good. But if our use-case is simple and stay in AWS universe then AWSAppSyncGQL API might be productive
- Development is a bit slow as provisioning resources on clouds take few minutes and thus have to wait for testing.
  - Perhaps there is a way for local testing?
  - Can be expedited if we can use AWS Console's Lambda testing tool
- Have to figure out AWS CloudWatch log tool
- Developer can push all the change to env-scoep using `amplify push`, can introduce bugs this way.

## Questions

- [x] What data we want to store in GQL DB?~~
- [x] Let’s design a mock schema?
- [ ] Performance and Costs
- [x] Need more understanding of WABIT Server communication use-case scenario for better evaluation
- [x] Timeline
  - Nov. 29th

## Custom resolver and external data-source

Possible options:

- ~~HTTP data-source and Function resolver~~
- Lambda function resolvers
  - n+1 problems would be managed by them as correspoiding to the lambda-resolver a data-source is automatically generated
  - Need to update IAM policy for data-source to be able to access lambda. [IAM Policy ref](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-lambda-resolvers.html)
- ~~HTTP resolvers~~

## Useful links

- [Lambda resolvers](https://docs.amplify.aws/guides/api-graphql/lambda-resolvers/q/platform/js/#querying-the-graphql-api)
- [Next JS SSR deployment](https://docs.aws.amazon.com/ja_jp/amplify/latest/userguide/server-side-rendering-amplify.html#ssr-Amplify-support)
- [User pool v/s Identity pool](https://medium.com/swlh/amazon-cognito-what-is-the-difference-between-user-pool-and-identity-pool-ff0c71d79ca7)
- [GQL directives](https://docs.amplify.aws/cli/graphql-transformer/directives/)
