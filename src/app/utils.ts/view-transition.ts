export const startViewTransition = (callback: () => void) => {
    if (document.startViewTransition) {
        document.startViewTransition(callback);
    } else {
        console.warn('View Transition API not supported in this browser.');
        callback();
    }
}