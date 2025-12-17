import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useCookies } from "react-cookie";

import Loading from "../components/common/Loading";
import useGetQuery from "../hooks/useGetQuery";
import { QUERY_KEYS } from "../configs/constants";

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
  const [cookie] = useCookies(["data"]);
  const activeRole = cookie?.data?.activeRole;

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
    queryKey: [QUERY_KEYS.WALLET_ACCOUNTS, activeRole]
  });

  const {
    data: identityData,
    status: identityStatus,
    isFetching: identityFetching
  } = useGetQuery({
    service: "identity-service/api/v1",
    endpoint: "users",
    extra: "me",
    queryKey: [QUERY_KEYS.IDENTITY_ACCOUNTS, activeRole]
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
