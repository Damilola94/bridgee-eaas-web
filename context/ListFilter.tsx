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
  filter: any,
  setFilter: React.Dispatch<React.SetStateAction<any>>
};

export const ListFilterContext = createContext<valueProps>({ filter: null, setFilter: () => {} });

function ListFilterContextProvider({ children }: Props) {
  const [filter, setFilter] = useState<any>(null);
  const listFilterVal = useMemo(() => ({ filter, setFilter }), [filter]);

  return (
    <ListFilterContext.Provider value={listFilterVal}>
      {children}
    </ListFilterContext.Provider>
  );
}

export function useListFilter() {
  return useContext(ListFilterContext);
}

export default ListFilterContextProvider;
