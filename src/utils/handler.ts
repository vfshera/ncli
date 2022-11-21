export const run: Runner = (fn, condition) => {
  if (condition) {
    fn();
  }
};
