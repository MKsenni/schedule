import * as uuid from 'uuid';
import multer from "multer";

class FileService {
  storage() {
      return multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'static')
        },
        filename: function (req, file, cb) {
          const fileName = `${uuid.v4()}.jpg`;
          cb(null, fileName)
        }
      })
  }
}

export default new FileService();
