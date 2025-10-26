import { PasswordCheckType } from "@/hooks/use-check-password";

export default function PasswordCheck({
  passwordCheck,
}: {
  passwordCheck: PasswordCheckType;
}) {
  return (
    <ul className="space-y-1 text-xs text-gray-700 list-disc pl-4">
      <li className={` ${passwordCheck.eightCharacters ? "line-through" : ""}`}>
        Minimum of 8 characters
      </li>
      <li className={` ${passwordCheck.number ? "line-through" : ""}`}>
        at least one number or symbol
      </li>
      <li className={` ${passwordCheck.letter ? "line-through" : ""}`}>
        at least one uppercase
      </li>
      <li className={` ${passwordCheck.letter ? "line-through" : ""}`}>
        at least one lowercase
      </li>
    </ul>
  );
}
