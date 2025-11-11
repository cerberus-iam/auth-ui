import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../context/AuthContext";

// Mock the AuthContext
vi.mock("../context/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    checkAuth: vi.fn(),
  }),
}));

// Mock the oauth lib
vi.mock("../lib/oauth", () => ({
  resolveAuthorizationRedirect: vi.fn(() => "http://redirect.example.com"),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should render login form", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: /login to your account/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should render Cerberus IAM branding", () => {
    renderLogin();
    const brandingElements = screen.getAllByText(/cerberus iam/i);
    expect(brandingElements.length).toBeGreaterThan(0);
    expect(brandingElements[0]).toBeInTheDocument();
  });

  it("should update email input on change", () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should update password input on change", () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("should have email input with correct attributes", () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email/i);

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("autocomplete", "email");
    expect(emailInput).toHaveAttribute("placeholder", "m@example.com");
  });

  it("should have password input with correct attributes", () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
  });

  it("should store OAuth redirect_uri in localStorage", async () => {
    // Simulate URL with OAuth parameters
    window.history.pushState(
      {},
      "",
      "?redirect_uri=http://example.com/callback"
    );

    renderLogin();

    await waitFor(() => {
      expect(localStorage.getItem("oauth_redirect")).toBe(
        "http://example.com/callback"
      );
    });
  });
});
