import { useEffect, useState } from "react";

export type PasswordCheckType = {
  eightCharacters: boolean;
  number: boolean;
  letter: boolean;
};

export default function useCheckPassword(password: string) {
  const [passwordCheck, setPasswordCheck] = useState<PasswordCheckType>({
    eightCharacters: false,
    letter: false,
    number: false,
  });

  const isDisabled = !(
    !!password && /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
  );

  useEffect(() => {
    const numberCheck = /(?=.*[0-9])/.test(password);
    const letterCheck = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);

    setPasswordCheck({
      eightCharacters: password.length >= 8,
      letter: letterCheck,
      number: numberCheck,
    });
  }, [password]);

  const checkForMissingCharacters = () => {
    const numberCheck = /(?=.*[0-9])/.test(password);
    const letterCheck = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);

    setPasswordCheck({
      eightCharacters: password.length >= 8,
      letter: letterCheck,
      number: numberCheck,
    });
  };

  return {
    passwordCheck,
    isDisabled,
    checkForMissingCharacters,
  };
}
