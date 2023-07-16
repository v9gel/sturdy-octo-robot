import { IUser } from "../types";
import { User } from "./User";

interface Props {
  users: IUser[];
}

export function Users({ users }: Props) {
  return (
    <>
      {users.length
        ? users.map(({ email, number }) => (
            <User email={email} number={number} key={email + number}/>
          ))
        : "Пользователи не найдены"}
    </>
  );
}
