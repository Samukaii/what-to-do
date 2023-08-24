const storageKey = "last-generated-id";

const lastId = () => {
	return +(localStorage.getItem(storageKey) || 0);
}

const incrementLastId = () => {
	const incremented = lastId() + 1;
	localStorage.setItem(storageKey, incremented.toString())
};

export const generateId = () => {
	incrementLastId();
	return lastId();
};
