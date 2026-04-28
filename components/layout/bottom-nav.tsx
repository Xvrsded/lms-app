"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#dashboard", label: "Dashboard", icon: "⌂" },
  { href: "#users", label: "Users", icon: "◉" },
  { href: "#courses", label: "Courses", icon: "▣" },
  { href: "#reports", label: "Reports", icon: "▤" },
  { href: "#profile", label: "Profile", icon: "◌" },
];

export function BottomNav() {
  const [activeHash, setActiveHash] = useState("#dashboard");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#dashboard");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-700 bg-stone-900/95 backdrop-blur">
      <ul className="mx-auto grid h-18 w-full max-w-3xl grid-cols-5 px-1">
        {navItems.map((item) => {
          const isActive = activeHash === item.href;

          return (
            <li key={`${item.href}-${item.label}`} className="flex">
              <a
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`flex w-full flex-col items-center justify-center rounded-xl text-[11px] font-medium transition ${
                  isActive ? "text-amber-100" : "text-stone-300 hover:text-amber-200"
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span className="mt-1">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
