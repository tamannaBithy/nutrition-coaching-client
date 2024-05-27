import { login, socialLogin } from "@/app/lib/Api-request/Login/Login";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          if (user?.status === false) {
            throw new Error(user.message);
          }

          return user;
        } catch (error) {
          console.log("login error", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile, user }) {
      if (profile?.name) {
        const newUser = await socialLogin(profile.email);

        user.role = newUser.role;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.accessToken = user.auth;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.accessToken = token.accessToken;
        session.user._id = token._id;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url) {
        return url; // Redirect to the intended page
      } else {
        return baseUrl; // Redirect to the homepage if no intended page
      }
    },
  },
});

export { handler as GET, handler as POST };
