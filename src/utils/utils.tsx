export function debounce(func: Function, timeoutMs: number) {
    let lastCall: number = Date.now();
    let timer: NodeJS.Timeout;
    return function perform(...args: any[]) {
        const prevCall = lastCall;
        lastCall = Date.now();
        if (prevCall && lastCall - prevCall <= timeoutMs) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(...args);
        }, timeoutMs);
    };
}

function isError(error: Error | unknown): error is Error {
    return (error as Error).message !== undefined;
}

export function setToLocalStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        if (isError(error)) {
            console.log("localStorage error: ", error.message);
        }
    }
}

export function getFromLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    }

    let result: T | null;

    try {
        result = JSON.parse(value) as T;
    } catch {
        result = null;
    }
    return result;
}
