"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerate = void 0;
const uuid_1 = require("uuid");
class IdGenerate {
    generate() {
        return uuid_1.v4();
    }
}
exports.IdGenerate = IdGenerate;
