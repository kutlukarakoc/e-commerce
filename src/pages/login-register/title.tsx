interface ITitle {
   text: string
}

const Title: React.FC<ITitle> = ({text}) => {
   return (
         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
               {text}
            </h2>
         </div>
   )
}

export default Title