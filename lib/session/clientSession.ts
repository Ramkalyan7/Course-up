'use client'

import { useSession } from 'next-auth/react'

export function useCurrentSession() {
    const { data: session, status } = useSession()
    return { session, status }
}

export function useCurrentUser() {
    const { data: session } = useSession()
    return session?.user
}

export function useIsAuthenticated() {
    const { data: session, status } = useSession()
    return {
        isAuthenticated: !!session,
        isLoading: status === 'loading'
    }
}
