export function processSuccess(res, responseData) {
  return res.status(200).json({ status: true, data: responseData, });
}

export function processFailure(res, error) {
  return res.status(500).json({ status: false, error: error.message, });
}

export const PaymentStatus = {
  INITIALISED: "initialised", 
  USER_SET: "user_set",
  PAYMENT_PROCESSING: "payment processing",
  COMPLETED: "completed",
  FAILED: "failed",
};