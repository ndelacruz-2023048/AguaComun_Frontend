import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { toast } from 'sonner';

const FileUploadForm = ({ onImageUpload }) => {
    const preset_name = 'aslkfd';
    const cloud_name = 'dzydnoljd';
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);
        setLoading(true);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });
            const file = await response.json();
            const imageUrl = file.secure_url;
            console.log(file.secure_url);
            onImageUpload(imageUrl)
            setLoading(false);
            toast.success('Imagen subida con exito');
        } catch (e) {
            setLoading(false);
            toast.error('Error al subir la imagen');
            console.error(e);
        }
    }

    return (
        <div className="w-full h-fit flex items-center justify-center bg-content1">
            <div className="file-upload-form">
                <label 
                    htmlFor="file" 
                    className="cursor-pointer bg-default-100 px-50 py-3 rounded-3xl border-2 border-dashed border-[#338826] flex flex-col items-center justify-center gap-2 transition-all hover:bg-default-200"
                >
                <Icon 
                    icon="lucide:upload-cloud" 
                    className="h-12 w-12 text-[#338826] mb-5" 
                />
                <p className="text-[#338826] font-bold">Drag and Drop</p>
                <p className="text-default-600">or</p>
                <span className="bg-default-600 px-5 py-2 rounded-lg text-[#338826] transition-all hover:bg-default-800">
                    Browse file
                </span>
                <input 
                    type="file" 
                    id="file" 
                    className="hidden"
                    onChange={uploadImage} 
                />
                </label>
            </div>
        </div>
    );
}

export default FileUploadForm;