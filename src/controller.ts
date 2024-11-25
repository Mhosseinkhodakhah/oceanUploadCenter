import { response } from "./service/responseService";


export default class controller {

    async uploadMultiPhoto(req: any, res: any, next: any) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new response(req, res, 'upload multiple file', 400, 'no file where uploaded', null))
        }
        console.log('111')
        let uploadedData = req.files.images
        let filePathes: string[] = [];
        for (let i = 0; i < uploadedData.length; i++) {
            let uploadPath = `./public/contents/${req.params.contentId}/` + uploadedData[i].name;
            try {
                const upload = await uploadedData[i].mv(uploadPath)
                filePathes.push(`${process.env.CDNADDRESS}/public/contents/${req.params.contentId}/` + uploadedData[i].name)
            } catch (error) {
                console.log(error)
            }
        }
        if (filePathes.length) {
            return next(new response(req, res, 'upload multiple files', 200, null, { pathes: filePathes }))
        } else {
            return next(new response(req, res, 'upload multiple files', 503, 'somethings went wrong', null))
        }
    }
}