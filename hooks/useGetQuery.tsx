import { useQuery } from 'react-query';

import handleFetch from '../services/api/handleFetch';

const useGetQuery = ({
  queryKey = [], endpoint = '', enabled = true,
  extra = null, auth = true, pQuery = null,
  param = null, responseType = null
}: any = {}) => useQuery(
  queryKey,
  async () => handleFetch({
    endpoint, method: 'GET', extra, auth, pQuery, param, responseType
  }),
  { enabled }
);

export default useGetQuery;
