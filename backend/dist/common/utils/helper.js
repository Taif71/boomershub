"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomEnumValue = exports.createSearchQuery = exports.generateId = exports.ToBoolean = exports.isEmail = exports.decodeToken = exports.encodeToken = exports.subDocUpdateWithObj = exports.subDocUpdateWithArray = void 0;
const class_transformer_1 = require("class-transformer");
const crypto_1 = require("crypto");
const util_1 = require("util");
const common_1 = require("@nestjs/common");
function subDocUpdateWithArray(currentDocs, newItems) {
    const replacedDocs = [];
    let isReplaced = false;
    newItems.map((item) => {
        if (typeof item === 'object') {
            if (item.hasOwnProperty('_id')) {
                if (item.hasOwnProperty('isDeleted') && item.isDeleted) {
                    currentDocs = currentDocs.filter((doc) => doc._id != item['_id']);
                }
                else {
                    currentDocs = currentDocs.map((doc) => item['_id'] == doc._id ? item : doc);
                }
            }
            else {
                currentDocs.push(item);
            }
        }
        else if (typeof item == 'string' || typeof item == 'number') {
            replacedDocs.push(item);
            isReplaced = true;
        }
        else {
            currentDocs.push(item);
        }
    });
    return isReplaced ? replacedDocs : currentDocs;
}
exports.subDocUpdateWithArray = subDocUpdateWithArray;
function subDocUpdateWithObj(currentDoc, newItem) {
    if (newItem && newItem.hasOwnProperty('isDeleted') && newItem.isDeleted) {
        currentDoc = {};
    }
    else {
        const keys = Object.keys(newItem);
        keys.map((key) => {
            if (!(newItem[key] == null || newItem[key] == undefined) &&
                typeof newItem[key] === 'object' &&
                !Array.isArray(newItem[key])) {
                const currentSubDoc = (currentDoc[key] && currentDoc[key]._doc) || currentDoc[key] || {};
                newItem[key] = subDocUpdateWithObj(currentSubDoc, newItem[key]);
                currentDoc[key] = newItem[key];
            }
            else if (Array.isArray(newItem[key]) && newItem[key].length > 0) {
                currentDoc[key] = subDocUpdateWithArray(currentDoc[key], newItem[key]);
            }
            else {
                currentDoc[key] = newItem[key];
            }
        });
    }
    return currentDoc;
}
exports.subDocUpdateWithObj = subDocUpdateWithObj;
async function encodeToken(token, password) {
    try {
        const iv = (0, crypto_1.randomBytes)(16);
        const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, 'salt', 32));
        const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
        const encryptedToken = Buffer.concat([
            cipher.update(JSON.stringify(token)),
            cipher.final(),
        ]);
        return encryptedToken.toString('hex') + 'ILN' + iv.toString('hex');
    }
    catch (err) {
        throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.encodeToken = encodeToken;
async function decodeToken(token, password) {
    try {
        const tokenSplit = token.split('ILN');
        const iv = Buffer.from(tokenSplit[1], 'hex');
        const tokenBuff = Buffer.from(tokenSplit[0], 'hex');
        const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, 'salt', 32));
        const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
        const decrypted = Buffer.concat([
            decipher.update(tokenBuff),
            decipher.final(),
        ]);
        return JSON.parse(decrypted.toString());
    }
    catch (err) {
        throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.decodeToken = decodeToken;
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.isEmail = isEmail;
function ToBoolean() {
    return (0, class_transformer_1.Transform)((v) => ['1', 1, 'true', true].includes(v.value));
}
exports.ToBoolean = ToBoolean;
function generateId(prefix, id) {
    const numberLength = (n) => String(Math.abs(n)).length;
    const idLength = numberLength(id);
    return `${prefix}${'0'.repeat(8 - idLength)}${id}`;
}
exports.generateId = generateId;
function createSearchQuery(query) {
    try {
        let searchQuery = {
            isActive: true,
            isDeleted: false,
        };
        if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
            delete searchQuery.isActive;
            delete searchQuery.isDeleted;
        }
        if (query.hasOwnProperty('filter') && query.filter) {
            searchQuery = {
                ...searchQuery,
                ...JSON.parse(query.filter),
            };
        }
        return searchQuery;
    }
    catch (err) {
        throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.createSearchQuery = createSearchQuery;
function randomEnumValue(enumeration) {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}
exports.randomEnumValue = randomEnumValue;
//# sourceMappingURL=helper.js.map