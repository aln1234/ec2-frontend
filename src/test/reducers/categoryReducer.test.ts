import { categoriesGet } from "../../api/productFetch";
import { setCategoryId } from "../../redux/reducers/categoryReducer";
import createStore from "../shared/mockStore";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

describe("Test the category reducer", () => {
  test("should get the category id", () => {
    const categoryId = "123";
    store.dispatch(setCategoryId(categoryId));
    expect(store.getState().categoryReducer.categoryId).toEqual(categoryId);
  });
  test("should handle categoriesGet.fullfilled", async () => {
    await store.dispatch(categoriesGet());
    expect(store.getState().categoryReducer.categories.length).toBeGreaterThan(
      0
    );
  });
});
