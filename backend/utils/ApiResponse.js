/**
 * Clean API Response Envelope
 *
 * Standard response:
 *   { success: true, message: "Success", data: {}, meta: { pagination: {...} } }
 *
 * Standard error:
 *   { success: false, message: "Error message", code: "ERROR_CODE" }
 */
class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (meta) {
      this.meta = meta;
    }
  }

  static paginated(message, data, pagination) {
    return new ApiResponse(200, message, data, { pagination });
  }
}

export default ApiResponse;