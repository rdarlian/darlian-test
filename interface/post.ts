export interface Response<T> {
  data: T;
  page: T;
  limit: T;
  total: T;
}
export interface Data {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  updatedDate: string;
  owner: Owner;
  total: number;
  page: number;
  limit: number;
}

export interface Owner {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}
