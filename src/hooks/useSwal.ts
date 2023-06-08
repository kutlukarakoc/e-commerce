import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useSwal = () => {

   // swal generator
   const MySwal = withReactContent(Swal)

   const showSwal = (content: JSX.Element, icon: SweetAlertIcon) => {
      return MySwal.fire({
         icon: icon,
         html: content,
         showConfirmButton: false,
         showCloseButton: true,
         customClass: {
            closeButton: 'hover:text-gray-700 shadow-none border-0 outline-0 focus:outline-0 focus:shadow-none'
         }
      })
   }

   const closeSwal = () => {
      MySwal.close()
   }

   return { showSwal, closeSwal }
}