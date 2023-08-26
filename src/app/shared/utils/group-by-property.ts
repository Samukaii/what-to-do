import { PropertyGroup } from "../models/property-group";

export const groupByProperty = <T, K extends keyof T>(list: T[], property: K) => {
	const groupped: PropertyGroup<T, K>[] = [];

	list.forEach(item => {
		const group = groupped.find(group => group[property] === item[property])

		if(group) {
			group.list.push(item);
			return;
		}

		groupped.push({
			[property]: item[property],
			list: [item]
		} as PropertyGroup<T, K>)

	})

	return groupped;
};
