export const paths = {
  home: "home",
  login: "login",
  signUp: "sign-up",
  resetPassword: "reset-password",
  notFound: "not-found",
  generateRecipeAI: "generate-recipe-AI",
  findRecipe: "find-recipe",
};

export const allowSearchParamsPaths: string[] = [
  // Only allow url search params for these paths
  paths.home,
];
