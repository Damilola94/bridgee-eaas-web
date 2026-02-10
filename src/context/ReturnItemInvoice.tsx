import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

import { InvoiceFormProps } from '../types/invoice';

type Props = {
  children: React.ReactNode
};

export type valueProps = {
  form: InvoiceFormProps,
  setForm: React.Dispatch<React.SetStateAction<InvoiceFormProps>>
};

export const ReturnInvoiceContext = createContext<valueProps>({ form: {}, setForm: () => {} });

function ReturnInvoiceContextProvider({ children }: Props) {
  const [form, setForm] = useState<InvoiceFormProps>({ disbursementType: 'onetime', recipientDetails: {} });
  const formMemo = useMemo(() => ({ form, setForm }), [form]);

  return (
    <ReturnInvoiceContext.Provider value={formMemo}>
      {children}
    </ReturnInvoiceContext.Provider>
  );
}

export function useReturnInvoiceContext() {
  return useContext(ReturnInvoiceContext);
}

export default ReturnInvoiceContextProvider;
