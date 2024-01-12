import { setupServer } from "msw/node";
import { rest } from "msw";
import { dummyUser } from "../data/mockUser";
import { UserType } from "../../types/AuthType";

export const access_token = "my-access-token";

export const handlers = [
  //login product
  rest.post(
    "https://fs16-backend.vercel.app/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = dummyUser.find(
        (u: { email: any; password: any }) =>
          u.email === email && u.password === password
      );
      if (foundUser) {
        return res(ctx.json(foundUser));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),
  rest.get(
    "https://fs16-backend.vercel.app/api/v1/auth/profile",

    async (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      const originalToken = token?.split("_")[0];
      const userId = token?.split("_")[1];
      const user = dummyUser.find(
        (u: { _id: number }) => u._id === Number(userId)
      );
      if (originalToken === access_token && user) {
        return res(ctx.json(user));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),
  //update user
  rest.put(
    "https://fs16-backend.vercel.app/api/v1/users/:id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const index = dummyUser.findIndex(
        (p: { _id: number }) => p._id === Number(id)
      );
      if (index > -1) {
        return await res(ctx.json({ ...dummyUser[index], ...update }));
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

  //register user
  rest.post(
    "https://fs16-backend.vercel.app/api/v1/users/",
    async (req, res, ctx) => {
      const input: UserType = await req.json();
      const newUser: UserType = {
        _id: dummyUser.length + 1,
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        email: input.email,
        password: input.password,
        avatar: input.avatar,
        role: "customer",
      };
      dummyUser.push(newUser);
      return res(ctx.json(newUser));
    }
  ),
];

const userServer = setupServer(...handlers);

export default userServer;
