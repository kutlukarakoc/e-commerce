interface ILabel {
   text: string
   htmlfor: string
}

const Label: React.FC<ILabel> = ({ text, htmlfor }) => {
   return <label htmlFor={htmlfor} className='block text-sm font-medium leading-6 text-gray-700 mb-1.5'>{text}</label>
}

export default Label