export interface Todo {
	id: number;
	title: string;
	description?: string;
	cycles: number;
	completed: boolean;
	inFocus: boolean;
	timeSpent: number;
}
