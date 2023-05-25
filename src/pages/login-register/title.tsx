interface ITitle {
   text: string
}

const Title: React.FC<ITitle> = ({text}) => {
   return (
         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl sm:text-3xl font-semibold text-gray-700">
               {text}
            </h2>
         </div>
   )
}

export default Title