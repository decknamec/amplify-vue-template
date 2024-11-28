import { defineFunction } from "@aws-amplify/backend";

export const myPythonFunction = defineFunction({
  name: "myPyhtonFunction",
  entry: "./handler.py",
});
