import * as React from 'react';


import { defineStepper } from '@stepperize/react';
import { CommunityCollaborationForm1 } from './stepperize/CommunityCollaborationForm1';
import { CommunityCollaborationForm2 } from './stepperize/CommunityCollaborationForm2';
import { CommunityCollaborationForm3 } from './stepperize/CommunityCollaborationForm3';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useCommunityCollaboration } from '../../../stores/communityCollaborationStore';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useSocket } from '../../../hooks/useSocket';

const { useStepper, steps, utils } = defineStepper(
  {
    id: 'shipping',
    title: 'Shipping',
    description: 'Enter your shipping details',
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Enter your payment details',
  },
  { id: 'complete', title: 'Complete', description: 'Checkout complete' }
);

export const CommunityCollaborationModal = () => {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);
  const socket = useSocket()

  const methodsForm = useForm({
    defaultValues: {
      rangeDateCollaboration: [] 
    }
  })
  const {handleSubmit} = methodsForm

  const {setIsModalCommunityCollaborationOpen,createActivityCollaboration} = useCommunityCollaboration()
  const handleClickCloseModal = () => {
    setIsModalCommunityCollaborationOpen()
  }

  /*Validacion del boton de next del stepperize */
  const handleClickNextResult = (data)=>{
    console.log(data)
    stepper.next()
  }

  const handleClickNextValidate = async() => {
    handleSubmit(handleClickNextResult)()
  }

  /**Validacion de los botones de los pasos del stepperize */
  const handleClickAnyStepResult = (id)=>(data)=>{
    console.log(data)
    stepper.goTo(id)
  }
  
  const handleClickAnyStepValidate = (id)=>{
    handleSubmit(handleClickAnyStepResult(id))()
  }
  /*Guardar la actividad de colaboracion */
  const handleClickSaveResult =async (data)=>{
    
      const fechaInicio = dayjs(data.rangeDateCollaboration[0]).format("YYYY-MM-DDTHH:mm:ss")
      const fechaFin = dayjs(data.rangeDateCollaboration[1]).format("YYYY-MM-DDTHH:mm:ss")
      const HoraInicio = dayjs(data.rangeHourCollaboration[0]).format("HH:mm:ss")
      const HoraFin = dayjs(data.rangeHourCollaboration[1]).format("HH:mm:ss")
      const durationTurn = dayjs(data.durationTurn).format("HH:mm:ss")
      console.log(durationTurn);
      
    const newActivityCollaboration = {
      activityName:data?.name,
      description:data?.description,
      startDate:fechaInicio,
      endDate:fechaFin, 
      startTime:HoraInicio,
      endTime:HoraFin,
      address:data?.direction,
      shiftDuration:durationTurn,
      community:data?.communityId,
    }
    await createActivityCollaboration(newActivityCollaboration)
    socket.emit("new-activity-collaboration",newActivityCollaboration)
    setIsModalCommunityCollaborationOpen()
  }

  const handleClickSaveValidate = () => {
    handleSubmit(handleClickSaveResult)()
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-1000 backdrop-blur-md'>
      <div className="space-y-6 p-6 border border-[#338826] rounded-lg w-[40%]  h-[50%] z-1000 bg-white">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-[#338826]">New Collaboration Activity</h2>
          <div className="flex items-center gap-2">
            <Icon icon="ic:round-close" className='text-[25px] text-[#338826]' onClick={handleClickCloseModal}/>
          </div>
        </div>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <div key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? 'bg-[#338826]' : 'bg-[#aad0a4]'}
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className={`flex size-10  items-center justify-center rounded-full ${index <= currentIndex ? 'bg-[#338826] text-white' : 'bg-[#aad0a4]'}`}
                    onClick={() => handleClickAnyStepValidate(step.id)}
                  >
                    {index + 1}
                  </button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                
              </div>
            ))}
          </ol>
        </nav>
        <FormProvider {...methodsForm}>
          <div className="space-y-4">
            {stepper.switch({
              shipping: () => <CommunityCollaborationForm1 />,
              payment: () => <CommunityCollaborationForm2 />,
              complete: () => <CommunityCollaborationForm3 />,
            })}
            {!stepper.isLast ? (
              <div className="flex justify-end gap-4">
                <button
                  className='bg-[#338826] text-white px-4 py-2 rounded-md hover:bg-[#338826]/80'
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}
                >
                  Back
                </button>
                <button className='bg-[#338826] text-white px-4 py-2 rounded-md hover:bg-[#338826]/80' onClick={handleClickNextValidate}>
                  {stepper.isLast ? 'Complete' : 'Next'}
                </button>
              </div>
            ) : (
              <div className='flex justify-center'>
                <button className='bg-[#ffffff] border-[#338826] border-1 text-[#338826] px-4 py-2 rounded-md hover:bg-[#e8ffe4]/80 w-[40%]' onClick={handleClickSaveValidate}>Save</button>            
              </div>
            )}
          </div>
        </FormProvider>
      </div>
    </div>
  );
}


