import { useMemo, useState, useCallback, useRef } from "react";
import { SubmitHandler } from "react-hook-form";

import { IUser, PageState } from "./types";
import { SearchForm } from "./components/SearchForm";
import { Users } from "./components/Users";
import { unmaskUserNumber } from "./helpers";

const API_URL = "http://127.0.0.1:3000/search";

export function App() {
  const [pageState, setPageState] = useState(PageState.Default);
  const [users, setUsers] = useState<IUser[]>([]);
  const abortController = useRef(new AbortController());

  const onSubmit: SubmitHandler<IUser> = useCallback(
    async (searchUser) => {
      if (pageState === PageState.RequestSent) {
        abortController.current.abort();
        abortController.current = new AbortController();
      }

      setPageState(PageState.RequestSent);

      try {
        const url = new URL(API_URL);
        url.searchParams.set("email", searchUser.email);

        const unmaskedNumber = unmaskUserNumber(searchUser.number)
        if (unmaskedNumber) {
          url.searchParams.set("number", unmaskedNumber);
        }

        const response = await fetch(url, {
          signal: abortController.current.signal,
        });
        const data = (await response.json()) as IUser[];
        setUsers(data);
        setPageState(PageState.ResponseReceived);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name == "AbortError") {
            console.log("Запрос прерван");
          } else {
            setPageState(PageState.Error);
          }
        } else {
          console.error("Непредвиденная ошибка", error);
        }
      }
    },
    [pageState, setPageState, setUsers]
  );

  const pageStateMessage = useMemo(() => {
    if (pageState === PageState.Error) {
      return "Произошла ошибка, повторите запрос позже";
    }

    if (pageState === PageState.RequestSent) {
      return "Идет поиск...";
    }

    return "";
  }, [pageState]);

  return (
    <>
      <header>
        <SearchForm onSubmit={onSubmit} />
      </header>
      <main>
        {pageState === PageState.ResponseReceived ? (
          <Users users={users} />
        ) : (
          pageStateMessage
        )}
      </main>
    </>
  );
}
