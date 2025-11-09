import prisma from "../api/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from 'next-auth'



export const AuthConfig : NextAuthOptions= {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "email", type: "email", placeholder: "example@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || !user.password) {
                    throw new Error('Invalid email or password')
                }

                const isValid = await bcrypt.compare(credentials.password, user.password)

                if (!isValid) {
                    throw new Error('Invalid email or password')
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },

}