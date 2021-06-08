/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark($title: String!, $link: String!, $star: Boolean!) {
    createBookmark(title: $title, link: $link, star: $star) {
      result
    }
  }
`;
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark($bookmark: BookmarkInput!) {
    updateBookmark(bookmark: $bookmark) {
      result
    }
  }
`;
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark($id: String!) {
    deleteBookmark(id: $id) {
      result
    }
  }
`;
