import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';

export const multerConfig = {
  storage: diskStorage({
    // destination: './public/avatars', // single storage for all uploaded files
    destination: (req, file, cb) => {
      const userId = req.params.id;

      const uploadPath = `./public/avatars/${userId}`; // created storage with ID folder name
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};
