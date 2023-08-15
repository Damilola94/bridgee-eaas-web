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
};

export const ReturnGoodsContext = createContext<valueProps>({ form: {}, setForm: () => {} });

function ReturnGoodsContextProvider({ children }: Props) {
  const [form, setForm] = useState<ReturnFormProps>({});
  const formMemo = useMemo(() => ({ form, setForm }), [form]);

  return (
    <ReturnGoodsContext.Provider value={formMemo}>
      {children}
    </ReturnGoodsContext.Provider>
  );
}

export function useReturnGoodsContext() {
  return useContext(ReturnGoodsContext);
}

export default ReturnGoodsContextProvider;
