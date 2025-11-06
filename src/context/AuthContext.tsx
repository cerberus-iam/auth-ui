import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "../lib/api";
import { resolveAuthorizationRedirect } from "../lib/oauth";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/v1/me/profile");
      setUser({
        id: data.id,
        email: data.email,
        name:
          data.name ||
          [data.firstName, data.lastName].filter(Boolean).join(" ") ||
          data.email,
      });
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await api.post("/v1/auth/login", { email, password });

      if (!data?.user) {
        throw new Error(data?.message || "Login failed");
      }

      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name || data.user.email,
      });

      // Get the stored OAuth redirect from localStorage
      const oauthRedirect = localStorage.getItem("oauth_redirect");

      if (oauthRedirect) {
        localStorage.removeItem("oauth_redirect");
        window.location.href = resolveAuthorizationRedirect(oauthRedirect);
        return;
      }

      // If no OAuth redirect is present, refresh auth state
      await checkAuth();
    },
    [checkAuth]
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
