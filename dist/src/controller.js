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
const responseService_1 = require("./service/responseService");
class controller {
    uploadMultiPhoto(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return next(new responseService_1.response(req, res, 'upload multiple file', 400, 'no file where uploaded', null));
            }
            console.log('111', req.files.images);
            console.log('222', req.files);
            let uploadedData = req.files.images;
            let filePathes = [];
            if (uploadedData.length) {
                for (let i = 0; i < uploadedData.length; i++) {
                    console.log('uploaded file is >>>>>>>', uploadedData[i].name);
                    let uploadPath = `/home/oceanCdn/contents/` + uploadedData[i].name;
                    try {
                        const upload = yield uploadedData[i].mv(uploadPath);
                        console.log('upload resault', upload);
                        filePathes.push(`${process.env.CDNADDRESS}/content/` + uploadedData[i].name);
                        console.log('filePath', filePathes);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            else {
                console.log('uploaded file is >>>>>>>', uploadedData.name);
                let uploadPath = `/home/oceanCdn/contents/` + uploadedData.name;
                try {
                    const upload = yield uploadedData.mv(uploadPath);
                    console.log('upload resault', upload);
                    filePathes.push(`${process.env.CDNADDRESS}/content/` + uploadedData.name);
                    console.log('filePath', filePathes);
                }
                catch (error) {
                    console.log(error);
                }
            }
            if (filePathes.length) {
                return next(new responseService_1.response(req, res, 'upload multiple files', 200, null, { pathes: filePathes }));
            }
            else {
                console.log('upload resault', filePathes);
                return next(new responseService_1.response(req, res, 'upload multiple files', 500, 'somethings went wrong', null));
            }
        });
    }
    uploadProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return next(new responseService_1.response(req, res, 'upload multiple file', 400, 'no file where uploaded', null));
            }
            let uploadedData = req.files.profile;
            console.log('upload profile data', uploadedData);
            let filePathe;
            let uploadPath = `/home/oceanCdn/profile/${req.params.userId}/` + uploadedData.name;
            try {
                yield uploadedData.mv(uploadPath);
                filePathe = `${process.env.CDNADDRESS}/profile/${req.params.userId}/${uploadedData.name}`;
                console.log('file path', filePathe);
            }
            catch (error) {
                console.log(error);
            }
            return next(new responseService_1.response(req, res, 'upload multiple files', 200, null, { pathes: filePathe }));
        });
    }
}
exports.default = controller;
