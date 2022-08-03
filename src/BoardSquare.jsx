import React from 'react'
import Pieces from './Pieces'
import Square from './Square'
import {useDrop} from 'react-dnd'
import {gameSubject, handleMove} from './Game'
import { useEffect, useState } from 'react'
import PromotionComponet from './Promotion'


export default function BoardSquare({piece, black, position}) {
  const [promotion, setPromotion] = useState(null)
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      const [fromPosition] = item.id.split('_') 
      handleMove(fromPosition,position)},
  },)
  useEffect(() => {
    const subscribe = gameSubject.subscribe(({promoPending}) =>
      promoPending && promoPending.to === position 
      ? setPromotion(promoPending)
      : setPromotion(null)
    )
    
    return() => subscribe.unsubscribe();
  }, [position])
  

  return (
    <div className='board-square' ref={drop}>
        <Square black={black}>
          {promotion ? (
          <PromotionComponet promotion={promotion}/>
          ) : piece ? (
          <Pieces piece={piece} position={position}/>
          ) : null
          }
           {/*Preguntara si la pieza es promovida sino seguira con las piezas normales
             */}
        </Square>
    </div>
  )
}
