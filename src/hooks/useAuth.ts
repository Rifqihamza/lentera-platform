import { useSession } from "next-auth/react";

export function useAuth() {
    const { data: session, status, update } = useSession()

    return {
        session,
        user: session?.user,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
        updateSession: update
    }

}