"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const uploadController = new controller_1.default();
router.post('/upload-multi-photo', uploadController.uploadMultiPhoto);
router.post('/upload-profile/:userId', uploadController.uploadProfile);
exports.default = router;
