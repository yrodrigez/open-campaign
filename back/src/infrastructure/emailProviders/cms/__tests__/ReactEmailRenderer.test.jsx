"use strict";
// src/infrastructure/emailRendering/__tests__/ReactEmailRenderer.test.tsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var ReactEmailRenderer_1 = require("../ReactEmailRenderer");
describe('ReactEmailRenderer', function () {
    var renderer;
    beforeEach(function () {
        renderer = new ReactEmailRenderer_1.ReactEmailRenderer();
    });
    it('should render simple text component correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var emailJson, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailJson = {
                        type: 'Html',
                        props: {
                            children: [
                                {
                                    type: 'Head',
                                    props: {}
                                },
                                {
                                    type: 'Preview',
                                    props: {
                                        children: 'Your preview text here'
                                    }
                                },
                                {
                                    type: 'Tailwind',
                                    props: {
                                        children: [
                                            {
                                                type: 'Body',
                                                props: {
                                                    className: 'bg-white my-auto mx-auto font-sans',
                                                    children: [
                                                        {
                                                            type: 'Container',
                                                            props: {
                                                                className: 'bg-white border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px]',
                                                                children: [
                                                                    {
                                                                        type: 'Section',
                                                                        props: {
                                                                            className: 'mt-[32px]',
                                                                            children: [
                                                                                {
                                                                                    type: 'Img',
                                                                                    props: {
                                                                                        src: 'path_to_login_link_image',
                                                                                        width: '60',
                                                                                        height: '60',
                                                                                        alt: 'Duckr',
                                                                                        className: 'my-0 mx-auto'
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'Text',
                                                                        props: {
                                                                            className: 'text-[#666666] text-[12px] leading-[24px]',
                                                                            children: "If you have any concerns regarding your account's safety, please reply to this email to get in touch with us."
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    };
                    return [4 /*yield*/, renderer.render(emailJson)];
                case 1:
                    result = _a.sent();
                    expect(result.html).toContain('If you have any concerns regarding your account\'s safety, please reply to this email to get in touch with us.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error for an unknown component type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var emailJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailJson = {
                        type: 'UnknownComponent',
                        props: {}
                    };
                    return [4 /*yield*/, expect(renderer.render(emailJson)).rejects.toThrow('The component with type UnknownComponent is not available in ReactEmailComponents')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
