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
