class ApiResponse {
  constructor(statusCode, message, data = "Success", pagination = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  static paginated(message, data, pagination) {
    return new ApiResponse(200, message, data, pagination);
  }
}

export default ApiResponse;