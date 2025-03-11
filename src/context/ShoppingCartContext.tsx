import {  createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ReactNode массив коллекция html элементов
type ShoppingCartContextProviderProps = {
   children: ReactNode 
}

type CartItem = {
   id: number
   quantity: number
}

type ShoppingCartContext = {
   openCart: ()=> void
   closeCart: ()=> void
   allCartQuantity: number
   getCurrentItemQuantity: (id: number) => number
   increaseCurrentItemQuantity: (id: number)=> void
   decreaseCurrentItemQuantity: (id: number)=> void
   removeFromCart: (id: number) => void
   cartItems: CartItem[]
}




const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
   return useContext(ShoppingCartContext)
 }

//* создаем провайдер для контекста чтобы знать в каких рамках действует этот контекст
export function ShoppingCartContextProvider({children}:ShoppingCartContextProviderProps ){
   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[])
   const [isCartOpen , setIsCarOpen] = useState(false)

   const allCartQuantity = cartItems.reduce((quantity, item)=> item.quantity + quantity , 0)

   const openCart = ()=> setIsCarOpen(true)
   const closeCart = ()=> setIsCarOpen(false)

   function getCurrentItemQuantity(id:number): number{
      const currentCartItem = cartItems.find( item =>{ 
         if(item.id === id){
            return item
         }
         })

      //если нет у товара количества значит ставим по-умолчанию ноль
      return currentCartItem?.quantity || 0
   }

   function increaseCurrentItemQuantity(id: number): void{
      const currentCartItem = cartItems.find( item =>{ 
         if(item.id === id){
            return item
         }
         })

       //то есть если еще нет в корзине - добавляем  
      if(currentCartItem == null){
         setCartItems([...cartItems, {id , quantity: 1}])
      }else{
         // тому кому прибавляем мы ему как раз таки и прибавляем кол-во , а остальные попросту не трогаем
         const changedCartItemsArray = cartItems.map(cartElem=> {
            if(cartElem.id === id) {
               return {...cartElem, quantity: cartElem.quantity + 1}
            } else {
               return cartElem
            }
         })

         setCartItems(changedCartItemsArray)
      }  
      
      
   }

   function decreaseCurrentItemQuantity(id: number): void{
      const currentCartItem = cartItems.find( item =>{ 
         if(item.id === id){
            return item
         }
         })

      //то есть если равно одному то надо удалять (так как зачем нам нужен нулевое количество в корзине )
      if(currentCartItem?.quantity === 1){
         const filteredArr = cartItems.filter(elem => elem.id !== id)
         setCartItems(filteredArr)
      }else{
         // тому кому убавляем мы ему как раз таки и убавляем кол-во , а остальные попросту не трогаем
         const changedCartItemsArray = cartItems.map(cartElem=> {
            if(cartElem.id === id) {
               return {...cartElem, quantity: cartElem.quantity - 1}
            } else {
               return cartElem
            }
         })

         setCartItems(changedCartItemsArray)
      }  
      
      
   }

   function removeFromCart(id: number){
      // удаляем из нашей корзины
      const filteredArr = cartItems.filter(elem => elem.id !== id)
      setCartItems(filteredArr)
   }
   


   return(
      <ShoppingCartContext.Provider value={{
         increaseCurrentItemQuantity,
         decreaseCurrentItemQuantity,
         removeFromCart,
         getCurrentItemQuantity,
         cartItems,
         allCartQuantity,
         openCart,
         closeCart,
         
         
      }}>
         {children}
         <ShoppingCart isOpen = {isCartOpen}></ShoppingCart>
      </ShoppingCartContext.Provider>
   )

}