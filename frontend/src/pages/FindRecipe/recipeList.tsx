import React from "react";

export interface recipeItem {
    image: string | undefined;
    id: number;
    title: string;
    type: string;
    ingredients: string;
    steps: string;
}