document.addEventListener('DOMContentLoaded',function(){
    let btns = document.querySelectorAll('button');
    let display = document.querySelector('#display')
    
    function displayValeu (){
        display.value = '0'
    }
    displayValeu()

    function isOperator(char){
        return 'x÷+-'.includes(char)
    }

    function calculateResult(){
        try{
          let result =  eval(display.value.replace(/÷/g, '/').replace(/x/g, '*'))

          display.value = Number(result).toFixed(3).replace(/\.?0+$/, '')
        }catch{
            display.value = 'Error'
        }
    }

    function deleteLastChar(){
        display.value = display.value.slice(0,-1);

        if(display.value === ''){

            display.value = '0';
        }
    }
    deleteLastChar()

    function appendValue(buttonValue){
        
        if(isOperator(buttonValue) && isOperator(display.value.slice(-1))){
            return;
        }
            
       
        if(buttonValue === '.'){
            const parts = display.value.split(/[+\-x÷]/)
            const lastNumber = parts[parts.length - 1]

            if(lastNumber.includes('.')){
                return
            }
            
            if(display.value === '0'){
                display.value = '0.'
            }
                
            else if(isOperator(display.value.slice(-1))){

                display.value += '0.';
            }else{
                display.value += '.'
            }
            return;
        }
            
        display.value === '0' ? display.value = buttonValue : display.value += buttonValue
    
    }

    document.addEventListener('keydown',function(e){
        const keyborder = {
        'Enter':calculateResult,
        'Backspace':deleteLastChar,
        'c':displayValeu,
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

            switch(buttonValue){
                case 'C':
                  displayValeu()
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


 







 
 