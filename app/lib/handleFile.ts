import { writeFile, mkdir, unlink } from "fs/promises";
import path from 'path';
import { existsSync } from "fs";


// UPLOAD FILE
export async function UPLOADFILE(formData: FormData, file_input_name: string, save_file_path: string, file_format: string[], max_file_size: number) {
    const file = formData.get(file_input_name) as File;

    // check if file was uploaded
    if (!file) {
        return { success: false, error: 'No file uploaded' };
    }
    // get file values
    const filename = Date.now() + '-' + path.basename(file.name);
    const fileType = file.type;  // mime type
    const fileSize = file.size;  // in bytes

    // check file format
    if (!file_format.includes(fileType)) {
        return { success: false, error: 'Unsupported file type' };
    }

    // check file size
    if (fileSize > max_file_size) {
        return { success: false, error: 'File too large' };
    }

    const directoryPath = path.join(process.cwd(), 'public', save_file_path);
    const filePath = path.join(directoryPath, filename);

    // Create directory if it doesn't exist
    await mkdir(directoryPath, { recursive: true });

    // check if file already exists
    if (existsSync(filePath)) {
        return { success: false, error: 'File already exists' };
    }

    // upload file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    return {
        success: true,
        url: `/${save_file_path}/${filename}`,
        db_path: path.join(save_file_path, filename),
        type: fileType,
        size: fileSize,
        name: filename
    };
}

export async function DELETEFILE(filepath: string) {
    if (!filepath) {
        return { success: false, error: 'File path not provided' };
    }

    const absolutePath = path.join(process.cwd(), 'public', filepath);

    try {
        await unlink(absolutePath);
        return { success: true, message: 'File deleted' };
    } catch (err) {
        return { success: false, error: 'Failed to delete file' };
    }
}