export const wait = (milliseconds: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, milliseconds);
	})
}
