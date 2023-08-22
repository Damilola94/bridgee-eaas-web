import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import { ReturnFormProps } from '../types/invoice';

type Props = {
  children: React.ReactNode
};

export type valueProps = {
  form: ReturnFormProps,
  setForm: React.Dispatch<React.SetStateAction<ReturnFormProps>>
  invoice: any,
  setInvoice: React.Dispatch<React.SetStateAction<ReturnFormProps>>
};

export const ReturnGoodsContext = createContext<valueProps>({
  form: {}, setForm: () => {}, invoice: {}, setInvoice: () => {}
});

function ReturnGoodsContextProvider({ children }: Props) {
  const [invoice, setInvoice] = useState<any>({});
  const [form, setForm] = useState<ReturnFormProps>({});

  const dataMemo = useMemo(() => ({
    form, setForm, invoice, setInvoice
  }), [form, invoice]);

  return (
    <ReturnGoodsContext.Provider value={dataMemo}>
      {children}
    </ReturnGoodsContext.Provider>
  );
}

export function useReturnGoodsContext() {
  return useContext(ReturnGoodsContext);
}

export default ReturnGoodsContextProvider;
