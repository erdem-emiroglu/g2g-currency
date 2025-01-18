import {LOCAL_STORAGE_KEYS} from "@/constants";

export const getStorageItem = (key: typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS], defaultValue?: any) => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }

    return localStorage.getItem(key) || defaultValue;
}
