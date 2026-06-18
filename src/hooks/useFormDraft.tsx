import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "react-query";
import handleFetch from "../services/api/handleFetch";

const DEBOUNCE_MS = 5000;

const serializeForm = (form: any) => ({
  description: form?.description || "",
  recipientDetails: form?.recipientDetails || {},
  isDeliveryOnUs: form?.isDeliveryOnUs ?? false,
  escrowItems: form?.escrowItems || [],
  categoryId: form?.categoryId || null,
  selectedCourier: form?.selectedCourier || null,
});

export function useFormDraft(
  form: any,
  onDraftLoaded: (draft: any) => void,
  onDraftChecked: (hasDraft: boolean) => void,
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDirtyRef = useRef(false);
  const initializedRef = useRef(false);

  const saveMutation = useMutation((body: any) =>
    handleFetch({
      service: "wallet-service/api/v1/",
      endpoint: "escrows/orders/form-draft",
      method: "PUT",
      body,
      auth: true,
    }),
  );

  const deleteMutation = useMutation(() =>
    handleFetch({
      service: "wallet-service/api/v1/",
      endpoint: "escrows/orders/form-draft",
      method: "DELETE",
      auth: true,
    }),
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    handleFetch({
      service: "wallet-service/api/v1/",
      endpoint: "escrows/orders/form-draft",
      method: "GET",
      auth: true,
    })
      .then((res: any) => {
        if (res?.data) {
          onDraftLoaded(res.data);
          onDraftChecked(true);
        } else {
          onDraftChecked(false);
        }
      })
      .catch(() => {
        onDraftChecked(false);
      });
  }, []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    isDirtyRef.current = true;
  }, [form]);

  useEffect(() => {
    if (!isDirtyRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!isDirtyRef.current) return;
      saveMutation.mutate(serializeForm(form));
      isDirtyRef.current = false;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [form]);

  const deleteDraft = useCallback(() => {
    deleteMutation.mutate();
  }, []);

  return { deleteDraft };
}