export const paths = {
  home: "home",
  login: "login",
  signUp: "sign-up",
  resetPassword: "reset-password",
  forgotPassword: "forgot-password",
  notFound: "not-found",
  generateRecipeAI: "generate-recipe-AI",
  findRecipe: "find-recipe",
  manageRecipe: "manage-recipe",
  profile: "profile",
  recipeDetails: "recipe-details",
};

export const allowSearchParamsPaths: string[] = [
  // Only allow url search params for these paths
  paths.home,
];
