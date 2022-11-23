export const run: Runner = (fn, condition, args) => {
  if (!condition) return;
  if (args) {
    fn(args);
    return;
  }
  fn();
};
