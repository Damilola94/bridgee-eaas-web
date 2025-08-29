import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import Loading from "../components/common/Loading";
import useGetQuery from "../hooks/useGetQuery";

type Props = {
  children: React.ReactNode;
};

export type valueProps = {
  accounts: any;
  setAccounts: React.Dispatch<React.SetStateAction<any>>;
};

export const AccountsContext = createContext<valueProps>({
  accounts: null,
  setAccounts: () => {}
});

function AccountsContextProvider({ children }: Props) {
  const [accounts, setAccounts] = useState<any>(null);

  const accountsMemo = useMemo(() => ({ accounts, setAccounts }), [accounts]);

  const {
    data: walletData,
    status: walletStatus,
    isFetching: walletFetching
  } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "wallets",
    extra: "mine",
    queryKey: ["wallet-service-accounts"]
  });

  const {
    data: identityData,
    status: identityStatus,
    isFetching: identityFetching
  } = useGetQuery({
    service: "identity-service/api/v1",
    endpoint: "users",
    extra: "me",
    queryKey: ["identity-service-accounts"]
  });

  useEffect(() => {
    if (walletStatus === "success" && identityStatus === "success") {
      setAccounts({
        wallet: walletData?.data,
        identity: identityData?.data
      });
    }
  }, [walletStatus, identityStatus, walletData, identityData]);

  if (
    walletStatus === "loading" ||
    identityStatus === "loading" ||
    walletFetching ||
    identityFetching
  ) {
    return <Loading message="Setting up account..." />;
  }

  return (
    <AccountsContext.Provider value={accountsMemo}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccountsContext() {
  return useContext(AccountsContext);
}

export default AccountsContextProvider;
