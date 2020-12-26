export type ResponseFormat<T> =
  | {
      status: "error";
      message?: string;
    }
  | { status: "success"; data?: T };
