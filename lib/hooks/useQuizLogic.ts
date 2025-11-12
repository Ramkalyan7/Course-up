"use client";

import { useState, useEffect } from "react";
import { getQuizUsingId } from "@/lib/actions/quizActions";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export function useQuizLogic(quizId: string) {
    const [quiz, setQuiz] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(new Set());
    const [score, setScore] = useState({ correct: 0, wrong: 0, total: 10 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const fetchedQuiz = await getQuizUsingId(quizId);
                setQuiz(fetchedQuiz?.questions as Question[]);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        };
        fetchQuizzes();


    }, [quizId]);

    const handleAnswerSelect = (questionId: string, answerIndex: number) => {
        if (submittedQuestions.has(questionId)) return;
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };

    const handleSubmitAnswer = (questionId: string) => {
        if (submittedQuestions.has(questionId)) return;

        const question = quiz.find((q) => q.id === questionId);
        if (!question) return;

        const isCorrect = selectedAnswers[questionId] === question.correctIndex;
        setSubmittedQuestions((prev) => new Set(prev).add(questionId));
        setScore((prev) => ({
            ...prev,
            correct: prev.correct + (isCorrect ? 1 : 0),
            wrong: prev.wrong + (isCorrect ? 0 : 1),
        }));
    };

    const isQuestionSubmitted = (questionId: string) => submittedQuestions.has(questionId);

    const isAnswerCorrect = (questionId: string) => {
        const question = quiz.find((q) => q.id === questionId);
        return question && selectedAnswers[questionId] === question.correctIndex;
    };

    const allQuestionsSubmitted = submittedQuestions.size === quiz.length;

    return {
        quiz,
        selectedAnswers,
        score,
        handleAnswerSelect,
        handleSubmitAnswer,
        isQuestionSubmitted,
        isAnswerCorrect,
        allQuestionsSubmitted,
        loading
    };
}
