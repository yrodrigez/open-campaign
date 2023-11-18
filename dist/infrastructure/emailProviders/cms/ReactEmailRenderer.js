"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactEmailRenderer = void 0;
const render_1 = require("@react-email/render");
const ReactEmailComponents = __importStar(require("@react-email/components"));
const uuidv4_1 = require("uuidv4");
const React = __importStar(require("react"));
class ReactEmailRenderer {
    render(emailJson) {
        return __awaiter(this, void 0, void 0, function* () {
            const Email = this.convertJsonToJsx(emailJson);
            return {
                html: (0, render_1.render)(Email, { pretty: true }),
                text: (0, render_1.render)(Email, { plainText: true }),
            };
        });
    }
    convertJsonToJsx(emailJson) {
        const { type, props = {} } = emailJson;
        const Component = ReactEmailComponents[type];
        if (!Component) {
            throw new Error(`The component with type ${type} is not available in ReactEmailComponents`);
        }
        if (!props.key)
            props.key = (0, uuidv4_1.uuid)();
        const children = props.children;
        if (!children)
            return React.createElement(Component, Object.assign({}, props));
        const childrenElements = typeof children === 'string'
            ? children
            : (children === null || children === void 0 ? void 0 : children.map((child) => this.convertJsonToJsx(child))) || null;
        return React.createElement(Component, Object.assign({}, props),
            " ",
            childrenElements,
            " ");
    }
}
exports.ReactEmailRenderer = ReactEmailRenderer;
