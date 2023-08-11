import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { shoppingCartItemProps, BookProps, PAGE_SIZE } from "const";

export const homePageBookSumState = atom({
  key: "homePageBookSumState",
  default: 0,
});

export const shoppingCartState = atom<shoppingCartItemProps[]>({
  key: "shoppingCartState",
  default: [],
});

export const bookTypeListState = atom<string[]>({
  key: "bookTypeListState",
  default: [],
});

export const homePageQueryState = atom({
  key: "homePageQueryState",
  default: { page: 1, type: "", sort: "", size: PAGE_SIZE },
});

export const bookDetailsIdState = atom({
  key: "bookDetailsIdState",
  default: "",
});

export const currentUserIdState = atom({
  key: "currentUserIdState",
  default: "1",
});
