import useSWR from "swr";
import * as method from "../api_slice/services";
import instance from "../api_slice/port";

const fetcher = async (url: any) => await instance.get(url);

const endpoint = "/users";

const useUsers = () => {
  const { data, error, mutate } = useSWR(endpoint, fetcher);
  const create = async (data: any) => {
    const revalidate = await method.httpPost(endpoint, data, {});
    mutate(revalidate);
  };
  const remove = async (id: any) => {
    await method.httpDelete(endpoint, id);
    const revalidate = data?.data.filter((item: any) => item.id !== id) ?? [];
    mutate(revalidate);
  };
  const update = async (id: any, data: any) => {
    const newData = await method.httpPut(endpoint, id, data);
    const revalidate = data.map((item: any) =>
      item.id == id ? newData : item
    );
    mutate(revalidate);
  };
  return {
    data,
    error,
    create,
    remove,
    update,
  };
};
export default useUsers;
