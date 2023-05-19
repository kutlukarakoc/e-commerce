interface IRating {
   rate: number
}

const Rating: React.FC<IRating> = ({ rate }) => {

   const afterWidth = rate * 20

   return <i data-star={rate} className={`text-left inline-block relative before:block before:content-["★★★★★"] before:text-gray-400 after:whitespace-nowrap after:absolute after:left-0 after:top-0 after:content-["★★★★★"] after:w-[${afterWidth}%] after:text-orange-400 after:overflow-hidden h-full`}></i>
}

export default Rating