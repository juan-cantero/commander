export type RegexQuery = {
  [x: string]: { $regex: string; $options: string };
};
