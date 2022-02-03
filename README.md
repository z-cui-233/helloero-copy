# h2u mono

helloero, account, help sites for h2u

## Preparation for local development

### STEP1: add config file

## 1.1 account

1. Go to `/packages/account`
2. Run `rm -rf amplify`
3. Run `amplify pull --appId d2n1qbnmkdgxvt --envName develop` (will be redirected to browser for login-credential input)
4. Set up

```
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: .next
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? No
```

5. Verify auto-generation of `/src/aws-export.js`

## 1.2 helloero

1. Go to `/packages/helloero`
2. Run `rm -rf amplify`
3. Run `amplify pull --appId d2lpn6hawe153k --envName develop` (will be redirected to browser for login-credential input)
4. Set up same as account.
5. Verify auto-generation of `/src/aws-export.js`

## 1.3 help

1. Go to `/packages/help`
2. Run `rm -rf amplify`
3. Run `amplify pull --appId d1lfbnhojp19y0 --envName develop` (will be redirected to browser for login-credential input)
4. Set up same as account.
5. Verify auto-generation of `/src/aws-export.js`

### STEP2: add ENV

add token into `.bash_profile` for reading private module as `NPM_PULL_TOKEN`

### STEP3: Add hosts

```
127.0.0.1 account.local.h2u.jp
127.0.0.1 helloero.local.h2u.jp
127.0.0.1 help.local.h2u.jp
```

#### Clear DNS cache

if you can not access local url, you should clear your dns cache.

```
sudo dscacheutil -flushcache
```

## Docker Local Development Start

### Start

```
npm install
docker compose down
docker compose up --build
```

## Setting amplify backend

For only front-end development, please use `dev` backend by setting amplify backend env as follows:
`amplify env checkout dev`

If need to updated backend, please use a separate env for dev/testing by following steps:

    1. Pull dev-env: `amplify env pull dev`
    2. Create a <new-env>: `amplify env add <new-env>`
    3. Push pulled dev-env settings to <new-env>: `amplify push`
    4. Start doing all your back-end changes to this env and use it for testing.

## How can we get new wabiken

you can get wabiken for IT-env by this command.

https://wiki.unext-info.jp/pages/viewpage.action?pageId=110732068

```
curl -X POST -H "Content-Type: application/json" \
    -d '{
    "market": "amazon",
    "content": {
        "key": {
            "id": "AID0207894",
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

debug codes

```
AID0207139
AID0207297
AID0207298
AID0207838
AID0207894
AID0207895
AID0207896
AID0207897
AID0207898
AID0208119
```
