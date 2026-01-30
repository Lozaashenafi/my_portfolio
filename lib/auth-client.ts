import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Better Auth will look for NEXT_PUBLIC_APP_URL in your .env
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});

// We export these for easy use in our pages
export const { signIn, signUp, signOut, useSession } = authClient;
