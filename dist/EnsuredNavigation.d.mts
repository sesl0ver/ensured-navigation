type EnsuredNavigationProps = {
    url: string;
    options?: {
        onSuccess?: () => void;
        onFail?: () => void;
        method?: 'replace' | 'push';
        maxDurationMs?: number;
    };
};
declare const EnsuredNavigation: React.FC<EnsuredNavigationProps>;

export { type EnsuredNavigationProps, EnsuredNavigation as default };
