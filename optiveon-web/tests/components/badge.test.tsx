import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-gradient-accent");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("border");
    expect(badge).toHaveClass("bg-accent/10");
  });

  it("applies success variant", () => {
    render(<Badge variant="success" data-testid="badge">Success</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-success/10");
    expect(badge).toHaveClass("text-success");
  });

  it("applies error variant", () => {
    render(<Badge variant="error" data-testid="badge">Error</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-error/10");
    expect(badge).toHaveClass("text-error");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("custom-class");
  });
});
