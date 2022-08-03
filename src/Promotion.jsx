import React from 'react'
import Square from './Square'
import {move} from './Game'
const promotionPieces= ['r','n','b','q']


export default function PromotionComponet({promotion:{from,to,color}}) {
  return (
    <div className='board'>
        {promotionPieces.map((pie, ind)=>(
            <div key={ind} className='promote-square'>
                <Square black={ind % 3===0}>
                    <div className="piece-promotion" onClick={()=>move(from, to, pie)}>
                        <img src={require(`./assets/${pie}_${color}`)} alt="" 
                        className='piece'
                        />
                    </div>
                </Square>
            </div>
        ))}
    </div>
  )
}
