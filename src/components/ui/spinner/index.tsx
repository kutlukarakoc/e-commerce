const Spinner: React.FC = () => {
   return (
      <div className='w-6 h-6'>
         <div className="w-6 h-6 rounded-full absolute border-[3px] border-solid border-gray-500"></div>
         <div className="w-6 h-6 rounded-full animate-spin absolute border-[3px] border-solid border-gray-300 border-t-transparent"></div>
      </div>
   )
}

export default Spinner
