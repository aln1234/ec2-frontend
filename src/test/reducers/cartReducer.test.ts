import {
  addToCart,
  cartAdd,
  cartRemove,
} from "../../redux/reducers/cartReducer";
import { dummyCategories } from "../data/mockCategories";
import createStore from "../shared/mockStore";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

describe("Suite carts reducer", () => {
  test("Carts reducer should be empty", () => {
    expect(store.getState().cartReducer.carts.length).toBe(0);
  });
  test("should add product to cart", () => {
    const productToAdd: any = {
      userEmail: "albinLamichhane@gmail.com",
      products: {
        _id: 250,
        name: "XXX New Product",
        price: 10,
        description: "A description",
        images: ["https://placeimg.com/640/480/any"],
        category: dummyCategories[0],
        count: 1,
      },
    };
    store.dispatch(addToCart(productToAdd));
    const productsInCart =
      store.getState().cartReducer.carts[0].products[0].count;
    expect(productsInCart).toBe(1);
  });

  test("should increase count if same prodcut is added", () => {
    const productToAdd: any = {
      userEmail: "albinLamichhane@gmail.com",
      products: {
        _id: 250,
        name: "XXX New Product",
        price: 10,
        description: "A description",
        images: ["https://placeimg.com/640/480/any"],
        category: dummyCategories[0],
        count: 1,
      },
    };
    store.dispatch(addToCart(productToAdd));
    store.dispatch(addToCart(productToAdd));
    const productsInCart =
      store.getState().cartReducer.carts[0].products[0].count;
    expect(productsInCart).toBe(2);
  });
  test("should increment the count of an item in the cart", () => {
    const productToAdd: any = {
      userEmail: "albinLamichhane@gmail.com",
      products: {
        _id: 250,
        name: "XXX New Product",
        price: 10,
        description: "A description",
        images: ["https://placeimg.com/640/480/any"],
        category: dummyCategories[0],
        count: 1,
      },
    };

    store.dispatch(addToCart(productToAdd));
    store.dispatch(cartAdd(productToAdd));

    const productsInCart =
      store.getState().cartReducer.carts[0].products[0].count;
    expect(productsInCart).toBe(2);
  });
  test("should remove an item from the cart", () => {
    const productToAdd: any = {
      userEmail: "albinLamichhane@gmail.com",
      products: {
        _id: 250,
        name: "XXX New Product",
        price: 10,
        description: "A description",
        images: ["https://placeimg.com/640/480/any"],
        category: dummyCategories[0],
        count: 1,
      },
    };

    store.dispatch(addToCart(productToAdd));
    store.dispatch(cartRemove(productToAdd));

    const productsInCart = store.getState().cartReducer.carts[0]?.products;
    expect(productsInCart.length).toBe(0);
  });
  test("should decrease count if there are more than one item in the cart", () => {
    const productToAdd: any = {
      userEmail: "albinLamichhane@gmail.com",
      products: {
        _id: 250,
        name: "XXX New Product",
        price: 10,
        description: "A description",
        images: ["https://placeimg.com/640/480/any"],
        category: dummyCategories[0],
        count: 1,
      },
    };

    store.dispatch(addToCart(productToAdd));
    store.dispatch(addToCart(productToAdd));
    store.dispatch(cartRemove(productToAdd));

    const productsInCart =
      store.getState().cartReducer.carts[0]?.products[0]?.count;
    expect(productsInCart).toBe(1);
  });
});
