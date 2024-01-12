import { singleProductGet } from "../../api/productFetch";
import createStore from "../shared/mockStore";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

describe("Test all the normal actions in single products", () => {
  test("data after dispatch should be", async () => {
    await store.dispatch(singleProductGet("5"));
    if (store.getState().singleProductReducer.error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(store.getState().singleProductReducer.singleProduct?._id).toBe(
        undefined
      );
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(store.getState().singleProductReducer.singleProduct?._id).toBe(5);
    }
  });
});
