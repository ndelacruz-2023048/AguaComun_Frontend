
import AguaComunLogin from '../../assets/AguaComunLogin.webp';

export const LoginTemplate = () => {
  return (
    <div className='flex h-screen w-screen relative'>
        <img className='object-[30%_50%] object-cover' src={AguaComunLogin} alt="" />
        <h1 className='absolute text-[#919d4f]/90 text-6xl top-[0%] right-[2%] font-ConcertOne'>AguaComun</h1>
        <div className='flex flex-col bg-white absolute p-5 w-[25%] rounded-xl top-1/3 right-[10%]'>
            <p className='text-lg mb-4 font-bold'>Login Now</p>
            <form className='flex flex-col gap-4'>
                <label htmlFor="" className='text-gray-500 text-[15px]'>Username or email</label>
                <input type="text" placeholder="user@example.com" className='focus:outline-none focus:border-1 focus:border-gray-400 border-gray-300 border-1 p-2 rounded' />
                <input type="password" placeholder="123456789" className='focus:outline-none focus:border-1 focus:border-gray-400 border-gray-300 border-1 p-2 rounded' />
                <div className='flex w-full gap-5'>
                    <button type="submit" className='bg-[#10521e] text-white w-1/2 p-2 rounded hover:bg-[#175210da]'>Login now</button>
                    <button className='border-1 border-[#50a82d] w-1/2 p-2  text-[#50a82d] rounded hover:font-bold'>Register</button>
                </div>
            </form>
        </div>
    </div>
  )
}
