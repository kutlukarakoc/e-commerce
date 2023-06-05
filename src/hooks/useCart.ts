import { useFirestore } from './useFirestore'
import { IProduct } from '../types/productsTypes'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppSelector } from '../store/hooks'
import { useAppDispatch } from '../store/hooks'
import { setToCart } from '../store/features/cart'

interface ICart {
   handleCart: (product?: IProduct, quantity?: number, type?: string) => Promise<IProduct[]>;
   cart: IProduct[];
   cartLoading: boolean;
}

// custom hook for handling the cart data and logic
export const useCart = (): ICart => {

   const dispatch = useAppDispatch()

   const { user } = useAppSelector(state => state.auth)

   // keep track of cart items and loading status
   const [cart, setCart] = useState<IProduct[]>([])
   const [cartLoading, setCartLoading] = useState<boolean>(false)

   // get states and methods from use firestore custom hook   
   const { setItem, getItem } = useFirestore()

   // function for fetching the cart data
   const getCart = useCallback(async () => {
      setCartLoading(true);
      if (user?.uid) {
         const { items }: any = await getItem('cart', user.uid);
         setCart(items || []);
         dispatch(setToCart(items || []));
      }
      setCartLoading(false);
   }, [user, dispatch, setCart]);

   // get cart initially
   useEffect(() => {
      getCart()
   }, [])

   const handleCart = async (product?: IProduct, quantity?: number, type?: string) => {
      if (user?.uid) {
         const { items }: any = await getItem('cart', user.uid)

         // if no product is provided, return the current cart
         if (!product) {
            setCart(items || [])
            dispatch(setToCart(items || []))
            return items
         }

         // if type is add, add or remove the product from the cart
         // if product is already in list, remove, else add
         if (type === 'add') {
            const addedProduct = items.find((prod: IProduct) => prod.id === product.id)
            if (addedProduct) {
               addedProduct.quantity += quantity
               await setItem('cart', user.uid, { items })
               dispatch(setToCart(items || []))
               setCart(items)
               return items
            }

            const newItems = [...items, { ...product, quantity }]
            await setItem('cart', user.uid, { items: newItems })
            dispatch(setToCart(newItems || []))
            setCart(newItems)
            return newItems
         }

         // if type is delete, remove the product from the cart
         if (type === 'delete') {
            const filteredItems = items.filter((prod: IProduct) => prod.id !== product.id)
            await setItem('cart', user.uid, { items: filteredItems })
            dispatch(setToCart(filteredItems || []))
            setCart(filteredItems)
            return filteredItems
         }
      }
   }

   // memoize the handleCart function to prevent unnecessary re-renders
   // memoize the returned object to prevent unnecessary re-renders
   return useMemo(() => ({ handleCart, cart, cartLoading }), [handleCart, cart, cartLoading]);
}
