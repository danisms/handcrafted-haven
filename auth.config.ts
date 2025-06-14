// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // Required for CredentialsProvider
    maxAge: 30 * 24 * 60 * 60, // Session expires in 30 days
  },
  jwt: {
    // Optional: Override default JWT encoding/decoding (if needed)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      if (isOnProfile) return isLoggedIn; // Redirect if not logged in
      return true;
    },
    // Add JWT and session callbacks (recommended)
    async jwt({ token, user }) {
      if (user) token.id = user.id; // Attach user ID to JWT
      return token;
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub; // Attach user ID to session
      return session;
    },
  },
  providers: [], // Providers are now in auth.ts
} satisfies NextAuthConfig;