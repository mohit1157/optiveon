import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("accepts text input", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test value" } });
    expect(input).toHaveValue("test value");
  });

  it("applies error styles when error prop is true", () => {
    render(<Input error placeholder="Error input" />);
    const input = screen.getByPlaceholderText("Error input");
    expect(input).toHaveClass("border-error");
  });

  it("handles disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("supports different input types", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
