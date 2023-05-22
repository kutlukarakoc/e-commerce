interface IDivider {
   styles?: string
}

const Divider: React.FC<IDivider> = ({styles}) => {
   return <div className={'border-t border-solid border-gray-500 w-full h-1 my-5 ' + styles}></div>
}

export default Divider