import './style.css'

interface IRating {
   rate: number
}

const Rating: React.FC<IRating> = ({ rate }) => {
   return <i data-star={rate} className={`h-full text-left inline-block relative before:block before:content-["★★★★★"] before:text-gray-400 after:whitespace-nowrap after:absolute after:left-0 after:top-0 after:content-["★★★★★"] after:text-orange-400 after:overflow-hidden`}></i>
}

export default Rating