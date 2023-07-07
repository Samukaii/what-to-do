import {FormGroupOf} from "src/app/shared/types/form-group-of";

export type TodoForm = FormGroupOf<{
    title: string;
    description: string | null;
    cycles: number;
}>;
