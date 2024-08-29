import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { decrypt } from "../lib/session";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

jest.mock("../lib/session", () => ({
  decrypt: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
      ]),
  })
) as jest.Mock;

describe("Authentication Tests", () => {
  beforeEach(() => {
    (decrypt as jest.Mock).mockReset();
  });

  test("redirects unauthenticated users to login page", async () => {
    (decrypt as jest.Mock).mockResolvedValue(null);

    const req = {
      nextUrl: {
        pathname: "/dashboard",
      },
      cookies: {
        get: jest.fn(() => null),
      },
    } as unknown as NextRequest;

    const res = await middleware(req);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/login");
  });

  test("redirects authenticated users to dashboard from login page", async () => {
    (decrypt as jest.Mock).mockResolvedValue({ user: "testuser" });

    const req = {
      nextUrl: {
        pathname: "/login",
      },
      cookies: {
        get: jest.fn(() => "test-session-token"),
      },
    } as unknown as NextRequest;

    const res = await middleware(req);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/dashboard");
  });
});

describe("Dashboard", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders dashboard component correctly", async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });

  test("displays users correctly when data is fetched", async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });

  test("shows error message when API call fails", async () => {
    // Mock fetch to simulate an error response
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error("Internal Server Error")),
      })
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText("Oops! Something went wrong.")
      ).toBeInTheDocument();
    });
  });
});
