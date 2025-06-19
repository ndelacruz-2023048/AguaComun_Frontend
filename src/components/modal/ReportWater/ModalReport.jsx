// components/ModalReport.jsx
import React from 'react';
import { Icon } from '@iconify/react'
import { defineStepper } from '@stepperize/react';
import { useForm } from 'react-hook-form';
import FileUploadForm from '../../molecules/UploadFiles';
import { Separator } from '../../molecules/Separator';
import { useCommunity } from '../../../hooks/useCommunity'
import { useReport } from '../../../hooks/useReport'
import { useSocket } from '../../../hooks/useSocket'
import { motion, AnimatePresence } from 'framer-motion';

const { useStepper, steps, utils } = defineStepper(
    {
        id: 'basic',
        title: 'Información Básica',
        description: 'Ingresa la información básica del reporte',
    },
    {
        id: 'tachments',
        title: 'Datos del problema',
        description: 'Ingresa los datos del problema',
    },
    { 
        id: 'complete', 
        title: 'Confirmación', 
        description: 'Revisa y confirma tu reporte' 
    }
)

const ModalReport = ({ isOpen, onClose }) => {
    const { createReport: nuevo } = useReport()

    const methods = useForm(
        {
            mode: 'onChange'
        }
    )
    const { handleSubmit } = methods;
    const stepper = useStepper();
    const socket = useSocket()

    const currentIndex = utils.getIndex(stepper.current.id);
    if (!isOpen) return null;

    const onSubmit = async (data) => {
        if (stepper.isLast) {
        console.log('Registro completo:', data);

            try {
                const success = await nuevo(data, socket); // Intenta registrar el usuario

                if (success) {
                    methods.reset()
                    stepper.reset(); // Reinicia el stepper
                } else {
                    console.error('Por favor corrige los errores e inténtalo nuevamente');
                }
            } catch (error) {
                // Maneja errores generales
                console.error('Error al registrar:', error);
            }
        } else {
            console.log('Datos del paso actual:', data);
            stepper.next();
        }
    }

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-7 w-[700px] relative">
                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between">
                            <h2 className="text-lg font-medium">Create New Water Report</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Paso {currentIndex + 1} de {steps.length}
                                </span>
                                <div />
                            </div>
                        </div>
                        <button onClick={onClose} className="absolute top-7 right-1 text-gray-500 hover:text-gray-800 text-xl font-bold">
                            <Icon icon="line-md:close-small" width="24" height="24" />
                        </button>
                    </div>
                    <nav aria-label="Checkout Steps" className="group my-4">
                        <ol
                            className="flex items-center justify-between gap-2"
                            aria-orientation="horizontal"
                        >
                        {stepper.all.map((step, index, array) => (
                            <React.Fragment key={step.id}>
                            <li className="flex items-center gap-4 flex-shrink-0">
                                <button
                                    type="button"
                                    aria-current={
                                        stepper.current.id === step.id ? 'step' : undefined
                                    }
                                    aria-posinset={index + 1}
                                    aria-setsize={steps.length}
                                    aria-selected={stepper.current.id === step.id}
                                    className={`flex size-10 items-center justify-center rounded-full ${
                                        index < currentIndex
                                        ? 'bg-green-500'
                                        : index === currentIndex
                                        ? 'bg-green-500'
                                        : 'bg-green-200'
                                    }`}
                                    onClick={() => stepper.goTo(step.id)}
                                >
                                    {index + 1}
                                </button>
                                <span className="text-sm font-medium">{step.title}</span>
                            </li>
                            {index < array.length - 1 && (
                                <Separator
                                className={`flex-1 ${
                                    index < currentIndex ? 'bg-primary' : 'bg-muted'
                                }`}
                                />
                            )}
                            </React.Fragment>
                        ))}
                        </ol>
                    </nav>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id='FormRegister'>
                        <AnimatePresence mode="wait">
                            {stepper.switch({
                                basic: () => (
                                <motion.div
                                    key="basic"
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ type: "tween" }}
                                    className="space-y-6"
                                >
                                    <BasicInfoComponent methods={methods} />
                                </motion.div>
                                ),
                                tachments: () => (
                                <motion.div
                                    key="attachments"
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ type: "tween" }}
                                    className="space-y-6"
                                >
                                    <AttachmentsComponent methods={methods} />
                                </motion.div>
                                ),
                                complete: () => (
                                <motion.div
                                    key="complete"
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ type: "tween" }}
                                    className="space-y-6"
                                >
                                    <ConfirmationComponent methods={methods} />
                                </motion.div>
                                )
                            })}
                        </AnimatePresence>
                        <div className="space-y-4">
                        {!stepper.isLast ? (
                            <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={stepper.prev}
                                disabled={stepper.isFirst}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                            >
                                Next
                            </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                            <button
                                type="submit"
                                form='FormRegister'
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Enviar Registro
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => {
                                    stepper.reset()
                                    methods.reset()
                                }}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Cancelar y Reiniciar
                            </motion.button>
                            </div>
                        )}
                        </div>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

