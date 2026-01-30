/**
 * Throttle utility function for performance optimization
 * Limits the rate at which a function can be called
 */
export function throttle<T extends (...args: unknown[]) => void>(
	func: T,
	wait: number,
): T {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let previous = 0;

	return ((...args: Parameters<T>) => {
		const now = Date.now();
		const remaining = wait - (now - previous);

		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func(...args);
		} else if (!timeout) {
			timeout = setTimeout(() => {
				previous = Date.now();
				timeout = null;
				func(...args);
			}, remaining);
		}
	}) as T;
}
