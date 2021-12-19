import { Translations } from '@aws-amplify/ui-components';

export const vocabularies = {
  ja: {
    [Translations.BACK_TO_SIGN_IN]: '戻る', //  "Back to Sign In",
    // [Translations.CHANGE_PASSWORD_ACTION]: '変更', //  "Change",
    // [Translations.CHANGE_PASSWORD]: 'パスワードを変更', //  "Change Password",
    [Translations.CODE_LABEL]: '本人確認コード', //  "Verification code",
    [Translations.CODE_PLACEHOLDER]: '本人確認コードを入力', //  "Enter code",
    // [Translations.CONFIRM_SIGN_UP_CODE_LABEL]: '', //  "Confirmation Code",
    // [Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: '', //  "Enter your code",
    // [Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: '', //  "Confirm Sign up",
    // [Translations.CONFIRM_SIGN_UP_LOST_CODE]: '', //  "Lost your code?",
    // [Translations.CONFIRM_SIGN_UP_RESEND_CODE]: '', //  "Resend Code",
    // [Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: '', //  "Confirm",
    // [Translations.CONFIRM_SMS_CODE]: '', //  "Confirm SMS Code",
    // [Translations.CONFIRM_TOTP_CODE]: '', //  "Confirm TOTP Code",
    // [Translations.CONFIRM]: '', //  "Confirm",
    [Translations.CREATE_ACCOUNT_TEXT]: 'アカウントの登録', //  "Create account",
    [Translations.EMAIL_LABEL]: 'メールアドレス', //  "Email Address *",
    [Translations.EMAIL_PLACEHOLDER]: 'メールアドレスを入力', //  "Enter your email address",
    [Translations.FORGOT_PASSWORD_TEXT]: 'パスワードを忘れた方は', //  "Forgot your password?",
    // [Translations.LESS_THAN_TWO_MFA_VALUES_MESSAGE]: '', //  "Less than two MFA types available",
    [Translations.NEW_PASSWORD_LABEL]: '新しいパスワード', //  "New password",
    [Translations.NEW_PASSWORD_PLACEHOLDER]: '8桁以上の英数字', //  "Enter your new password",
    [Translations.NO_ACCOUNT_TEXT]: ' ', //  "No account?",
    // [Translations.USERNAME_REMOVE_WHITESPACE]: '', //  "Username cannot contain whitespace",
    // [Translations.PASSWORD_REMOVE_WHITESPACE]: '', //  "Password cannot start or end with whitespace",
    [Translations.PASSWORD_LABEL]: 'パスワード', //  "Password *",
    [Translations.PASSWORD_PLACEHOLDER]: '8桁以上の英数字', //  "Enter your password",
    // [Translations.PHONE_LABEL]: '', //  "Phone Number *",
    // [Translations.PHONE_PLACEHOLDER]: '', //  "(555) 555-1212",
    // [Translations.QR_CODE_ALT]: '', //  "qrcode",
    [Translations.RESET_PASSWORD_TEXT]: 'こちら', //  "Reset password",
    [Translations.RESET_YOUR_PASSWORD]: 'パスワード再設定メールの送信', //  "Reset your password",
    // [Translations.SELECT_MFA_TYPE_HEADER_TEXT]: '', //  "Select MFA Type",
    // [Translations.SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT]: '', //  "Verify",
    [Translations.SEND_CODE]: '送信', //  "Send Code",
    [Translations.SUBMIT]: '送信', //  "Submit",
    // [Translations.SETUP_TOTP_REQUIRED]: '', //  "TOTP needs to be configured",
    [Translations.SIGN_IN_ACTION]: 'ログイン', //  "Sign In",
    [Translations.SIGN_IN_HEADER_TEXT]: 'ログイン', //  "Sign in to your account",
    [Translations.SIGN_IN_TEXT]: 'ログイン', //  "Sign in",
    // [Translations.SIGN_IN_WITH_AMAZON]: '', //  "Sign in with Amazon",
    // [Translations.SIGN_IN_WITH_AUTH0]: '', //  "Sign in with Auth0",
    // [Translations.SIGN_IN_WITH_AWS]: '', //  "Sign in with AWS",
    // [Translations.SIGN_IN_WITH_FACEBOOK]: '', //  "Sign in with Facebook",
    // [Translations.SIGN_IN_WITH_GOOGLE]: '', //  "Sign in with Google",
    [Translations.SIGN_OUT]: 'ログアウト', //  "Sign Out",
    [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: 'メールアドレス', //  "Email",
    [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: ' ', //  "Have an account?",
    [Translations.SIGN_UP_HEADER_TEXT]: 'アカウント登録', //  "Create a new account",
    // [Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: '', //  "Password",
    [Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: '登録', //  "Create Account",
    // [Translations.SIGN_UP_USERNAME_PLACEHOLDER]: '', //  "Username",
    // [Translations.SUCCESS_MFA_TYPE]: '', //  "Success! Your MFA Type is now:",
    // [Translations.TOTP_HEADER_TEXT]: '', //  "Scan then enter verification code",
    // [Translations.TOTP_LABEL]: '', //  "Enter Security Code:",
    // [Translations.TOTP_ISSUER]: '', //  "AWSCognito",
    // [Translations.TOTP_SETUP_FAILURE]: '', //  "TOTP Setup has failed",
    // [Translations.TOTP_SUBMIT_BUTTON_TEXT]: '', //  "Verify Security Token",
    // [Translations.TOTP_SUCCESS_MESSAGE]: '', //  "Setup TOTP successfully!",
    // [Translations.UNABLE_TO_SETUP_MFA_AT_THIS_TIME]: '', //  "Failed! Unable to configure MFA at this time",
    [Translations.USERNAME_LABEL]: 'ログインID（ユーザ名）', //  "Username *",
    [Translations.USERNAME_PLACEHOLDER]: 'ログインIDを入力', //  "Enter your username",
    // [Translations.VERIFY_CONTACT_EMAIL_LABEL]: '', //  "Email",
    // [Translations.VERIFY_CONTACT_HEADER_TEXT]: '', //  "Account recovery requires verified contact information",
    // [Translations.VERIFY_CONTACT_PHONE_LABEL]: '', //  "Phone Number",
    // [Translations.VERIFY_CONTACT_SUBMIT_LABEL]: '', //  "Submit",
    // [Translations.VERIFY_CONTACT_VERIFY_LABEL]: '', //  "Verify",
    // [Translations.ADDRESS_LABEL]: '', //  "Address",
    // [Translations.ADDRESS_PLACEHOLDER]: '', //  "Enter your address",
    // [Translations.NICKNAME_LABEL]: '', //  "Nickname",
    // [Translations.NICKNAME_PLACEHOLDER]: '', //  "Enter your nickname",
    // [Translations.BIRTHDATE_LABEL]: '', //  "Birthday",
    // [Translations.BIRTHDATE_PLACEHOLDER]: '', //  "Enter your birthday",
    // [Translations.PICTURE_LABEL]: '', //  "Picture URL",
    // [Translations.PICTURE_PLACEHOLDER]: '', //  "Enter your picture URL",
    // [Translations.FAMILY_NAME_LABEL]: '', //  "Family Name",
    // [Translations.FAMILY_NAME_PLACEHOLDER]: '', //  "Enter your family name",
    // [Translations.PREFERRED_USERNAME_LABEL]: '', //  "Preferred Username",
    // [Translations.PREFERRED_USERNAME_PLACEHOLDER]: '', //  "Enter your preferred username",
    // [Translations.GENDER_LABEL]: '', //  "Gender",
    // [Translations.GENDER_PLACEHOLDER]: '', //  "Enter your gender",
    // [Translations.PROFILE_LABEL]: '', //  "Profile URL",
    // [Translations.PROFILE_PLACEHOLDER]: '', //  "Enter your profile URL",
    // [Translations.GIVEN_NAME_LABEL]: '', //  "First Name",
    // [Translations.GIVEN_NAME_PLACEHOLDER]: '', //  "Enter your first name",
    // [Translations.ZONEINFO_LABEL]: '', //  "Time zone",
    // [Translations.ZONEINFO_PLACEHOLDER]: '', //  "Enter your time zone",
    // [Translations.LOCALE_LABEL]: '', //  "Locale",
    // [Translations.LOCALE_PLACEHOLDER]: '', //  "Enter your locale",
    // [Translations.UPDATED_AT_LABEL]: '', //  "Updated At",
    // [Translations.UPDATED_AT_PLACEHOLDER]: '', //  "Enter the time the information was last updated",
    // [Translations.MIDDLE_NAME_LABEL]: '', //  "Middle Name",
    // [Translations.MIDDLE_NAME_PLACEHOLDER]: '', //  "Enter your middle name",
    // [Translations.WEBSITE_LABEL]: '', //  "Website",
    // [Translations.WEBSITE_PLACEHOLDER]: '', //  "Enter your website",
    // [Translations.NAME_LABEL]: '', //  "Full Name",
    // [Translations.NAME_PLACEHOLDER]: '', //  "Enter your full name",
    // [Translations.PHOTO_PICKER_TITLE]: '', //  "Picker Title",
    // [Translations.PHOTO_PICKER_HINT]: '', //  "Ancillary text or content may occupy this space here",
    // [Translations.PHOTO_PICKER_PLACEHOLDER_HINT]: '', //  "Placeholder hint",
    // [Translations.PHOTO_PICKER_BUTTON_TEXT]: '', //  "Button",
    // [Translations.IMAGE_PICKER_TITLE]: '', //  "Add Profile Photo",
    // [Translations.IMAGE_PICKER_HINT]: '', //  "Preview the image before upload",
    // [Translations.IMAGE_PICKER_PLACEHOLDER_HINT]: '', //  "Tap to image select",
    // [Translations.IMAGE_PICKER_BUTTON_TEXT]: '', //  "Upload",
    // [Translations.PICKER_TEXT]: '', //  "Pick a file",
    // [Translations.TEXT_FALLBACK_CONTENT]: '', //  "Fallback Content",
    // [Translations.CONFIRM_SIGN_UP_FAILED]: '', //  "Confirm Sign Up Failed",
    // [Translations.SIGN_UP_FAILED]: '', //  "Sign Up Failed"

    // Cognito Server Side Error Messages
    // ref.) https://github.com/aws-amplify/amplify-js/issues/867
    'User does not exist.': 'ログインID、パスワードが正しいかご確認下さい。',
    'Incorrect username or password.':
      'ログインID、パスワードが正しいかご確認下さい。',
    'User is not confirmed.': 'ユーザーは検証されていません',
    'User already exists': 'ユーザーは既に存在します',
    'Invalid verification code provided, please try again.':
      '指定された確認コードが無効です。もう一度お試しください',
    'Invalid password format': 'パスワードのフォーマットが不正です',
    'Account recovery requires verified contact information':
      'アカウントの復元には確認済みの連絡先情報が必要です',
    'Invalid phone number format':
      '不正な電話番号フォーマットです。 電話番号は次のフォーマットで入力してください: +12345678900',
    'An account with the given email already exists.':
      'そのメールアドレスは既に存在します',
    'Username cannot be empty': 'ユーザー名は必須です',
    'Password attempts exceeded': 'パスワード試行回数が超過しました',
    'Attempt limit exceeded, please try after some time.':
      '試行制限を超過しました。しばらくしてからもう一度お試しください',
    'Username/client id combination not found.': 'ユーザーが存在しません',
    'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です', // 本来の意味とは異なるが、パスワード未入力時に発生するのでこの訳としている
    'Password did not conform with policy: Password not long enough':
      'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
    'Password did not conform with policy: Password must have uppercase characters':
      'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
    'Password did not conform with policy: Password must have lowercase characters':
      'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
    'Password did not conform with policy: Password must have numeric characters':
      'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
    "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
      'パスワードは8文字以上、大文字小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
    "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[S]+.*[S]+$":
      'パスワードは8文字以上、大文字小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
  },
};