import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev", // You can change this when you have a domain
        to: user.email,
        subject: "Verify your Portfolio Admin Account",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
                <h2 style="color: #333;">Welcome to your Portfolio, ${user.name}!</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    You're almost there. Click the button below to verify your email and activate your admin dashboard.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                        Verify Email Address
                    </a>
                </div>
                <p style="color: #999; font-size: 12px;">
                    If the button doesn't work, copy and paste this link into your browser: <br/>
                    <a href="${url}">${url}</a>
                </p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #bbb; font-size: 10px; text-align: center;">
                    &copy; ${new Date().getFullYear()} Your Portfolio Admin
                </p>
            </div>
            `,
      });
    },
  },
});
