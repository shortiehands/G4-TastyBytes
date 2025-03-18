export const paths = {
  home: "home",
  login: "login",
  notFound: "not-found",
  generateRecipeAI: "generate-recipe-AI",
  signUp: "sign-up",
  resetPassword: "reset-password",
};

export const allowSearchParamsPaths: string[] = [
  // Only allow url search params for these paths
  paths.home,
];
