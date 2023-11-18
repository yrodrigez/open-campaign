"use strict";
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
// src/infrastructure/webapp/controllers/emails/cms/RenderEmailRouter.ts
const express_1 = require("express");
const ReactEmailRenderer_1 = require("../../../../../infrastructure/emailProviders/cms/ReactEmailRenderer");
const RenderReactEmail_1 = require("../../../../../application/use_cases/cms/RenderReactEmail");
const router = (0, express_1.Router)();
const emailRenderer = new ReactEmailRenderer_1.ReactEmailRenderer();
const renderReactEmailUseCase = new RenderReactEmail_1.RenderReactEmail(emailRenderer);
router.post('/react', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailJson = req.body;
        const renderedEmail = yield renderReactEmailUseCase.execute(emailJson);
        res.json({ renderedEmail });
    }
    catch (error) {
        let message = 'unknown error';
        if (error instanceof Error) {
            message = error.message || error;
        }
        res.status(500).json({ error: message });
    }
}));
exports.default = router;
