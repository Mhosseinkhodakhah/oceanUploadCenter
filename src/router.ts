import { Router } from "express";
import controller from "./controller";


const router = Router();

const uploadController = new controller()

router.post('/upload-multi-photo/:contentId' , uploadController.uploadMultiPhoto)

export default router;