import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

import { DisputeProps } from '../types/dispute';

type Props = {
  children: React.ReactNode
};

export type valueProps = {
  dispute: DisputeProps,
  setDispute: React.Dispatch<React.SetStateAction<DisputeProps>>
};

export const DisputeContext = createContext<valueProps>({ dispute: {}, setDispute: () => {} });

function DisputeContextProvider({ children }: Props) {
  const [dispute, setDispute] = useState<DisputeProps>({});
  const disputeMemo = useMemo(() => ({ dispute, setDispute }), [dispute]);

  return (
    <DisputeContext.Provider value={disputeMemo}>
      {children}
    </DisputeContext.Provider>
  );
}

export function useDisputeContext() {
  return useContext(DisputeContext);
}

export default DisputeContextProvider;
