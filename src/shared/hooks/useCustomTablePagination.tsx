import { useServerSide } from "@lblanco/server-side-table";
import {
  serverSideHandler,
  serverSidePaginator,
  serverSideFilter,
  serverSideOrder,
} from "@lblanco/server-side-table";
import { useSpinner } from "@vadiun/react-hooks";

export interface ServerResponse<T> {
  total: number;
  data: T[];
}
export interface LaravelPaginated<T> {
  data: T[];
  meta: {
    total: number;
  };
}

const customTableHandler = serverSideHandler({
  paginator: serverSidePaginator({
    label: "page",
    firstPageNro: 1,
    itemsPerPageLabel: "limit",
  }),
  filter: serverSideFilter("search"),
  order: serverSideOrder(
    ({ name, direction }) => `orden=${name}&orden_tipo=${direction}`
  ),
});

function customRequestAdapter<T>(res: LaravelPaginated<T>): ServerResponse<T> {
  return { total: res.meta.total, data: res.data };
}

export type ServerRequestFn<T> = (
  params: string
) => Promise<LaravelPaginated<T>>;

export function useCustomTablePagination<T>(requestFn: ServerRequestFn<T>) {
  const showSpinner = useSpinner();

  return useServerSide<T>({
    requestFn: async (params) => {
      const promise = requestFn(params);
      showSpinner(promise);
      return customRequestAdapter(await promise);
    },
    tableHandler: customTableHandler,
  });
}
