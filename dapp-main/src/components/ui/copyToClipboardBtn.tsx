"use client";

import { handleCopyToClipboard } from "@/lib/helpers";
import { CircleCheckBig, Copy } from "lucide-react";
import { useEffect, useState } from "react";

const CopyToClipboardBtn = ({
  id,
  valuToCopy,
  className,
  title,
}: {
  id: string | number;
  valuToCopy: string;
  className?: string;
  title?: string;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleCopy = () => {
    setClicked(!clicked);
    handleCopyToClipboard(id, valuToCopy);
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(!clicked);
      }, 1000);
    }
  }, [clicked]);

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {clicked ? (
        <span className="animate__animated animate__bounceIn text-success">
          <CircleCheckBig size={10} />
        </span>
      ) : (
        <span className={`text-grey-500 flex items-center gap-2 ${className}`}>
          <Copy size={10} />
          {title}
        </span>
      )}
    </button>
  );
};

export default CopyToClipboardBtn;
