/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { randomBytes, randomUUID } from 'crypto';
import { configEnv } from './configEnv';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: configEnv.auth_client_id || '',
      clientSecret: configEnv.auth_client_screet || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      idToken: true
    }),

    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Credentials not provided');
          return null;
        }
        if (
          credentials.email === 'test@gmail.com' &&
          credentials.password === '12345'
        ) {
          return {
            id: '1',
            email: 'test@gmail.com',
            username: 'Test User',
            randomToken: randomUUID(),
          };
        }
        throw new Error('Email atau password salah');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    generateSessionToken: () => {
      return randomUUID() ?? randomBytes(32).toString('hex');
    },
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        if (account?.provider === 'google') {
          token.randomToken = randomUUID();
        }else {
          token.randomToken = user.randomToken;
        }
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.randomToken = token.randomToken;
      session.user.username = token.username;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      if (url.startsWith('/')) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  },
};
