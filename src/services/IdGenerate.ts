import { v4 } from "uuid";

export class IdGenerate {
    public generate(): string {
        return v4();
    }
}