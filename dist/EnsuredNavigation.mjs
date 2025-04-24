"use client";

// src/EnsuredNavigation.tsx
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
var EnsuredNavigation = ({ url, options = {} }) => {
  const {
    onSuccess = () => {
    },
    onFail = () => {
    },
    maxDurationMs = 5e3,
    method = "push"
  } = options;
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!url || url === "") return;
    const targetPath = url.startsWith("/") ? url : new URL(url, window.location.href).pathname;
    if (pathname === targetPath) return;
    const start = Date.now();
    const id = setInterval(() => {
      router[method](url);
      const elapsed = Date.now() - start;
      if (elapsed > maxDurationMs) {
        clearInterval(id);
        onFail == null ? void 0 : onFail();
      }
    }, 100);
    return () => {
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) {
        onSuccess == null ? void 0 : onSuccess();
      }
      clearInterval(id);
    };
  }, [url, pathname]);
  return null;
};
var EnsuredNavigation_default = EnsuredNavigation;
export {
  EnsuredNavigation_default as default
};
