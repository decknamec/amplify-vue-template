import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { myFirstFunction } from "./my-first-function/ressource";
//import { myPythonFunction } from "./myPythonFunction/ressource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  myFirstFunction,
  //myPythonFunction,
});

const { groups } = backend.auth.resources;

// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.IRole.html
groups["ADMINS"].role;
