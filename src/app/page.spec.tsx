import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";

jest.mock("../utils/getProducts", () => ({
  getProducts: jest.fn(
    () =>
      Promise.resolve([
        {
          id: 1,
          title: "Product 1",
          image: "/test-image",
          rating: { rate: 4, count: 4 },
        },
        {
          id: 2,
          title: "Product 2",
          image: "/test-image",
          rating: { rate: 4, count: 4 },
        },
      ]) as any
  ),
}));

describe("Home component", () => {
  it("fetches and displays products", async () => {
    const page = await Home();
    const { asFragment } = render(page);

    expect(asFragment()).toMatchSnapshot();

    const product1Element = screen.getByText("Product 1 - 4/5 (4)");
    const product2Element = screen.getByText("Product 2 - 4/5 (4)");
    expect(product1Element).toBeInTheDocument();
    expect(product2Element).toBeInTheDocument();
  });
});
