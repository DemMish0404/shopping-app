import { Button, Card } from "react-bootstrap";
import { priceFormatterFunction } from "../utilities/priceFormatterFunction";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreCardComponentProps = {
   name: string,
   price: number,
   imgUrl: string,
   id: number
}

export function StoreCardComponent({name, price, imgUrl,id}:StoreCardComponentProps ){

   //берем из нашего контекста переменные 
  const {  getCurrentItemQuantity,increaseCurrentItemQuantity, decreaseCurrentItemQuantity, removeFromCart} = useShoppingCart()


   const quantityOfTheCurrentItem = getCurrentItemQuantity(id)


   return (
      <Card className="h-100">
         <Card.Img variant="top" src={imgUrl} height="200px"
         style={{ objectFit: "cover" }} >
         </Card.Img>
         <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
                <h6 className="store-card__title fs-2 " aria-label="наименование товара">{name}</h6>
                <span className="store-card__price ms-2 text-muted" aria-label="цена товара">{priceFormatterFunction(price)}</span>
            </Card.Title>
            { quantityOfTheCurrentItem === 0 ? (
               <Button onClick={()=> increaseCurrentItemQuantity(id)} className="w-100">+ Add the item to your cart</Button>
               ) : (
                  <div className="d-flex align-items-center flex-column" style={{ gap: "1rem" }} >
                     <div className="d-flex " style={{ gap: ".5rem" }}>
                         <Button onClick={()=> decreaseCurrentItemQuantity(id)}>-</Button> 
                         <div>
                           <span className="fs-3">{quantityOfTheCurrentItem}</span> in cart
                        </div>
                         <Button onClick={()=> increaseCurrentItemQuantity(id)} >+</Button>
                     </div>
                     <Button onClick={()=> removeFromCart(id)} className="" variant="danger" >Remove</Button>
                  </div>
               ) }
         </Card.Body>

      </Card>
   )
}