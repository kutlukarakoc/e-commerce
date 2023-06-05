import { useFirestore } from './useFirestore'
import { IProduct } from '../types/productsTypes'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppSelector } from '../store/hooks'
import { useAppDispatch } from '../store/hooks'
import { setToWishlist } from '../store/features/wishlist'

interface IWishlist {
   handleWishlist: (product?: IProduct, type?: string) => Promise<IProduct[]>;
   wishlist: IProduct[];
   wishlistLoading: boolean;
}

// custom hook for handling the wishlist data and logic
export const useWishlist = (): IWishlist => {

   const dispatch = useAppDispatch()

   const { user } = useAppSelector(state => state.auth)

   // keep track of wishlist products and loading status
   const [wishlist, setWishlist] = useState<IProduct[]>([])
   const [wishlistLoading, setWishlistLoading] = useState<boolean>(false)

   // get states and methods from use firestore custom hook   
   const { setItem, getItem } = useFirestore()

   // function for fetching the wishlist data
   const getWishlist = useCallback(async () => {
      setWishlistLoading(true);
      if (user?.uid) {
         const { products }: any = await getItem('wishlist', user.uid);
         setWishlist(products || []);
         dispatch(setToWishlist(products || []));
      }
      setWishlistLoading(false);
   }, [user, dispatch, setWishlist]);

   // get wishlist initially
   useEffect(() => {
      getWishlist()
   }, [])

   const handleWishlist = async (product?: IProduct, type?: string) => {
      if (user?.uid) {
         const { products }: any = await getItem('wishlist', user.uid)

         // if no product is provided, return the current wishlist
         if (!product) {
            setWishlist(products || [])
            dispatch(setToWishlist(products || []))
            return products
         }

         // if type is toggle, add or remove the product from the wishlist
         // if product is already in list, remove, else add
         if (type === 'toggle') {
            const isProductAdded = products.find((prod: IProduct) => prod.id === product.id)
            if (isProductAdded) {
               const filteredProducts = products.filter((prod: IProduct) => prod.id !== product.id)
               await setItem('wishlist', user.uid, { products: filteredProducts })
               dispatch(setToWishlist(filteredProducts || []))
               setWishlist(filteredProducts)
               return filteredProducts
            }

            const newProducts = [...products, product]
            await setItem('wishlist', user.uid, { products: newProducts })
            dispatch(setToWishlist(newProducts || []))
            setWishlist(newProducts)
            return newProducts
         }

         // if type is delete, remove the product from the wishlist
         if (type === 'delete') {
            const filteredProducts = products.filter((prod: IProduct) => prod.id !== product.id)
            await setItem('wishlist', user.uid, { products: filteredProducts })
            dispatch(setToWishlist(filteredProducts || []))
            setWishlist(filteredProducts)
            return filteredProducts
         }
      }
   }

   // memoize the handleWishlist function to prevent unnecessary re-renders
   // memoize the returned object to prevent unnecessary re-renders
   return useMemo(() => ({ handleWishlist, wishlist, wishlistLoading }), [handleWishlist, wishlist, wishlistLoading]);
}
