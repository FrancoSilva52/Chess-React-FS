import {Chess} from 'chess.js'
import {BehaviorSubject} from 'rxjs'


const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame(){
    const guardado = localStorage.getItem('juegoGuardado')
    if(guardado){
        chess.load(guardado)
    }
    updateGame()
}

export function restartGame(){
   chess.reset()
   updateGame() 
}

export function handleMove(from , to){
    const promotions = chess.moves({verbose:true}).filter(p => p.promotion)
     //todos los movimientos posibles .moves
     //un filtro para todos las coronaciones(promotion: ingles) posibles
     if(promotions.some(p =>`${p.from}:${p.to}`===`${from}:${to}`)){ //condicion si llega al final del tablero 
        //para ser coronado
        const promoPending = {from, to, color: promotions[0].color}
        updateGame(promoPending)
     }
     const{promoPending}= gameSubject.getValue()

     if(!promoPending){
         move(from,to)
     }
   
}

export function move(from, to, promotion){
    let tempMove = {from, to}
    if(promotion){
        tempMove.promotion = promotion
    }
   const legalMove = chess.move(tempMove)

   if(legalMove){
        updateGame()
   }
}

function updateGame(promoPending){
    const gameOver = chess.game_over()
    const newGame ={
        board: chess.board(),
        promoPending,
        gameOver,
        result: gameOver? gameResult(): null
    }
    localStorage.setItem('juegoGuardado', chess.fen())

    gameSubject.next(newGame)
}

function gameResult(){
    if(chess.in_checkmate()){
        const winner =  chess.turn() === 'w' ? 'BLACK' : 'WHITHE'
        return `CHECKMATE - WINNER - ${winner}`
    }else if(chess.in_draw()){
        let reason = '50 - Moves - Rules'
        if(chess.in_stalemate()){
            reason = 'Stealment'
        }else if(chess.in_threefold_repetition()){
            reason= 'Repeticion'
        }else if(chess.insufficient_material()){
            reason = 'Insufficient Material'
        }
        return `DRAWN - ${reason}`
    }else{
        return 'Error en algun lado'
    }
}