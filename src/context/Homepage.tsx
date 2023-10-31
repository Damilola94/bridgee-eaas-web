import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

type Props = {
  children: React.ReactNode
};

type HomepageProps = {
  isWaitlist?: boolean
};

export type valueProps = {
  homepageData: HomepageProps,
  setHomepageData: React.Dispatch<React.SetStateAction<any>>
};

export const HomepageContext = createContext<valueProps>({
  homepageData: {},
  setHomepageData: () => {}
});

function HomepageContextProvider({ children }: Props) {
  const [homepageData, setHomepageData] = useState<HomepageProps>({ isWaitlist: true });
  const homepageMemo = useMemo(() => ({ homepageData, setHomepageData }), [homepageData]);

  return (
    <HomepageContext.Provider value={homepageMemo}>
      {children}
    </HomepageContext.Provider>
  );
}

export function useHomepageContext() {
  return useContext(HomepageContext);
}

export default HomepageContextProvider;
