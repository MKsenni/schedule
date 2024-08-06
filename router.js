import {Router} from "express";
import ScheduleController from "./ScheduleController.js";
import multer from "multer";
import FileService from "./fileService.js";

const upload = multer({ storage: FileService.storage() })

const router = new Router();

router.post('/schedule', upload.single('photo'), await ScheduleController.create);
router.get('/schedule', await ScheduleController.getAll);
router.get('/schedule/:id', await ScheduleController.getOne);
router.delete('/schedule/:id', await ScheduleController.delete);
router.patch('/schedule/:id', await ScheduleController.update);

export default router;