const BasicInfoComponent = ({ methods }) => {
    const { register, formState: { errors } } = methods;

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <label htmlFor="issueTitle" className="text-sm font-medium text-start text-[#338826]">
                    Issue Title
                </label>
                <input
                    id="issueTitle"
                    {...register('issueTitle', { 
                        required: {
                            value: true,
                            message: 'Issue Title is required' 
                        }
                    })}
                    placeholder="Briefly describe the issue"
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
                {errors.issueTitle && (
                    <p className="text-red-500 text-xs mt-1">{errors.issueTitle.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <label htmlFor="issueCategory" className="text-sm font-medium text-start text-[#338826]">
                    Issue Category
                </label>
                <input
                    id="issueCategory"
                    {...register('issueCategory', { 
                        required: {
                            value: true,
                            message: 'Issue Category is required' 
                        }
                    })}
                    placeholder="Briefly describe the issue"
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
                {errors.issueCategory && (
                    <p className="text-red-500 text-xs mt-1">{errors.issueCategory.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium text-start text-[#338826]">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description', { 
                        required: {
                            value: true,
                            message: 'Description is required' 
                        }
                    })}
                    placeholder="Provide a detailed description of the issue"
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
            </div>
        </div>
    )
}

const AttachmentsComponent = ({ methods }) => {

    const { community } = useCommunity()

    const { register, formState: { errors } } = methods;

    const handleImageUpload = (imageUrl) => {
        const currentImages = methods.getValues('uploadPhoto') || [];
        methods.setValue('uploadPhoto', [...currentImages, imageUrl]);
    }

    return (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <label htmlFor="uploadPhoto" className="text-sm font-medium text-start text-[#338826]">
                    Upload Photo
                </label>
                <FileUploadForm onImageUpload={handleImageUpload}/>
            </div>

            <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">Imágenes subidas:</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {methods.watch('uploadPhoto')?.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`uploaded-${index}`}
                            className="w-full h-24 object-cover rounded-md"
                        />
                    ))}
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="community" className="text-sm font-medium text-start text-[#338826]">
                    Community
                </label>
                <select
                    id="community"
                    {...register('community', { 
                        required: {
                            value: true,
                            message: 'Community is required' 
                        }
                    })}
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                >
                    <option value="">Select to Community</option>
                    { community.length===0  ? (
                        <option value="">Non Community</option>
                        
                    ) : (
                        community.map((comunity, index) => (
                            <option key={index} value={`${comunity._id}`}>{comunity.name}</option>
                        ))
                    )}
                    
                </select>
                {errors.community && (
                    <p className="text-red-500 text-xs mt-1">{errors.community.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <label htmlFor="urgencyLevel" className="text-sm font-medium text-start text-[#338826]">
                    Urgency Level
                </label>
                <select
                    id="urgencyLevel"
                    {...register('urgencyLevel', { 
                        required: {
                            value: true,
                            message: 'Urgency Level is required' 
                        }
                    })}
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                >
                    <option value="">Select urgency level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                {errors.urgencyLevel && (
                    <p className="text-red-500 text-xs mt-1">{errors.urgencyLevel.message}</p>
                )}
            </div>
        </div>
    );
};

const ConfirmationComponent = ({ methods }) => {
    const { getValues } = methods;
    const data = getValues();

    return (
        <div className="space-y-4 text-left">
            <h3 className="font-bold text-lg">Confirm Your Report:</h3>
            <div><strong>Issue Title:</strong> {data.issueTitle || '-'}</div>
            <div><strong>Description:</strong> {data.description || '-'}</div>
            <div>
                <strong>Images:</strong>
                {Array.isArray(data.uploadPhoto) && data.uploadPhoto.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {data.uploadPhoto.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`confirm-${index}`}
                                className="w-full h-24 object-cover rounded-md"
                            />
                        ))}
                    </div>
                ) : (
                    '-'
                )}
            </div>
            <div><strong>Community:</strong> {data.community || '-'}</div>
            <div><strong>Urgency Level:</strong> {data.urgencyLevel || '-'}</div>
            <div><strong>Suggested Solutions:</strong> {data.suggestedSolutions || 'none'}</div>
        </div>
    );
};

export default ModalReport;