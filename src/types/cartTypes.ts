import { IProduct } from './productsTypes'

export interface ICart extends IProduct {
   quantity: number
}