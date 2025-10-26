import React from "react";
import { navigations } from "./route";
import HeaderLink from "./header-link";

export default function HeaderLinks() {
  return (
    <nav className="space-y-2.5 py-3">
      {navigations.map((item) => (
        <HeaderLink key={item.text} item={item} />
      ))}
    </nav>
  );
}
