import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Prisma } from "@prisma/client"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(Prisma),

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    // Important: Explicitly set session strategy when using database adapter
    session: {
        strategy: "database", // or "jwt" — see notes below
    },

    callbacks: {
        session({ session, user }) {
            if (session.user && user?.id) {
                session.user.id = user.id
            }
            return session
        },
    },
})