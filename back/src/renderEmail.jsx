"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEmail = void 0;
var render_1 = require("@react-email/render");
var nurture_1 = require("../emails/nurture");
// @ts-ignore
console.log((0, render_1.render)(<nurture_1.DuckrEmail />, { pretty: true }));
var renderEmail = function (props) {
    return (0, render_1.render)(<nurture_1.DuckrEmail {...props}/>, { pretty: true });
};
exports.renderEmail = renderEmail;
