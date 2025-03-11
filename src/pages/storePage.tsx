import { Col, Row } from 'react-bootstrap'
import storeItems from '../data/storeItems.json'
import {StoreCardComponent} from '../components/StoreCardComponent'



console.log(storeItems)
export function StorePage() {
   return <>
      <h1>store page</h1>
      <Row md={2} xs={1} large={3} className='g-3'>
         {storeItems.map((elem, index, arr)=><Col key={elem.id}>
            <StoreCardComponent {...elem}/>
            </Col> )}
         
      </Row>
   </>
}