"use server"

import prisma from "@/lib/api/prisma";
import bcrypt from "bcryptjs";

const RegisterUser = async (email: string, name: string, password: string) => {
    try {

        if (!email || !password || !name) {
            return {
                success: false,
                message: "Please Enter all the details !"
            }
        }

        if (password.length < 6) {
            return {
                success: false,
                message: "Password should have atleast a lenght of 6"
            }
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exits !"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 3);

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
            }
        })

        if (!user) {
            return {
                success: false,
                message: "Error while Singing In ! . Please try again !"
            }
        }
        return {
            success: true,
            message: "User is registered sucessfully"
        }
    } catch (error) {
        console.log("RegisterUser", error)
        return {
            success: false,
            message: "Unexpected Error while registering the User"
        }
    }
}

export default RegisterUser;