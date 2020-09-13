"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
exports.BaseError = BaseError;
