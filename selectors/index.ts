import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  waitForNone,
  selectorFamily,
} from "recoil";

import { homePageQueryState, bookDetailsIdState } from "atoms";

import {
  fetchBooks,
  fetchBookDetailsById,
  fetchBookRatingsById,
} from "lib/http";

export const homePageQuery = selector({
  key: "homePage",
  get: async ({ get }) => {
    const { page, size, type, sort } = get(homePageQueryState);
    const response = await fetchBooks({ page, size, type, sort });
    return response;
  },
});

export const bookInfoQuery = selector({
  key: "BookInfoQuery",
  get: async ({ get }) => {
    const bookID = get(bookDetailsIdState);
    const response = await fetchBookDetailsById(bookID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

export const bookRatingQuery = selector({
  key: "BookRatingQuery",
  get: async ({ get }) => {
    const bookID = get(bookDetailsIdState);
    const response = await fetchBookRatingsById(bookID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

// export const bookDetailsQuery = selector({
//   key: "bookDetails",
//   get: async ({ get }) => {
//     const bookId = get(bookDetailsIdState);
//     const bookLoadables = get(
//       waitForNone([bookInfoQuery(bookId), bookRatingQuery(bookId)])
//     );
//     return bookLoadables
//       .filter(({ state }) => state === "hasValue")
//       .map(({ contents }) => contents);
//   },
// });
