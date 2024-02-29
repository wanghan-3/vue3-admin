export interface ResponseType<D = null> {
  code: number;
  data: D;
  msg: string;
}
