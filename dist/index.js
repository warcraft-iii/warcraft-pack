"use strict";
/**
 * @File   : index.ts
 * @Author : Dencer (tdaddon@163.com)
 * @Link   : https://dengsir.github.io
 * @Date   : 4/17/2019, 9:34:55 AM
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var stormlib_1 = __importDefault(require("stormlib"));
var fs_1 = __importDefault(require("mz/fs"));
var path_1 = __importDefault(require("path"));
function getAllFiles(p, r) {
    if (r === void 0) { r = []; }
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, file, stats;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, fs_1.default.readdir(p)];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    file = _a[_i];
                    if (file.startsWith('.') || file.startsWith('@')) {
                        return [3 /*break*/, 4];
                    }
                    file = path_1.default.join(p, file);
                    return [4 /*yield*/, fs_1.default.stat(file)];
                case 3:
                    stats = _b.sent();
                    if (stats.isDirectory()) {
                        getAllFiles(file, r);
                    }
                    else if (stats.isFile()) {
                        r.push(file);
                    }
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, r];
            }
        });
    });
}
function run(input, output) {
    return __awaiter(this, void 0, void 0, function () {
        var files, archive;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.default.exists(output)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_1.default.unlink(output)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, getAllFiles(input)];
                case 4:
                    files = _a.sent();
                    return [4 /*yield*/, stormlib_1.default.create(output, 0, files.length)];
                case 5:
                    archive = _a.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = archive).writeFile;
                                    return [4 /*yield*/, fs_1.default.readFile(file)];
                                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), path_1.default.relative(input, file), 0, 0x200, 0x2 | 0x8])];
                                case 2: return [2 /*return*/, _c.sent()];
                            }
                        }); }); }))];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commander_1.default
                        .version('0.0.1')
                        .description('Welcome!')
                        .arguments('<input>')
                        .option('-o, --output <output>', 'Output file')
                        .parse(process.argv);
                    if (!commander_1.default.output || commander_1.default.args.length < 1) {
                        commander_1.default.outputHelp();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fs_1.default.exists(commander_1.default.output)];
                case 1:
                    if (!(_a.sent())) {
                        commander_1.default.outputHelp();
                        return [2 /*return*/];
                    }
                    run(commander_1.default.args[0], commander_1.default.output);
                    return [2 /*return*/];
            }
        });
    });
}
main();
