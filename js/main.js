 document.addEventListener('DOMContentLoaded',function(){
    let btns = document.querySelectorAll('button');
    let display = document.querySelector('#display')
    const saved = localStorage.getItem('calculatorValue')

    display.value = saved ? saved : '0';

    function saveTolocalStore(){
        localStorage.setItem('calculatorValue', display.value)
    }

    function updateDisplay(value){
        display.value = value
        saveTolocalStore();
    }

    function displayValue (){
        //display.value = '0'

        updateDisplay('0')
    }
   
    function isOperator(char){
        return 'x÷+-'.includes(char)
    }

    
    function calculateResult(){

        if(!stopStartAndEnd()){
            return;
        }

        try{
          let result =  eval(display.value.replace(/÷/g, '/').replace(/x/g, '*'))

          //display.value = Number(result).toFixed(3).replace()
          updateDisplay(Number(result).toFixed(3).replace(/\.?0+$/, ''))

        }catch{
            display.value = 'Error'
        }
        saveTolocalStore()
    }

    function deleteLastChar(){

        let updated =  display.value.slice(0,-1);

        if(updated === ''){
          updated = '0'  
        } 

        display.value = updated

        saveTolocalStore()

    }

    
    function stopStartAndEnd() {
        const value = display.value;
        const lastChar = value.slice(-1);
        const firstChar = value.charAt(0);
    
        const invalidLastChars = ['÷', '-', '+', 'x', '.', '(', '%'];
        const validStartChars = ['+', '-'];
    
        // Check if the first character is an operator and ensure it's not an invalid first character
        if (invalidLastChars.includes(lastChar) || (firstChar === '' || (invalidLastChars.includes(firstChar) && !validStartChars.includes(firstChar)))) {
            return false;
        } else {
            return true;
        }
    }
    
    
    function appendValue(buttonValue){
        
        if(isOperator(buttonValue) && isOperator(display.value.slice(-1))){
            return;
        }
        if(buttonValue === '.'){
            const parts = display.value.split(/[+\-x÷]/)
            const lastNumber = parts[parts.length - 1]
            const current = display.value
            //const newExpr = current + buttonValue

            if(isOperator(buttonValue) && isOperator(current.slice(-1)))return;
            
            if(lastNumber.includes('.')){
                return
            }
            else if(isOperator(display.value.slice(-1))){

                display.value += '0.';
            }else{
                display.value += '.'
            }
            return;
        }
        
        display.value === '0' ? display.value = buttonValue : display.value += buttonValue

        saveTolocalStore()
        stopStartAndEnd()
        
        //display.value === '0' ? updateDisplay(buttonValue) : updateDisplay(displayValeu + buttonValue);
    
    }

    document.addEventListener('keydown',function(e){
        const keyborder = {
        'Enter':calculateResult,
        'Backspace':deleteLastChar,
        'c':displayValue,
        '1':()=> appendValue('1'),
        '2':()=> appendValue('2'),
        '3':()=> appendValue('3'),
        '4':()=> appendValue('4'),
        '5':()=> appendValue('5'),
        '6':()=> appendValue('6'),
        '7':()=> appendValue('7'),
        '8':()=> appendValue('8'),
        '9':()=> appendValue('9'),
        '0':()=> appendValue('0'),
         //Math Sign
         '+':()=> appendValue('+'),
         '-':()=> appendValue('-'),
         '*':()=> appendValue('x'),
         '/':()=> appendValue('÷'),
         '.':()=> appendValue('.')
        }
        const action = keyborder[e.key]
        if(action){
          action() 
          
          e.preventDefault()
        } 
    })

     for (let i of btns){
 
        i.addEventListener('click',function(){

           const buttonValue = this.value

           console.log(buttonValue)

            switch(buttonValue){
                case 'C':
                  displayValue()
                  break
                case '=':
                    calculateResult()
                   break
                default:
                  appendValue(buttonValue)
            }
        })
    } 
 });


 







 
 