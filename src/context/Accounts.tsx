import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import Loading from '../components/common/Loading';
import useGetQuery from '../hooks/useGetQuery';

type Props = {
  children: React.ReactNode
};

export type valueProps = {
  accounts: any,
  setAccounts: React.Dispatch<React.SetStateAction<any>>
};

export const AccountsContext = createContext<valueProps>({ accounts: null, setAccounts: () => {} });

function AccountsContextProvider({ children }: Props) {
  const [accounts, setAccounts] = useState<any>(null);
  const accountsMemo = useMemo(() => ({ accounts, setAccounts }), [accounts]);

  const { data, status, isFetching } = useGetQuery({
    endpoint: 'dashboard', extra: 'comprehensive-user-details', queryKey: ['accounts-context']
  });

  useEffect(() => {
    if (status === 'success') {
      setAccounts(data?.data);
    }
  }, [status, data]);

  if (status === 'loading' || isFetching) {
    return <Loading message='Setting up account...' />;
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
