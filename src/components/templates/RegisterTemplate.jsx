import React from 'react'
import Logo from '../../assets/AguaComunLogin.webp'
import { defineStepper } from '@stepperize/react';
import { useForm, FormProvider } from 'react-hook-form';
import { PhoneField } from '../molecules/PhoneField';
import { useRegister } from '../../hooks/useRegister';
import { useNavigate } from 'react-router';

const { useStepper, utils } = defineStepper(
  {
    id: 'personal',
    title: 'Datos Personales',
    description: 'Ingresa tus datos personales',
  },
  {
    id: 'address',
    title: 'Dirección y Contacto',
    description: 'Ingresa tu dirección y contacto',
  },
  {
    id: 'credential',
    title: 'Credenciales',
    description: 'Crea tus credenciales de acceso',
  },
  { 
    id: 'complete', 
    title: 'Confirmar registro', 
    description: 'Revisa y completa tu registro', 
  }
);

export const RegisterTemplate = () => {
  const { register: nuevo } = useRegister()
  const navigate = useNavigate()
  const methods = useForm(
    {
      mode: 'onChange'
    }
  )
  const { handleSubmit } = methods;
  const stepper = useStepper();

  const currentIndex = utils.getIndex(stepper.current.id);

  const onSubmit = async (data) => {
    if (stepper.isLast) {
      console.log('Registro completo:', data);

      try {
        const success = await nuevo(data); // Intenta registrar el usuario

        if (success) {
          stepper.reset(); // Reinicia el stepper
          changeLogin(); // Redirige a /login solo si el registro fue exitoso
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

  const changeLogin = ()=> {
    navigate('/login')
  }
  return (
    <div style={{ backgroundImage: `url(${Logo})` }} className='bg-cover bg-center bg-no-repeat h-screen w-screen flex'>
      <div className='flex flex-col bg-white p-5 w-[25%] rounded-xl right-[20%] top-35 absolute'>
        <h1 className='text-[#919d4f]/90 text-6xl font-ConcertOne mb-4 text-center'>Register</h1>
        <div className='space-y-6 p-6 rounded-lg shadow-lg w-[335px]'>
          <div className="flex items-center gap-4">
            <StepIndicator
              currentStep={currentIndex + 1}
              totalSteps={stepper.all.length}
            />
            <div className="flex flex-col">
              <h2 className="flex-1 text-lg font-bold">
                {stepper.current.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {stepper.current.description}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id='FormRegister'>
            {stepper.switch({
              personal: () => <PersonalComponent methods={methods}/>,
              address: () => <AddresAndContactComponent methods={methods}/>,
              credential: () => <CredentialsComponent methods={methods}/>,
              complete: () => <CompleteComponent methods={methods}/>,
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
          </form>
        </div>
        <a href="" onClick={changeLogin} className='text-center text-green-500 hover:text-green-600 cursor-pointer'>Tienes Cuenta?</a>
      </div>
    </div>
  )
}

// @ts-ignore
const StepIndicator = ({
  currentStep,
  totalSteps,
  size = 80,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const fillPercentage = (currentStep / totalSteps) * 100;
  const dashOffset = circumference - (circumference * fillPercentage) / 100;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <title>Step Indicator</title>
        {/* Círculo externo (contorno completo) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#afcfa6" // Color gris claro para el contorno
          strokeWidth={strokeWidth}
        />
        {/* Círculo interno (progreso) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4ADE80" // Color verde brillante para el progreso
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center rounded-full text-green-500"
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-medium" aria-live="polite">
          {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

const PersonalComponent = ({methods}) => {
  const { register, formState: { errors } } = methods;

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-start">
          Nombre
        </label>
        <input
          id="name"
          placeholder="John Doe"
          className="w-full border rounded p-2"
          {...register('name', { 
            required: {
              value: true,
              message: 'El Nombre es requerido',
            } 
          })}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div className="grid gap-2">
        <label htmlFor="surname" className="text-sm font-medium text-start">
          Apellido
        </label>
        <input
          id="surname"
          {...register('surname', {
            required: {
              value: true,
              message: 'El Apellido es requerido',
            }
          })}
          placeholder="Doe"
          className="w-full border rounded p-2"
        />
        {errors.surname && <span className="text-red-500 text-xs">{errors.surname.message}</span>}
      </div>
    </div>
  );
};

const AddresAndContactComponent = ({ methods }) => {
  const { register, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <div className="grid gap-4">
        {/* Campo de teléfono personalizado */}
        <PhoneField />

        {/* Otros campos */}
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <label htmlFor="department" className="text-sm font-medium text-start">
              Departamento
            </label>
            <input
              id="department"
              {...register('department', { 
                required: {
                  value: true,
                  message: 'El Departamento es requerido',
                } 
              })}
              placeholder="Sacatepéquez"
              className="w-full border rounded p-2"
            />
            {errors.department && (
              <span className="text-red-500 text-xs">{errors.department.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="municipality" className="text-sm font-medium text-start">
              Municipio
            </label>
            <input
              id="municipality"
              {...register('municipality', { 
                required: {
                  value: true,
                  message: 'El Municipio es requerido',
                }
              })}
              placeholder="San Lucas"
              className="w-full border rounded p-2"
            />
            {errors.municipality && (
              <span className="text-red-500 text-xs">{errors.municipality.message}</span>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="zone" className="text-sm font-medium text-start">
            Zona
          </label>
          <input
            id="zone"
            {...register('zone', {
              required: {
                value: true,
                message: 'La Zona es requerida',
              }
            })}
            placeholder="Zona 2"
            className="w-full border rounded p-2"
          />
          {errors.zone && <span className="text-red-500 text-xs">{errors.zone.message}</span>}
        </div>
      </div>
    </FormProvider>
  );
};

const CredentialsComponent = ({methods}) => {
  const { register, formState: { errors } } = methods;

  return (
    <div className="grid gap-4">
      <div className='grid gap-2'>
        <label htmlFor="email" className='text-sm font-medium text-start'>
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          {...register('email', 
            {
              required: {
                value: true,
                message: 'El correo electrónico es obligatorio',
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Formato de correo electrónico inválido'
              }
            }
          )}
          placeholder="Correo Electrónico"
          className="w-full border rounded p-2"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="grid gap-2">
        <label htmlFor="username" className="text-sm font-medium text-start">
          Usuario
        </label>
        <input
          id="username"
          {...register('username', 
              {
                required: {
                  value: true,
                  message: 'El nombre de usuario es obligatorio'
                },
                minLength: {
                  value: 4,
                  message: 'Debe tener al menos 4 caracteres'
                },
                maxLength: {
                  value: 10,
                  message: 'No debe tener más de 10 caracteres'
                }
              }
            )}
          placeholder="johndoe"
          className="w-full border rounded p-2"
        />
        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
      </div>

      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium text-start">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password', 
            {
              required: {
                  value: true,
                  message: 'La contraseña es obligatoria',
              },
              minLength: {
                  value: 4,
                  message: 'Debe tener al menos 4 caracteres'
              },
              validate: {
                  hasUpper: value =>
                    /[A-Z]/.test(value) || "Debe contener al menos una mayúscula",
                  hasLower: value =>
                    /[a-z]/.test(value) || "Debe contener al menos una minúscula",
                  hasNumber: value =>
                    /[0-9]/.test(value) || "Debe contener al menos un número",
              }
            }
          )}
          placeholder="••••••••"
          className="w-full border rounded p-2"
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>
    </div>
  );
};


const CompleteComponent = ({ methods }) => {
  const { getValues } = methods;

  const data = getValues();

  return (
    <div className="space-y-4 text-left">
      <h3 className="font-bold text-lg">Confirma tu información:</h3>

      <div><strong>Nombres:</strong> {data.name}</div>
      <div><strong>Apellidos:</strong> {data.surname || '-'}</div>

      <div><strong>Departamento:</strong> {data.department}</div>
      <div><strong>Municipio:</strong> {data.municipality}</div>
      <div><strong>Zona:</strong> {data.zone || '-'}</div>
      <div><strong>Teléfono:</strong> {data.mobilePhone}</div>

      <div><strong>Usuario:</strong> {data.username}</div>
      <div><strong>Correo Electronico:</strong> {data.email}</div>
    </div>
  );
};