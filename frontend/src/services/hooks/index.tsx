import React from "react";
import { recipeItem } from "../../pages/FindRecipe/recipeList";

const service = {
  getData: (props: { from: number; to: number; items: recipeItem[] }) => {
    return new Promise((resolve, reject) => {
      const data = props.items.slice(props.from, props.to);
      resolve({
        count: props.items.length,
        data: data,
      });
    });
  },
};

export { service };
