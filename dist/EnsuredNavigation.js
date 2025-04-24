"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/EnsuredNavigation.tsx
var EnsuredNavigation_exports = {};
__export(EnsuredNavigation_exports, {
  default: () => EnsuredNavigation_default
});
module.exports = __toCommonJS(EnsuredNavigation_exports);
var import_react = require("react");
var import_navigation = require("next/navigation");
var EnsuredNavigation = ({ url, options = {} }) => {
  const {
    onSuccess = () => {
    },
    onFail = () => {
    },
    maxDurationMs = 5e3,
    method = "push"
  } = options;
  const router = (0, import_navigation.useRouter)();
  const pathname = (0, import_navigation.usePathname)();
  (0, import_react.useEffect)(() => {
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
