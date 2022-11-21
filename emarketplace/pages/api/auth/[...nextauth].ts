import NextAuth, { Session } from 'next-auth';
import bycryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from 'entities/user/model/User';
import { db } from 'shared/config';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any): Promise<any> {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }: any): Promise<Session> {
      if (token?._id) session._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session as Session;
    },
  },
  providers: [
    CredentialsProvider({
      /* eslint-disable */
      // @ts-ignore
      async authorize(credentials) {
        await db.connect();
        const user = await (User as any).findOne({ email: credentials.email });
        await db.disconnect();
        if (user && bycryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
