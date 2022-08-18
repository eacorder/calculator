
const button = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.function');
const result = document.querySelector('#result');
const operation = document.querySelector('#operation');

button.forEach((item) => {

    // and for each one we add a 'click' listener
    
    item.addEventListener('click', () => {
        handleValidations(item.value)
           
    });

    
});

function handleValidations(value) {
    if (result.innerHTML == "0" && value !=".") (
        result.innerHTML = ""
    )  
    if ( !result.innerHTML.includes('.') &&  value == "."  ){
        result.innerHTML = result.innerHTML + value;      
    } else if ( value != "." ){
        result.innerHTML = result.innerHTML + value; 
    }
}

window.addEventListener('keydown', handleKeyboardInput)
  
operations.forEach((item) => {

    // and for each one we add a 'click' listener
    
    item.addEventListener('click', () => {
        switch(item.value) {
            case "ce": {
                erase() 
                break ;
            }
            case "ac": {               
                clear()
                break;
            }
            default: {
                preview(result.innerHTML , item.value ) ;     
                break;         
            }
        }  
    });    
});

function erase() {    
    result.innerHTML =  result.innerHTML.slice(0, -1)
    if (result.innerHTML == "") {
        result.innerHTML = 0;
    }
}

function clear() {
    result.innerHTML = 0;
    operation.innerHTML = "";
}



function preview(answer, sign){ 
    let lastOp;
    lastOp = operation.innerHTML.slice(-1);
    if (sign ===  "Enter") sign = "=" 
    if ( operation.innerHTML == "" || operation.innerHTML.slice(-1) == "=" ) {
        operation.innerHTML = answer + " " + sign;
        result.innerHTML = 0;
    }  else if (sign == "="  ) {          
        operation.innerHTML =  operation.innerHTML.slice(0, -1)  +" " + lastOp + " "+ result.innerHTML + " " + "="
        result.innerHTML = operationFunctions( result.innerHTML ,  operation.innerHTML.slice(0, -1) , sign , lastOp).slice(0, -2);  
    }   
    else  {                   
        operation.innerHTML = operationFunctions( result.innerHTML ,  operation.innerHTML.slice(0, -1) , sign , lastOp);
        result.innerHTML = 0
    }   
}

function operationFunctions(first, second, sign ,lastOp )  {     
    switch (lastOp) {
        case "+" : {
            return (Number.parseFloat(first) + Number.parseFloat(second)) + " "  + sign;
            break;
        }
        case "-" : {
            return (Number.parseFloat(second) - Number.parseFloat(first)) + " "  + sign;
            break;
        }
        case "*" : {
            return (Number.parseFloat(first) * Number.parseFloat(second)) + " "  + sign;
            break;
        }
        case "/" : {
            return (Number.parseFloat(second) / Number.parseFloat(first)) + " "  + sign;
            break;
        }
        case "%" : {
            return ((Number.parseFloat(second)/100 ) * Number.parseFloat(first)) + " "  + sign;
            break;
        }
    }  
}

function handleKeyboardInput(e) {
    
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') handleValidations(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '=' || e.key === 'Enter' || e.key === '%') preview(result.innerHTML , e.key );
     if (e.key === 'Backspace') erase();
    if (e.key === 'Escape') clear()
   
  }