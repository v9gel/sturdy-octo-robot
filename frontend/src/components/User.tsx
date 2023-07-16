import { formatUserNumber } from "../helpers";

interface Props {
  email: string;
  number: string;
}

export function User({ email, number }: Props) {
  return (
    <li>
      {email} - {formatUserNumber(number)}
    </li>
  );
}
