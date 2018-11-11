function checkCashRegister(price, cash, cid) {
    let giveChange = {
       status: '',
       change: []
   }
   let changeGiven = [
   ["PENNY", 0],
   ["NICKEL", 0],
   ["DIME", 0],
   ["QUARTER", 0],
   ["ONE", 0],
   ["FIVE", 0],
   ["TEN", 0],
   ["TWENTY", 0],
   ["ONE HUNDRED", 0]
]
   let transaction = ((Math.abs(cash)) - (Math.abs(price)))

   const onHand = cid.map( value => {
       let total = 0;
       const amount = value.slice(value.indexOf(",")).map(value => parseFloat(value))
       amount.forEach(item => total += item)
       return total
   }).reduce((a,b) => a+b, 0).toFixed(2)

   
   if(transaction > onHand){
       giveChange.status = "INSUFFICIENT_FUNDS"
       giveChange.change = []
       
   }  
    else if(transaction == onHand) {
       giveChange.status = "CLOSED"
       giveChange.change = cid;
       
   } else {
     let counter = 0
       while(transaction > 0.001){
           while (transaction > 100 && cid[8][1] > 0 ){
               transaction -= 100
               cid[8][1] -= 100
               changeGiven[8][1] += 100
           }
           while (transaction > 20 && cid[7][1] > 0){
               transaction -=20
               cid[7][1] -= 20
               changeGiven[7][1] +=20
           }
           while (transaction > 10 && cid[6][1] > 0){
               transaction -=10
               cid[6][1] -= 10
               changeGiven[6][1] +=10
           }
           while (transaction > 5 && cid[5][1] > 0){
               transaction -=5
               cid[5][1] -= 5
               changeGiven[5][1] +=5
           }
           while (transaction > 1 && cid[4][1] > 0){
               transaction -=1
               cid[4][1] -= 1
               changeGiven[4][1] +=1
           }
           while (transaction >= 0.25 && cid[3][1] > 0){
               transaction -= 0.25
               cid[3][1] -= 0.25
               changeGiven[3][1] += 0.25
           }
           while (transaction >= 0.10 && cid[2][1] > 0){
               transaction -=0.10
               cid[2][1] -= 0.10
               changeGiven[2][1] += 0.10
           }
           while (transaction >= 0.05 && cid[1][1] > 0){
               transaction -=0.05
               cid[1][1] -= 0.05
               changeGiven[1][1] += 0.05
           }
           while (transaction >= 0.001 && cid[0][1] > 0.0){
               
               transaction -=0.01
               cid[0][1] -= 0.01
               counter +=1
               changeGiven[0][1] = counter/100
           }

       } 
       let canReturn = changeGiven.map( value => {
       let total = 0;
       const amount = value.slice(value.indexOf(",")).map(value => parseFloat(value))
       amount.forEach(item => total += item)
       return total
       }).reduce((a,b) => a+b, 0).toFixed(2)
       if(transaction > canReturn) {
         giveChange.status = "INSUFFICIENT_FUNDS"
         giveChange.change = []
       } else if (transaction <= canReturn){
       giveChange.status = "OPEN"
       for(let i=0; i < changeGiven.length; i++ ) {
           if (changeGiven[i][1] > 0.00) {
               giveChange.change.push(changeGiven[i])
           }
       }
       giveChange.change.reverse()
   }
   }

return giveChange

}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))