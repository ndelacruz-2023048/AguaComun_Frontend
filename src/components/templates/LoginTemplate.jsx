import { useForm } from 'react-hook-form'
import AguaComunLogin from '../../assets/AguaComunLogin.webp';
import { useLogin } from '../../hooks/useLogin'

export const LoginTemplate = () => {
  const { login } = useLogin()
  const { register, handleSubmit, formState: {errors}, reset} = useForm(
    {
      mode: 'onChange'
    }
  )

  const onSubmit = async(data) => {
    console.log(data);
    await login(data)
    reset()
  }

  return (
    <div className='flex h-screen w-screen relative'>
        <img className='object-[30%_50%] object-cover' src={AguaComunLogin} alt="" />
        <h1 className='absolute text-[#919d4f]/90 text-6xl top-[0%] right-[2%] font-ConcertOne'>AguaComun</h1>
        <div className='flex flex-col bg-white absolute p-5 w-[25%] rounded-xl top-1/3 right-[10%]'>
            <p className='text-lg mb-4 font-bold'>Login Now</p>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} id='FormLogin'>
                <label htmlFor="" className='text-gray-500 text-[15px]'>Username or email</label>

                <input type="text" placeholder="user@example.com" className='focus:outline-none focus:border-1 focus:border-gray-400 border-gray-300 border-1 p-2 rounded' 
                  {...register('userLogin', {
                    required: {
                      value: true,
                      message: 'Usuario o email es obligatorio',
                    }
                  })}
                />
                {errors.userLogin && <span className="text-red-500 text-sm">{errors.userLogin.message}</span>}

                <label htmlFor="" className='text-gray-500 text-[15px]'>Password</label>

                <input type="password" 
                  placeholder="password" 
                  className='focus:outline-none focus:border-1 focus:border-gray-400 border-gray-300 border-1 p-2 rounded'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La contraseña es obligatoria',
                    }
                  })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                <div className='flex w-full gap-5'>
                    <button type="submit" form='FormLogin' className='bg-[#10521e] text-white w-1/2 p-2 rounded hover:bg-[#175210da]'>Login now</button>
                    <button className='border-1 border-[#50a82d] w-1/2 p-2  text-[#50a82d] rounded hover:font-bold'>Register</button>
                </div>
            </form>
        </div>
    </div>
  )
}
