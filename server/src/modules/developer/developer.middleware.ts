import ApiError from "../../common/errors/ApiError";

export const validateDeveloperBusinessRules = (data: any) => {
  // Experience rule
  if (
    data.beforeJoinExpYear !== undefined &&
    data.beforeJoinExpMonth === undefined
  ) {
    throw new ApiError(400, "Month required when year provided");
  }

  // Date validation
  if (data.relivingDate) {
    const reliving = new Date(data.relivingDate);

    const joining = new Date(data.joining_date);

    if (isNaN(reliving.getTime())) {
      throw new ApiError(400, "Invalid reliving date");
    }

    if (isNaN(joining.getTime())) {
      throw new ApiError(400, "Invalid joining date");
    }

    if (reliving <= joining) {
      throw new ApiError(400, "Relieving date must be after joining date");
    }
  }

  // Status rules
  // if (data.status === "Active" && data.relivingDate) {
  //   throw new ApiError(400, "Active dev cannot have relieving date");
  // }

  if (data.status === "InActive" && !data.relivingDate) {
    throw new ApiError(400, "Relieving date required for inactive status");
  }
};
