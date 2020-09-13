"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParameterError = void 0;
const BaseError_1 = require("./base/BaseError");
class InvalidParameterError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 422);
    }
}
exports.InvalidParameterError = InvalidParameterError;
