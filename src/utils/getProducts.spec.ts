import { getProducts } from "./getProducts";

const originalFetch = global.fetch;

describe("Get Products Utility", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: "Test Product",
              price: 10.99,
              description: "This is a test product",
              category: "test-category",
              image: "https://example.com/image.jpg",
              rating: { rate: 4.5, count: 10 },
            },
          ]),
      })
    ) as jest.Mock;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("should fetch products from the API", async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("should handle fetch errors gracefully", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );
    const products = await getProducts();
    expect(products).toEqual([]);
  });
});
