export interface IPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface IResponseData<T> {
  data: T;
}
