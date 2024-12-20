import { Router } from "express";
import controller from "./controller";


const router = Router();

const uploadController = new controller()

router.post('/upload-multi-photo/:contentId' , uploadController.uploadMultiPhoto)

router.post('/upload-profile/:userId' , uploadController.uploadProfile)

export default router;  