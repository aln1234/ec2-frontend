import { setupServer } from "msw/node";
import { rest } from "msw";
import { dummyProducts } from "../data/mockProducts";
import { ProductCreateType } from "../../types/dashboard/Product";
import { Product } from "../../types/Product";
import { dummyCategories } from "../data/mockCategories";

export const handlers = [
  //delete products
  rest.delete(
    "https://fs16-backend.vercel.app/api/v1/products/:id",
    async (req, res, ctx) => {
      const { id } = req.params;

      if (dummyProducts.find((p: { id: number }) => p.id == Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
  //create product
  rest.post(
    "https://fs16-backend.vercel.app/api/v1/products",
    async (req, res, ctx) => {
      const input: ProductCreateType = await req.json();

      const category = dummyCategories.find((c) => c._id === input.categoryId);
      if (category) {
        const newProduct: any = {
          _id: dummyProducts.length + 1,
          images: input.images,
          name: input.name,
          description: input.description || "",
          category,
          price: input.price,
        };
        dummyProducts.push(newProduct);

        return res(ctx.json(newProduct));
      } else {
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
  rest.put(
    "https://fs16-backend.vercel.app/api/v1/products/:id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const index = dummyProducts.findIndex(
        (p: { id: number }) => p.id === Number(id)
      );
      if (index > -1) {
        return res(ctx.json({ ...dummyProducts[index], ...update }));
      } else {
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
];

const productServer = setupServer(...handlers);

export default productServer;
