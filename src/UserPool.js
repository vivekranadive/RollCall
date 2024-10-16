import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_IKeeqtB0l',
    ClientId: '46523n61f4g9f3khip8s7ovl3u'
});

export default UserPool;