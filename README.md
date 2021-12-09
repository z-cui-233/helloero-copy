# HELLOERO（ハローエロ）

## Prepare config file for local development

`/src/aws-exports.js`

```
const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:839e24ad-2969-4320-b01a-55049f3972b0",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_Fa8RYnzZ1",
    "aws_user_pools_web_client_id": "1cfqtbluolk14ijbsq2osqbspp",
    "oauth": {},
    "aws_cognito_login_mechanisms": [
        "EMAIL"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    }
};

export default awsmobile;
```

## Docker Local Development Start

### Start

```
npm install
docker compose down
docker compose up --build
```

### Add hosts

```
127.0.0.1  helloero.local.h2u.jp
```

#### Clear DNS cache

if you can not access local url, you should clear your dns cache.

```
sudo dscacheutil -flushcache
```

## Setting amplify backend

for only front-end development, please use `dev` backend by setting amplify backend env as follows:
`amplify env checkout dev`

if updating backend, can use a separate feature-backend env or can directly use dev if not modifying existing backend resources

## How can we get new wabiken

you can get wabiken for IT-env by this command.

```
curl -X POST -H "Content-Type: application/json" \
    -d '{
    "market": "unext",
    "content": {
        "key": {
            "id": "AID0198621",
            "type": "vod",
            "provider_id": "amazonppv"
        }
    },
    "not_valid_before": 1531284488,
    "not_valid_after": 1831384488,
    "validity_period": 86400,
    "lock_required": true,
    "playback_remain": 1000
}' \
  https://wabit-api.awsdev.unext.dev/v2/wabiken
```
