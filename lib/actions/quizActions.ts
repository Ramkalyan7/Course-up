"use server"

import prisma from "../api/prisma";

export async function getQuizUsingId(quizId:string){

    const quiz = await prisma.quiz.findUnique({
        where:{
            id:quizId
        },
        include:{
            questions:true
        }
    })

    return quiz;
}