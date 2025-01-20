import { useQuery } from 'react-query';
import axios from 'axios';

const fetchGraphData = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

export const useGraphData = () => {
  return useQuery('graphData', fetchGraphData);
};
