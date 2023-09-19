import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

type Props = {
  children: React.ReactNode
};

export type valueProps = {
  kycData: any,
  setKycData: React.Dispatch<React.SetStateAction<any>>
};

export const KycContext = createContext<valueProps>({ kycData: null, setKycData: () => {} });

function KycContextProvider({ children }: Props) {
  const [kycData, setKycData] = useState<any>(null);
  const accountsMemo = useMemo(() => ({ kycData, setKycData }), [kycData]);

  return (
    <KycContext.Provider value={accountsMemo}>
      {children}
    </KycContext.Provider>
  );
}

export function useKycContext() {
  return useContext(KycContext);
}

export default KycContextProvider;
