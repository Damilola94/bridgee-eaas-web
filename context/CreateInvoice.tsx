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

export const CreateInvoiceContext = createContext<valueProps>({ form: {}, setForm: () => {} });

function CreateInvoiceContextProvider({ children }: Props) {
  const [form, setForm] = useState<InvoiceFormProps>({ paymentPlan: 'oneoff' });
  const formMemo = useMemo(() => ({ form, setForm }), [form]);

  return (
    <CreateInvoiceContext.Provider value={formMemo}>
      {children}
    </CreateInvoiceContext.Provider>
  );
}

export function useCreateInvoiceContext() {
  return useContext(CreateInvoiceContext);
}

export default CreateInvoiceContextProvider;
