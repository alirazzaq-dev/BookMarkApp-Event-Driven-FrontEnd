/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Event = {
  __typename: "Event",
  result?: string | null,
};

export type BookmarkInput = {
  id: string,
  title: string,
  link: string,
  star: boolean,
};

export type Bookmark = {
  __typename: "Bookmark",
  id?: string,
  title?: string,
  link?: string,
  star?: boolean,
};

export type CreateBookmarkMutationVariables = {
  title?: string,
  link?: string,
  star?: boolean,
};

export type CreateBookmarkMutation = {
  createBookmark:  {
    __typename: "Event",
    result?: string | null,
  },
};

export type UpdateBookmarkMutationVariables = {
  bookmark?: BookmarkInput,
};

export type UpdateBookmarkMutation = {
  updateBookmark:  {
    __typename: "Event",
    result?: string | null,
  },
};

export type DeleteBookmarkMutationVariables = {
  id?: string,
};

export type DeleteBookmarkMutation = {
  deleteBookmark:  {
    __typename: "Event",
    result?: string | null,
  },
};

export type GetbookmarksQuery = {
  getbookmarks?:  Array< {
    __typename: "Bookmark",
    id: string,
    title: string,
    link: string,
    star: boolean,
  } > | null,
};
