import { userLogin, userProfile, userUpdateProfile } from "../../api/userLogin";
import createStore from "../shared/mockStore";
import server from "../shared/userServer";
import { dummyUser } from "../data/mockUser";
import { UpdateUserType } from "../../types/AuthType";
import { registerUser } from "../../api/userRegister";
import { logOut } from "../../redux/reducers/credentialReducer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("test userReducers async function", () => {
  test("should login the user with right credential", async () => {
    const action = await store.dispatch(
      userLogin({ email: "john@mail.com", password: "changeme" })
    );
    const data = action.payload;
    expect(data).toMatchObject(dummyUser[0]);
  });
  test("access token is correct or not", async () => {
    const access_token = "my-access-token_1";
    const action = await store.dispatch(userProfile(access_token));
    const data = action.payload;
    expect(data).toMatchObject(dummyUser[0]);
  });
  test("should update the user", async () => {
    const user: any = {
      _id: 1,
      firstName: "suraj",
      lastName: "sharma",
      phoneNumber: 9834344,
      role: "admin",
      avatar: "https://i.imgur.com/5mPmJYO.jpeg",
    };
    const action = await store.dispatch(userUpdateProfile(user));
    expect(action.payload).toMatchObject({
      _id: 1,
      email: "john@mail.com",
      password: "changeme",
      name: "Jhon",
      role: "admin",
      avatar: "https://i.imgur.com/5mPmJYO.jpeg",
      firstName: "suraj",
      lastName: "sharma",
      phoneNumber: 9834344,
    });
  });
  test("should create a new user", async () => {
    const input: any = {
      name: "Nicolas",
      email: "nico@gmail.com",
      password: "1234",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    const action = await store.dispatch(registerUser(input));

    // expect(action.payload).toMatchObject(dummyUser[dummyUser.length - 1]);
  });
  test("should log the user out and reset the state", () => {
    store.dispatch(logOut());

    expect(store.getState().credentialReducer.user).toBeUndefined();
    expect(store.getState().credentialReducer.token).toEqual({
      accessToken: "",
      refreshToken: "",
    });
  });
});
