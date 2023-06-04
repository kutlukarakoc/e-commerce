import { useFirestore } from './useFirestore'
import { IProduct } from '../types/productsTypes'


export const useWishlist = () => {
   // get states and methods from use firestore custom hook   
   const { setItem, getItem } = useFirestore()

   const handleWishlist = async (uid: string, product?: IProduct, type?: string) => {

      // get current wish list if exists, if not generate empty array
      const { products }: any = await getItem('wishlist', uid)

      if (!product) {
         return products
      }

      // if product is already added to wishlist, remove, else add
      if(type === 'toggle') {
         const isProductAdded = products.find((prod: IProduct) => prod.id === product.id)
         if(isProductAdded) {
            const filteredProducts = products.filter((prod: IProduct) => prod.id !== product.id)
            await setItem('wishlist', uid, {products: filteredProducts})
            return filteredProducts
         }

         const newProducts = [...products, product]
         await setItem('wishlist', uid, {products: newProducts})
         return newProducts
      }

   }

   return handleWishlist
}