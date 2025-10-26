import { showToast } from "@/lib/toast";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const formatDateTime = (date: string) => {
  const newDate = new Date(date);
  return ` ${newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} . ${newDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;
};

export const formatDate = (date: string, time?: boolean) => {
  return date && time
    ? new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
};

export const handleSuccess = (
  message: string,
  push?: (href: string, options?: NavigateOptions) => void,
  path?: string,
) => {
  if (path && push) {
    showToast(message, "success");
    push(path);
  } else {
    showToast(message, "success");
  }
};

export const handleError = (message: string) => {
  showToast(message, "error");
};

export const maskEmailForDisplay = (email: string): string => {
  if (!email || typeof email !== "string") return "";
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return "";

  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex); // includes the @

  if (localPart.length === 0) return domainPart; // edge case

  const visiblePrefixLength = Math.min(2, localPart.length);
  const visibleSuffixLength = Math.min(
    2,
    Math.max(0, localPart.length - visiblePrefixLength),
  );

  const prefix = localPart.slice(0, visiblePrefixLength);
  const suffix =
    visibleSuffixLength > 0 ? localPart.slice(-visibleSuffixLength) : "";

  return `${prefix}****${suffix}${domainPart}`;
};

export const formatNumInThousands = (number: number | string) => {
  const numericValue = Number(number);
  if (Number.isNaN(numericValue)) {
    return "0.0";
  }
  // convert to string and split into different part
  const [intPart, originalDecimalPart] = number?.toString()?.split(".");

  // rever to start formartting from right hand
  const reversedNum = intPart.split("").reverse().join("");

  // loop through the value and add , after every 3 chars
  const formattedVal = reversedNum
    .match(/.{1,3}/g)
    ?.join(",")
    .split("")
    .reverse()
    .join("");

  let decimalPart = originalDecimalPart || "00";
  if (decimalPart.length === 1) {
    decimalPart += "0";
  }

  return formattedVal + "." + Number(decimalPart);
};

export const handleCopyToClipboard = (id: string | number, val: string) => {
  if (id) {
    navigator.clipboard.writeText(val);
  }
};

export function getNameInitials(name: string) {
  const words = name?.split(" ");

  let nameInitials = "";

  if (words?.length === 1) {
    // If there's only one word, take the first two characters
    nameInitials = `${words[0].slice(0, 2)}`;
  } else if (words?.length > 2 && words[1] === "&") {
    // If there are more than two words and the second is "&", take the first and third initials
    nameInitials = `${words[0][0]} ${words[2][0]}`;
  } else {
    // If there are exactly two words or none of the above conditions, take the first initials of the first two words
    nameInitials = `${words[0][0]} ${words[1][0]}`;
  }

  return nameInitials;
}

export const getStatusColors = (status: string) => {
  const statusLower = status?.toLowerCase();

  if (["active", "verified", "approved", "success"].includes(statusLower)) {
    return "success";
  }

  if (["reset"]?.includes(statusLower)) {
    return "failed";
  }

  if (["pending", "processing"]?.includes(statusLower)) {
    return "warning";
  }

  return "fall-back";
};

export const queryBuilder = (params: { [key: string]: number | string }) => {
  const searchParams = new URLSearchParams();

  Object.entries(params || {})?.forEach(([k, v]) => {
    if (v !== "" || v !== undefined || v !== null) {
      searchParams.set(k, String(v));
    }
  });
};

export function debouncer<T>(func: (val: T) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (val: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(val);
    }, delay);
  };
}
