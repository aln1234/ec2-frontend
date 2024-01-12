import {
  categoriesFilter,
  createProduct,
  deleteProduct,
  fetchAllProductAsync,
  updateProduct,
} from "../../api/productFetch";
import productsReducer, {
  setLimit,
  setOffset,
  setPriceRange,
  setSearchText,
  initialState,
  sortByPrice,
} from "../../redux/reducers/productsReducer";
import { ProductReducerType } from "../../types/Product";
import { dummyProducts } from "../data/mockProducts";
import createStore from "../shared/mockStore";
import server from "../shared/productServer";
import { initialProductState } from "../data/mockProducts";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test normal actions in productsReducer", () => {
  test("initial product state should be", () => {
    expect(store.getState().productsReducer.products.length).toBe(0);
    expect(store.getState().productsReducer.offset).toBe(1);
    expect(store.getState().productsReducer.limit).toBe(10);
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.priceRange).toStrictEqual([
      0, 10000,
    ]);
    expect(store.getState().productsReducer.searchText).toBe("");
    expect(store.getState().productsReducer.pageNumber).toBe(1);
  });

  test("get offset should return a  offset number", () => {
    store.dispatch(setOffset(2));
    expect(store.getState().productsReducer.offset).toBe(2);
    store.dispatch(setOffset(3));
    expect(store.getState().productsReducer.offset).toBe(3);
  });

  test("get limit shoild return a offset number", () => {
    store.dispatch(setLimit(2));
    expect(store.getState().productsReducer.limit).toBe(2);
    store.dispatch(setLimit(3));
    expect(store.getState().productsReducer.limit).toBe(3);
  });

  test("get price range should be a price range array", () => {
    store.dispatch(setPriceRange([20, 700]));
    expect(store.getState().productsReducer.priceRange).toEqual([20, 700]);
  });
  test("should set the search text", () => {
    store.dispatch(setSearchText("search term"));
    expect(store.getState().productsReducer.searchText).toBe("search term");
  });

  test("should sort products by price in ascending order", () => {
    const state: ProductReducerType = {
      ...initialProductState,
      products: dummyProducts,
      loading: false,
    };
    const products = productsReducer(state, sortByPrice("desc")).products;
    expect(products[0]).toBe(dummyProducts[2]);
  });
  test("Should return initial state", () => {
    const state = productsReducer(initialState, {
      payload: undefined,
      type: undefined,
    });
    expect(state).toMatchObject(initialState);
  });
});

describe("test all the async thunk function", () => {
  test("testing the categories filter categoryid filter", async () => {
    await store.dispatch(categoriesFilter({ categoryId: "4", searchText: "" }));

    store.getState().productsReducer.products.map((product) => {
      expect(product.categoryId._id).toBe(4);
    });
  });
  // eslint-disable-next-line jest/no-identical-title
  test("testing the categories filter categoryid filter", async () => {
    await store.dispatch(
      categoriesFilter({ categoryId: " 0", searchText: "pants" })
    );

    store.getState().productsReducer.products.map((product) => {
      expect(product.name.toLowerCase().includes("pants")).toBe(true);
    });
  });
  test("should delete an existing product", async () => {
    const token = "demotoken";
    const productId = 251;

    const resultAction = await store.dispatch(
      deleteProduct({ token, id: productId })
    );

    const deletedProductId = resultAction.payload;

    expect(deletedProductId).toBe(true);
  });
  test("should delete a non-existing product", async () => {
    const resultAction = await store.dispatch(deleteProduct(1));
    expect(resultAction.payload).toBe(false);
  });
  test("should create a new product", async () => {
    const input: any = {
      title: "test product",
      description: "test description",
      price: 100,
      categoryId: "1",
      images: [],
    };
    await store.dispatch(createProduct(input));
    expect(store.getState().productsReducer.products.length).toBe(1);
  });
  test("shouldnot create a new product", async () => {
    const input: any = {
      title: "test product",
      description: "test description",
      price: 100,
      categoryId: " 100",
      images: [],
    };
    await store.dispatch(createProduct(input));

    expect(store.getState().productsReducer.products.length).toBe(0);
  });
  test("should update product", async () => {
    const input: any = {
      _id: 250,
      price: 200,
      title: "new title",
    };

    const action = await store.dispatch(updateProduct(input));
    expect(action.payload).toMatchObject({
      id: 250,
      title: "new title",
      price: 200,
      description: "A description",
      images: ["https://placeimg.com/640/480/any"],
      category: {
        _id: "1",
        name: "Clothes",
        image: "https://i.imgur.com/RQL19O6.jpeg",
      },
      _id: 250,
    });
  });
});
