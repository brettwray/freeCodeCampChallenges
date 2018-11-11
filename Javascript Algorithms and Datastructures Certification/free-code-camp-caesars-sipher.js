function rot13(str) { // LBH QVQ VG!
    const alphabet= "abcdefghijklmnopqrstuvwxyz"
    const myString = []
    for (let s of str.toLowerCase()) {
      let letters = alphabet.indexOf(s)
      if (letters != -1 && letters < 13){
        let newLetter = alphabet.charAt(letters+13)
        myString.push(newLetter)
        
      }
      if (letters !=-1 && letters > 13) {
        let newLetter = alphabet.charAt(letters-13)
        myString.push(newLetter)
      }
      if (letters !=-1 && letters === 13){
        let newLetter = alphabet.charAt(0)
        myString.push(newLetter)
      }
      if (letters === -1) {
        let specialIndex = []
        let element = s
        let findSpecial = str.indexOf(s)
        if (findSpecial !=-1) {
          specialIndex.push(findSpecial)
          findSpecial = str.indexOf(element, findSpecial+1)
          
        }
        specialIndex.forEach(item => {
          let specialChar = str.charAt(item)
          myString.push(specialChar)
        })
      }
    }
    return myString.join('').toUpperCase() ;
  }
  //As the code runs it is replacing the already replaced values with the opposite value....
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")