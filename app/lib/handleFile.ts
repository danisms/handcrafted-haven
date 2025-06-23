import { writeFile, mkdir, unlink } from "fs/promises";
import path from 'path';
import { existsSync } from "fs";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// UPLOAD FILE
export async function UPLOADFILE(
    formData: FormData,
    file_input_name: string,
    save_file_path: string,
    allowed_types: string[],
    max_size: number
) {
    const file = formData.get(file_input_name) as File;

    if (!file) {
        return { success: false, error: 'No file uploaded' };
    }

    const fileType = file.type;
    const fileSize = file.size;
    const originalName = file.name;
    const filename = `${Date.now()}-${path.basename(originalName)}`;

    if (!allowed_types.includes(fileType)) {
        return { success: false, error: 'Unsupported file type' };
    }

    if (fileSize > max_size) {
        return { success: false, error: 'File too large' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (process.env.IN_PRODUCTION === 'true') {
        // Upload to Cloudinary in production
        try {
            const result = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: save_file_path }, // you can set a custom Cloudinary folder
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(buffer);
            });

            return {
                success: true,
                url: result.secure_url,
                cloudinary_id: result.public_id,
                type: result.resource_type,
                size: result.bytes,
                name: result.original_filename,
            };
        } catch (err: any) {
            return { success: false, error: err.message || 'Upload failed' };
        }

    } else {
        // Save to local file system in development
        try {
            const directoryPath = path.join(process.cwd(), 'public', save_file_path);
            const filePath = path.join(directoryPath, filename);

            await mkdir(directoryPath, { recursive: true });

            if (existsSync(filePath)) {
                return { success: false, error: 'File already exists' };
            }

            await writeFile(filePath, buffer);

            return {
                success: true,
                url: `/${save_file_path}/${filename}`,
                db_path: path.join(save_file_path, filename),
                type: fileType,
                size: fileSize,
                name: filename,
            };
        } catch (err: any) {
            return { success: false, error: err.message || 'Upload failed' };
        }
    }
}


export async function DELETEFILE(filepath: string) {
    if (!filepath) {
        return { success: false, error: 'File path not provided' };
    }

    if (process.env.IN_PRODUCTION === 'true') {
        // In production — delete from Cloudinary
        try {
            // Cloudinary public_id does not include the extension
            // Example: "images/my-file.jpg" → public_id: "images/my-file"
            const publicId = filepath.replace(/\.[^/.]+$/, ''); // remove file extension

            await cloudinary.uploader.destroy(publicId);

            return { success: true, message: 'Cloudinary file deleted' };
        } catch (err: any) {
            return { success: false, error: err.message || 'Cloudinary deletion failed' };
        }
    } else {
        // In development — delete from local file system
        try {
            const absolutePath = path.join(process.cwd(), 'public', filepath);
            await unlink(absolutePath);
            return { success: true, message: 'Local file deleted' };
        } catch (err: any) {
            return { success: false, error: 'Failed to delete file' };
        }
    }
}