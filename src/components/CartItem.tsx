import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/storeItems.json'
import { Stack, Button } from 'react-bootstrap'
import { priceFormatterFunction } from '../utilities/priceFormatterFunction'

type CartItemProps = {
   id: number,
   quantity: number
}

function CartItem({id, quantity}: CartItemProps) {
   const {removeFromCart} = useShoppingCart()
   const item = storeItems.find(item => item.id === id )

   if( item == null ) return null // если товар не был найден значит его не существует 

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center '>
      <img src={item.imgUrl} alt={item.name} style={{width: '125px', height: '75px', objectFit: 'cover'}} />
      <div className='me-auto'>
         <div>
            {item.name}{' '}
            { quantity > 1 && <span className='text-muted' style={{fontSize: '0.65rem',}}>x{quantity}</span> }
         </div>
         <div className='text-muted' style={{fontSize: '.75rem',}}>{priceFormatterFunction(item.price)}</div>
         
      </div>
      <div>{priceFormatterFunction(item.price * quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={()=> removeFromCart(item.id)}>&times;</Button>
    </Stack>
  )
}

export default CartItem