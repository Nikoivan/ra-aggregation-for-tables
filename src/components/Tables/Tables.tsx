import React, { FC, useEffect, useState } from "react";

import Preloader from "../Preloader/Preloader";
import SortTable from "../SortTable/SortTable";

import MonthTable from "../MonthTable/MonthTable";
import YearTable from "../YearTable/YearTable";

export type BaseListProps = { list: { date: string; amount: number }[] };
export type UpdatedListProps<T> = {
  list: ({ date: string; amount: number } & T)[];
};

export default function Tables(props: { fetchUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<BaseListProps>();
  const [url, setUrl] = useState<string>(props.fetchUrl);

  const getDates = async (url: string) => {
    console.log("1");
    let response;
    try {
      const json = await fetch(url);
      response = await json.json();
      if (response) {
        return response;
      }
    } catch (e) {
      console.log("Ошибка загрузки");
      return;
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      const response = await getDates(url);
      if (response) {
        const { list } = response;
        setList(list);
        setLoading(true);
      }
    }, 500);
  }, []);

  const FormatTable =
    (propName?: string, method?: (props: string) => string) =>
    (InComponent: FC<UpdatedListProps<T>>) => {
      return class extends React.Component<UpdatedListProps<T>> {
        render() {
          const { list } = this.props;
          let sortedList = list.sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            }
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            }
            return 0;
          });
          if (propName && method) {
            sortedList = sortedList.map((el) => {
              return { ...el, [propName]: method(el.date) };
            });
          }
          return <InComponent list={sortedList} />;
        }
      };
    };

  const UpdatedSortTable = FormatTable()(SortTable);
  const UpdatedMonthTable = FormatTable(
    "month",
    (date: string): string => `${new Date(date).getMonth() + 1}`
  )(MonthTable);
  const UpdatedYearTable = FormatTable(
    "year",
    (date: string): string => `${new Date(date).getFullYear()}`
  )(YearTable);

  return (
    <>
      {loading ? (
        <>
          <UpdatedSortTable list={list} />
          <UpdatedMonthTable list={list} />
          <UpdatedYearTable list={list} />
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}
