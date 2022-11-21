import { Runner } from "../types";

export const run: Runner = (fn, condition) => {
  if (condition) {
    fn();
  }
};
