let screenResult = document.querySelector('.screen-text')
let padKeys = document.querySelectorAll('.pad-key')
let currentResult = '0'
let mathFunc = {
    left: '0',
    right: '0',
    oper: '0'
}


padKeys.forEach((targ) => {
    let specialKeys = ['keyR', 'keyD', 'keyE']
    let funcKeys = ['keyX', 'keyA', 'keyN', 'keyM']
    let funcVals = ['+','-','/','*']

    targ.addEventListener('click', (e) => {
        if(!specialKeys.includes(e.currentTarget.id)){ 
            if(e.currentTarget.id == 'keyP'){
                if(!currentResult.includes('.')) {
                    if(funcVals.includes(currentResult[currentResult.length-1])) {
                        currentResult += '0'+e.currentTarget.dataset['value']
                    } else {
                        currentResult += e.currentTarget.dataset['value']
                    }
                } else {
                    if(funcVals.some(k => currentResult.includes(k) && currentResult.includes('.'))) {
                        let op = funcVals.filter(fltr =>{ if(currentResult.includes(fltr)) return fltr})
                        if(currentResult.lastIndexOf('.') < currentResult.indexOf(op)) {
                            if(funcVals.includes(currentResult[currentResult.length-1])) {
                                currentResult += '0'+e.currentTarget.dataset['value']
                            } else {
                                currentResult += e.currentTarget.dataset['value']
                            }
                        }
                    }
                }
            } else if (funcKeys.includes(e.currentTarget.id)) { 
                if(currentResult != '0'){
                    if(!funcVals.includes(currentResult[currentResult.length-1]) && currentResult[currentResult.length-1] != '.'){
                        funcVals.filter((f) => { currentResult.toString().includes(f)
                            return( currentResult = eval(currentResult) )
                        })
                        currentResult += e.currentTarget.dataset['value']

                    } else {
                        currentResult = currentResult.replace(currentResult[currentResult.length-1], e.currentTarget.dataset['value'])
                    }
                }
            } else {
                currentResult == '0' ? currentResult = e.currentTarget.dataset['value'] : currentResult+=e.currentTarget.dataset['value']
            }
        }else {
            if(e.currentTarget.id == 'keyD') { // if Delete key pressed check delete the last digit if length greater than 1 or else set to 0
                currentResult.length > 1 ? currentResult = currentResult.slice(0,-1) : currentResult = '0'
            }
            if(e.currentTarget.id == 'keyR') { // Reset to 0 if reset key pressed
                currentResult = '0'
            }
            if(e.currentTarget.id == 'keyE') { // Return result on Equal press
                if(isNaN(Number(currentResult[currentResult.length-1]))) currentResult = currentResult.slice(0,-1)
                currentResult = eval(currentResult)
            }
        }
        screenResult.innerText = currentResult.toLocaleString();

    })
})
