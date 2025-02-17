export const paths = {
    home: "home",
    login: "login",
    notFound: "not-found",
    searchRecipe: "search-recipe",
}

export const allowSearchParamsPaths: string[] = [
    // Only allow url search params for these paths
    paths.home
];