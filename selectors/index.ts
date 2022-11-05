import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  waitForNone,
} from "recoil";
import { bookDetailsIdState, homePageQueryState } from "atoms";
import {
  fetchBookDetailsById,
  fetchBookRatingsById,
  fetchBooks,
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
    if (!bookID) {
      throw new Error('Required bookID');
    }
    const response = await fetchBookRatingsById(bookID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});
