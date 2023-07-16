export interface IUser {
  email: string;
  number: string;
}

export enum PageState {
  Default,
  RequestSent,
  ResponseReceived,
  Error,
}
