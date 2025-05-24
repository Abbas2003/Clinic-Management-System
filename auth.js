import connectDB from "./src/lib/connectDB"
import { UserModel } from "./src/lib/Models/UserModel";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


async function handleLogin(obj) {
  await connectDB();
  const user = await UserModel.findOne({ email: obj.email });
  if (user) {
    return user;
  } else {
    let newUser = await UserModel(obj);
    newUser = newUser.save();
    return newUser;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        let obj = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          imgUrl: profile.picture,
        }

        const user = await handleLogin(obj);
        return user;
      }
    },
    async jwt({ token }) {
      const user = await handleLogin({ email: token.email });
      token.role = user.role;
      token._id = user._id;
      return token
    },
    session({ session, token }) {
      session.user._id = token._id
      session.user.role = token.role
      return session
    },
  }
})