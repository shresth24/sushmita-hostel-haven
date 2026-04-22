import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("renders the main landing page sections", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /sushmita girls hostel/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /more than a hostel/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /two locations/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /hear from you/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book a visit/i })[0]).toHaveAttribute("href", "#contact");
  });
});
