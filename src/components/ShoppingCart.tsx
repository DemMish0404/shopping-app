import { Offcanvas, OffcanvasHeader, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import storeItems from '../data/storeItems.json'
import { priceFormatterFunction } from "../utilities/priceFormatterFunction";

type ShoppingCartProps = {
   isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps){
   const {closeCart, cartItems} = useShoppingCart()


   return(
      <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <Stack gap={3}>
               {cartItems.map((item)=> (<CartItem {...item}></CartItem>) )}
               <div className="ms-auto fw-bold fs-5">
                  Total:{' '}
                  {priceFormatterFunction(cartItems.reduce((accum, product)=> {
                     const fullProductInfo = storeItems.find((item)=> item.id === product.id)
                     
                     return accum + (fullProductInfo?.price || 0) * product.quantity
                  },0))}
               </div>
            </Stack>
         </Offcanvas.Body>
      </Offcanvas>
   )
}