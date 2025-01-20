import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchTableData = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`);
  return data;
};

export const useTableData = () => {
  return useInfiniteQuery('tableData', fetchTableData, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : undefined;
    },
  });
};
