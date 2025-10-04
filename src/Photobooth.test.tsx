import { render, screen } from "@testing-library/react";
import Photobooth from "./Photobooth";

test("renders learn react link", () => {
  render(<Photobooth />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
