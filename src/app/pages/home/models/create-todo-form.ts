import { FormGroupOf } from "src/app/shared/types/form-group-of";

export type CreateTodoForm = FormGroupOf<{
    title: string;
    description: string | null;
}>;


export type FormValue<T> = T extends FormGroupOf<infer Value> ? Value : never;