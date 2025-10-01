import { ChangePasswordData } from "../../types/password";
import handleFetch from "./handleFetch";


export const changePassword = (data: ChangePasswordData) => {
  return handleFetch({
    service: "identity-service",
    endpoint: "/api/v1/users/change-password",
    method: "POST",
    auth: true, 
    body: data, 
  });
};
