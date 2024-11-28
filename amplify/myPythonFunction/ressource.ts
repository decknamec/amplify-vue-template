import { defineFunction } from "@aws-amplify/backend";

export const myPythonFunction = defineFunction({
  name: "my-first-function",
  entry: "./handler.py",
});
