// import { Amplify } from "aws-amplify";
import React from "react";

// // Ensure environment variables are set
// if (
//   !process.env.REACT_APP_COGNITO_REGION ||
//   !process.env.REACT_APP_COGNITO_USER_POOL_ID ||
//   !process.env.REACT_APP_COGNITO_CLIENT_ID
// ) {
//   console.error("Cognito environment variables are missing!");
// }

// const awsConfig: Record<string, any> = {
//   Auth: {
//     region: process.env.REACT_APP_COGNITO_REGION || "",
//     userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || "",
//     userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "",
//     authenticationFlowType: "USER_PASSWORD_AUTH",
//   }, 
//   oauth: {
//     domain: process.env.REACT_APP_COGNITO_DOMAIN || "", // Cognito Hosted UI Domain
//     scope: ["email", "openid", "profile"],
//     redirectSignIn: "http://localhost:3000/home",
//     redirectSignOut: "http://localhost:3000/home",
//     responseType: "code", // or "token" if using implicit grant
//   },
// };

// // Configure Amplify
// Amplify.configure(awsConfig);

// export default awsConfig;
