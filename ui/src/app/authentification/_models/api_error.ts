import {APIResponse} from "./index"
/**
 * An API error that can transport an `APIResponse`.
 */
export class APIError extends Error {
    response: APIResponse;

    constructor(response: APIResponse) {
        super(response.description);
        this.response = response;
    }
}