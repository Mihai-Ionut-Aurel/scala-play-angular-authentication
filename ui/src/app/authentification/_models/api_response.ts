
/**
 * The definition of an API response.
 *
 * Needed to return always the same structure from a API method.
 */
export class APIResponse {
    code: string;
    description: string;
    details: any;
    constructor(code: string, description: string, details: any = []) {
        this.code = code;
        this.description = description;
        this.details = details;
    }
}
