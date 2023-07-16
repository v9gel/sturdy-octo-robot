import InputMask from "react-input-mask";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../types";

interface Props {
  onSubmit: SubmitHandler<IUser>;
}

export function SearchForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<IUser>();

  return (
    <form onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <input
        type="email"
        placeholder="Введите email"
        required
        {...register("email")}
      />
      <InputMask
        mask="99-99-99"
        alwaysShowMask={true}
        type={"text"}
        {...register("number")}
      />
      <button type="submit">Поиск</button>
    </form>
  );
}
