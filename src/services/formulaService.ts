import {useMutation} from "react-query";
import axios from "axios";

export const useGetValues = () => {
  return useMutation(async (keyword) => {
    const {data} = await axios.get('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete', {
      params: {name: keyword},
    });
    return data;
  });
};
