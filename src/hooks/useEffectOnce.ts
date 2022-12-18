import {useEffect, useRef} from 'react';

export const useEffectOnce = (callback: () => void, deps: any = []) => {
    const isMountedRef = useRef(false);

    return useEffect(() => {
        if (!isMountedRef.current) {
            return callback();
        }
        isMountedRef.current = true;
    }, [...deps]);
};
