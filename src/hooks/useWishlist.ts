import { useFirestore } from './useFirestore'
import { IProduct } from '../types/productsTypes'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import { useAppDispatch } from '../store/hooks'
import { manageWishlist } from '../store/features/wishlist'

interface IWishlist {
   handleWishlist: (product?: IProduct, type?: string) => Promise<IProduct[]>;
   getWishlist: () => void
   wishlistLoading: boolean;
   wishlistError: string | null
}

// custom hook for handling the wishlist data and logic
export const useWishlist = (): IWishlist => {

   const dispatch = useAppDispatch()

   const { user } = useAppSelector(state => state.auth)

   // keep track of wishlist loading and error status
   const [wishlistLoading, setWishlistLoading] = useState<boolean>(false)
   const [wishlistError, setWishlistError] = useState<string | null>(null)

   // get states and methods from use firestore custom hook   
   const { setItem, getItem } = useFirestore()

   // get wishlist initially
   useEffect(() => {
      getWishlist()
   }, [])

   // function for fetching the wishlist data
   const getWishlist = async () => {
      setWishlistLoading(true);
      if (user?.uid) {
         try {
            const { products }: any = await getItem('wishlist', user.uid);
            dispatch(manageWishlist(products || []));
         } catch (error) {
            setWishlistError('An error has occurred, please try again.')
         }
      }
      setWishlistLoading(false);
   }

   const handleWishlist = async (product?: IProduct, type?: string) => {
      if (user?.uid) {
         const { products }: any = await getItem('wishlist', user.uid)

         // if no product is provided, return the current wishlist
         if (!product) {
            dispatch(manageWishlist(products || []))
            return products
         }

         // if type is toggle, add or remove the product from the wishlist
         // if product is already in list, remove, else add
         if (type === 'toggle') {
            const isProductAdded = products.find((prod: IProduct) => prod.id === product.id)
            if (isProductAdded) {
               const filteredProducts = products.filter((prod: IProduct) => prod.id !== product.id)
               await setItem('wishlist', user.uid, { products: filteredProducts })
               dispatch(manageWishlist(filteredProducts || []))
               return filteredProducts
            }

            const newProducts = [...products, product]
            await setItem('wishlist', user.uid, { products: newProducts })
            dispatch(manageWishlist(newProducts || []))
            return newProducts
         }

         // if type is delete, remove the product from the wishlist
         if (type === 'delete') {
            const filteredProducts = products.filter((prod: IProduct) => prod.id !== product.id)
            await setItem('wishlist', user.uid, { products: filteredProducts })
            dispatch(manageWishlist(filteredProducts || []))
            return filteredProducts
         }
      }
   }

   return { handleWishlist, getWishlist, wishlistLoading, wishlistError }
}
