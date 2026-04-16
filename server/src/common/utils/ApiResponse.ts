class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  meta?: any;

  constructor(
    statusCode: number,
    data: any,
    message: string = "Success",
    meta?: any,
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    if (meta) this.meta = meta;
  }
}
export { ApiResponse };
