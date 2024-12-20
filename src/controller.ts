import { response } from "./service/responseService";


export default class controller {

    async uploadMultiPhoto(req: any, res: any, next: any) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new response(req, res, 'upload multiple file', 400, 'no file where uploaded', null))
        }
        console.log('111' , req.files.images)
        console.log('222' , req.files)

        let uploadedData = req.files.images
        
        let filePathes: string[] = [];
        if (uploadedData.length){
            for (let i = 0; i < uploadedData.length; i++) {
                console.log('uploaded file is >>>>>>>' , uploadedData[i].name)
                let uploadPath = `/home/oceanCdn/contents/` + uploadedData[i].name;
                try {
                    const upload = await uploadedData[i].mv(uploadPath)
                    console.log('upload resault' , upload)
                    filePathes.push(`${process.env.CDNADDRESS}/content/` + uploadedData[i].name)
                    console.log( 'filePath', filePathes)
                } catch (error) {
                    console.log(error)
                }
            }
        }else{
                console.log('uploaded file is >>>>>>>' , uploadedData.name)
                let uploadPath = `/home/oceanCdn/contents/` + uploadedData.name;
                try {
                    const upload = await uploadedData.mv(uploadPath)
                    console.log('upload resault' , upload)
                    filePathes.push(`${process.env.CDNADDRESS}/content/` + uploadedData.name)
                    console.log( 'filePath', filePathes)
                } catch (error) {
                    console.log(error)
                }
        }
        if (filePathes.length) {
            return next(new response(req, res, 'upload multiple files', 200, null, { pathes: filePathes }))
        } else {
            console.log('upload resault' , filePathes)
            return next(new response(req, res, 'upload multiple files', 500, 'somethings went wrong', null))
        }
    }


    async uploadProfile(req: any, res: any, next: any) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new response(req, res, 'upload multiple file', 400, 'no file where uploaded', null))
        }

        let uploadedData = req.files.profile;
        console.log('upload profile data' , uploadedData)
        let filePathe;
        let uploadPath = `/home/oceanCdn/profile/${req.params.userId}/` + uploadedData.name;
        try {
            await uploadedData.mv(uploadPath)
            filePathe = `${process.env.CDNADDRESS}/profile/${req.params.userId}/${uploadedData.name}`
            console.log('file path' , filePathe)
        } catch (error) {
            console.log(error)
        }
        return next(new response(req, res, 'upload multiple files', 200, null, { pathes: filePathe }))
    }
}