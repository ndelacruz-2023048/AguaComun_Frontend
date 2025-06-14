// components/ModalReport.jsx
import React from 'react';
import { Icon } from '@iconify/react'
import { defineStepper } from '@stepperize/react';
import { useForm } from 'react-hook-form';
import FileUploadForm from '../../molecules/UploadFiles';
import { Separator } from '../../molecules/Separator';

const { useStepper, steps, utils } = defineStepper(
    {
        id: 'basic',
        title: 'Información Básica',
        description: 'Ingresa la información básica del reporte',
    },
    {
        id: 'attachments',
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
    const methods = useForm(
        {
            mode: 'onChange'
        }
    )
    // const { handleSubmit } = methods;
    const stepper = useStepper();

    const currentIndex = utils.getIndex(stepper.current.id);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-7 w-[650px] relative">
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
                <div className="space-y-6" id='FormRegister'>
                    {stepper.switch({
                        basic: () => <BasicInfoComponent methods={methods} />,
                        attachments: () => <AttachmentsComponent methods={methods} />,
                        complete: () => <ConfirmationComponent methods={methods} />,
                    })}
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
                            onClick={stepper.next}
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

                        <button
                            type="button"
                            onClick={() => {
                            methods.reset(); // Limpia los datos del formulario
                            stepper.reset(); // Vuelve al primer paso
                            }}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Cancelar y Reiniciar
                        </button>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
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
                    {...register('issueTitle', { required: 'Issue Title is required' })}
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
                    {...register('issueCategory')}
                    placeholder="Select category"
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium text-start text-[#338826]">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
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
    const { register, formState: { errors } } = methods;
    const handleImageUpload = (imageUrl) => {
        methods.setValue('uploadPhoto', imageUrl);
    }

    return (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <label htmlFor="uploadPhoto" className="text-sm font-medium text-start text-[#338826]">
                    Upload Photo
                </label>
                <FileUploadForm onImageUpload={handleImageUpload}/>
            </div>

            <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium text-start text-[#338826]">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    {...register('date', { required: 'Date is required' })}
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
                {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium text-start text-[#338826]">
                    Time
                </label>
                <input
                    type="time"
                    id="time"
                    {...register('time', { required: 'Time is required' })}
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                />
                {errors.time && (
                    <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <label htmlFor="urgencyLevel" className="text-sm font-medium text-start text-[#338826]">
                    Urgency Level
                </label>
                <select
                    id="urgencyLevel"
                    {...register('urgencyLevel', { required: 'Urgency Level is required' })}
                    className="w-full bg-[#E7F5E7] rounded-xl p-2"
                >
                    <option value="">Select urgency level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
        <div><strong>Date:</strong> {data.date || '-'}</div>
        <div><strong>Time:</strong> {data.time || '-'}</div>
        <div><strong>Urgency Level:</strong> {data.urgencyLevel || '-'}</div>
        <div><strong>Suggested Solutions:</strong> {data.suggestedSolutions || '-'}</div>
        </div>
    );
};

export default ModalReport;