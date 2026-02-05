import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies featured styles when featured prop is true", () => {
    render(
      <Card featured data-testid="featured-card">
        Featured
      </Card>
    );
    const card = screen.getByTestId("featured-card");
    expect(card).toHaveClass("border-accent");
  });

  it("renders full card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-class" data-testid="custom-card">
        Custom
      </Card>
    );
    const card = screen.getByTestId("custom-card");
    expect(card).toHaveClass("custom-class");
  });
});
