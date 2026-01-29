import { auth } from "../../../../lib/auth"; // This refers to your lib/auth.ts file
import { toNextJsHandler } from "better-auth/next-js";

// This is the engine that handles all Better-Auth requests
export const { GET, POST } = toNextJsHandler(auth);
