import axios from 'axios';
import { BookProps, BookDetailProps, BookRatingsProps } from 'const';

export async function fetchBooks(data: {
  page?: number;
  size?: number;
  type?: string;
  sort?: string;
}): Promise<{ content: BookProps[]; total: number; error?: any }> {
  try {
    const queryArray = Object.keys(data).reduce((prev: string[], item) => {
      const value = data[item as keyof typeof data];
      if (value) {
        prev.push(`${item}=${value}`);
      }
      return prev;
    }, []);
    const response = await axios.get(`/api/books?${queryArray.join(`&`)}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}

export async function fetchBookTypes(): Promise<{
  content: string[];
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/types`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data as string[] };
  } catch (error) {
    console.error(error);
    return { error, content: [] };
  }
}

export async function fetchBookDetailsById(id: string): Promise<{
  content: BookDetailProps;
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data as BookDetailProps };
  } catch (error) {
    console.error(error);
    return { error, content: {} as BookDetailProps };
  }
}

export async function fetchBookRatingsById(id: string): Promise<{
  content: { content: BookRatingsProps[]; total: number };
  error?: any;
}> {
  try {
    const response = await axios.get(`/api/books/${id}/ratings`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error, content: { content: [], total: 0 } };
  }
}

export async function updateBookDetails(
  id: string,
  params: Partial<BookDetailProps>
): Promise<{
  content?: { data: BookDetailProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.put(`/api/books/${id}`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function addRatingByBookID(
  bookID: string,
  params: {
    score: number;
  }
): Promise<{
  content?: { data: Omit<BookRatingsProps, 'user'>; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/api/books/${bookID}/ratings`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function deleteRating(
  bookID: string,
  userID: string
): Promise<{
  content?: { message: string };
  error?: any;
}> {
  try {
    const response = await axios.delete(
      `/api/books/${bookID}/ratings?userId=${userID}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function buyBook(
  bookID: string,
  params: { userID: string; quality: number }
): Promise<{
  content?: { message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(
      `/api/books/${bookID}/buy?userId=${params.userID}&quality=${params.quality}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
