import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "../components/AdminRoute";
import { vi } from "vitest";

describe("AdminRoute", () => {
  beforeEach(() => {
    // reset localStorage between tests
    localStorage.clear();
  });

  it("renders children when user in localStorage is admin", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin", name: "Test Admin" })
    );

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Protected Admin Content</div>
              </AdminRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Protected Admin Content/i)
    ).toBeInTheDocument();
    // Ensure we did NOT get redirected
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });

  it("redirects to /login when no user in localStorage", () => {
    // no user set

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Protected Admin Content</div>
              </AdminRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.queryByText(/Protected Admin Content/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  it("redirects to /login when user is not admin", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "user", name: "Regular User" })
    );

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Protected Admin Content</div>
              </AdminRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.queryByText(/Protected Admin Content/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
