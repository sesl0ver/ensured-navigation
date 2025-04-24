'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type EnsuredNavigationProps = {
  url: string;
  options?: {
    onSuccess?: () => void;
    onFail?: () => void;
    method?: 'replace' | 'push';
    maxDurationMs?: number;
  }
};

const EnsuredNavigation: React.FC<EnsuredNavigationProps> = ({ url, options = {} }) => {
  const {
    onSuccess = () => {},
    onFail = () => {},
    maxDurationMs = 5000,
    method = 'push',
  } = options;

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!url || url === '') return;

    const targetPath = url.startsWith('/')
        ? url
        : new URL(url, window.location.href).pathname;

    if (pathname === targetPath) return;

    const start = Date.now();
    const id = setInterval(() => {
      router[method](url);
      const elapsed = Date.now() - start;

      if (elapsed > maxDurationMs) {
        clearInterval(id);
        onFail?.();
      }
    }, 100);

    return () => {
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) {
        onSuccess?.();
      }
      clearInterval(id);
    };
  }, [url, pathname]);

  return null;
}

export default EnsuredNavigation;