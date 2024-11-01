export interface IBaseResponse<T> {
  readonly message: string;
  readonly data: T | null;
}
