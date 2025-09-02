import handleFetch from "./handleFetch";

export interface UpdateBusinessDetailsData {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    logoFile?: File | null;
}

export const updateBusinessDetails = (data: UpdateBusinessDetailsData) => {
    const formDataBody = new FormData();
    formDataBody.append("BusinessName", data.businessName);
    formDataBody.append("BusinessEmail", data.businessEmail);
    formDataBody.append("BusinessPhone", data.businessPhone);
    if (data.logoFile) {
        formDataBody.append("Logo", data.logoFile);
    }

    return handleFetch({
        service: "identity-service",
        endpoint: "/api/v1/users/business-details",
        method: "PUT",
        auth: true,
        multipart: true,
        body: formDataBody,
    });
}