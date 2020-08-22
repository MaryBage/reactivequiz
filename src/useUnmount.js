import { useEffect, useRef } from "react";

export default function useUnmounted() {
    const unMounted = useRef(false);
    useEffect(() => {
        return () => {
            unMounted.current = true;
        };
    }, []);
    return unMounted;
}