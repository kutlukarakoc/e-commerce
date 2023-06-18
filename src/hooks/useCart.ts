import { useFirestore } from './useFirestore'
import { IProduct } from '../types/productsTypes'
import { ICart } from '../types/cartTypes'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { manageCart } from '../store/features/cart'

interface IUseCart {
   handleCart: (type: string, product: IProduct) => void
   changeQuantity: (product: IProduct | ICart, quantity: number) => void
   getCart: () => void
   cartLoading: boolean
   cartError: string | null
}

export const useCart = (): IUseCart => {

   const dispatch = useAppDispatch()

   // getting user from redux store
   const { user } = useAppSelector(state => state.auth)
   // keep track of loading and error status
   const [cartLoading, setCartLoading] = useState<boolean>(false)
   const [cartError, setCartError] = useState<string | null>(null)

   // get states and methods from use firestore custom hook   
   const { setItem, getItem } = useFirestore()

   // get cart initially
   useEffect(() => {
      getCart()
   }, [])

   // function for fetching the cart data
   const getCart = async () => {
      setCartLoading(true)
      if (user?.uid) {
         try {
            const { items }: any = await getItem('cart', user.uid)
            dispatch(manageCart(items || []))
         } catch (error) {
            setCartError('An error has occurred, please try again.')
         }
      }
      setCartLoading(false)
   }

   const handleCart = async (type: string, product: IProduct | ICart) => {
      if (user?.uid) {
         try {
            // set loading state true when adding to cart process starts
            setCartLoading(true)
            // get latest cart from db
            const { items }: any = await getItem('cart', user.uid)
            // if type is add, add or remove the product from the cart
            // if product is already in the list, remove it, else add it
            if (type === 'add') {
               const addedProduct = items.find((prod: IProduct | ICart) => prod.id === product.id)
               if (addedProduct) {
                  addedProduct.quantity += 1
                  dispatch(manageCart(items))
                  await setItem('cart', user.uid, { items: [...items] })
               } else {
                  const newItems = [...items, { ...product, quantity: 1 }]
                  dispatch(manageCart(newItems))
                  await setItem('cart', user.uid, { items: [...newItems] })
               }
            }
            // if type is delete, remove the product from the cart
            if (type === 'delete') {
               const filteredItems = items.filter((prod: ICart) => prod.id !== product.id)
               dispatch(manageCart(filteredItems || []))
               await setItem('cart', user.uid, { items: [...filteredItems] })
            }
            // set loading state false when adding to cart process ends
            setCartLoading(false)
         } catch (error) {
            setCartError('An error has occurred, please try again.')
         }
         setCartLoading(false)
      }
   }

   const changeQuantity = async (product: IProduct | ICart, quantity: number) => {
      if (user?.uid) {
         try {
            // set loading state true when adding to cart process starts
            setCartLoading(true)
            // get latest cart from db
            const { items }: any = await getItem('cart', user.uid)
            // find product and update it's quantity
            const selectedProduct = items.find((prod: IProduct | ICart) => prod.id === product.id)
            selectedProduct.quantity = quantity
            dispatch(manageCart(items))
            await setItem('cart', user.uid, { items: [...items] })
            // set loading state false when changing to cart process ends
            setCartLoading(false)
         } catch (error) {
            setCartError('An error has occurred, please try again.')
         }
         setCartLoading(false)
      }
   }

   // memoize the handleCart function to prevent unnecessary re-renders
   // memoize the returned object to prevent unnecessary re-renders
   return { handleCart, getCart, changeQuantity, cartLoading, cartError }
}
