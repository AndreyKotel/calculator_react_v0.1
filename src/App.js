import React, {useState} from 'react';
import Button from './Components/Button';



function App() {

            const [display, setDisplay] = useState("0");
            const [prevNumber, setPrevNumber] = useState(null);
            const [operator, setOperator] = useState(null); /* получается есть на оператор два состояния, этот используется для отдельного вывода оператора и числа. ключевой момент что
            происходит обнуление в функции handleNumberClick - setOperator(null), поэтому вынужден был создать второе состояние для оператора чтобы он подлавливался в арифметике.*/
            const [nowOperator, setNowOperator] = useState('') // второй оператор состояния. для handleEqualClick(), чтобы она ловила последний знак. 
            
            

            console.log(prevNumber) // ПРЕДЫДУЩЕЕ ЗНАЧЕНИЕ. по умолчанию null
            console.log(display) // ВВЕДЕННОЕ ЗНАЧЕНИЕ. по умолчанию '0'
            console.log(operator) // ОПЕРАТОР по умолчанию null
            console.log(nowOperator)

            

            
            const handleNumberClick = value => { // ФУНКЦИЯ НАЖАТИЯ НА ЧИСЛО
          
          
                    if (display === '0' || operator ) { // эта логика, чтобы отделить вывод на экран число и оператор и чтобы не прилипал дефолтный 0 к введеному числу
                    setDisplay(value);
                    setOperator(null) //важно. если убрать эту строчку, то после оператора не могу вводить числа нормально больше однозначных, тк не будет видеть разницы между оператором и числом
                    } else {
                    setDisplay(display + value); 
                    }
                           
                      
            }
                                    
            
            const handleOperatorClick = (selectedOperator) => { // ФУНКЦИЯ НАЖАТИЯ НА ОПЕРАТОР
                    
                    setPrevNumber(display) // предыдущее число уходит в отдельный стейт
                    setOperator(selectedOperator);
                    setNowOperator(selectedOperator) //второй стейт для оператора, чтобы ловился оператор в функции арифм.расчетов

                      
              }
              

            const handleDecimalPointClick = (PointClick) => { // ОТДЕЛЬНО ЛОГИКА НА ПЛАВАЮЩУЮ ЗАПЯТУЮ
                    if (!display.includes(PointClick)) {
                    setDisplay(display + PointClick);
                    }
              }



              const handleEqualClick = () => { // ФУНКЦИЯ РЕАЛИЗАЦИИ АРИФМЕТИЧЕСКИХ ДЕЙСТВИЙ. КНОПКА '='.


                    if (display != '0'){
                      setDisplay(calculate())
                      
                    }
              }


              const calculate = () => {
                const num1 = parseFloat(prevNumber); 
                const num2 = parseFloat(display);
                if (nowOperator === '+'){
                  return((num1 + num2).toString())
                }
                if (nowOperator === '-'){
                  return((num1 - num2).toString())
                }
                if (nowOperator === '*'){
                  return((num1 * num2).toString())
                }
                if (nowOperator === '/'){
                  return((num1 / num2).toString())
                }
              }
            

            const createDigits = () => { // ГЕНЕРАЦИЯ КНОПОК С ЧИСЛАМИ
                 const digit = [];

                  for(let i = 1; i < 10; i++ ){
                      digit.push(
                      <button onClick={() => handleNumberClick(i.toString())} > {i} </button>
                     )
                  }
                  
                      return digit 
            }
            
         
            /*________________________________________________________________________________________ */

                    return (
                      <div className="App">
                        <div className="calculator">

                            <div className="display">
                          
                              {display || "0"} {/*стартовый ноль на экране */}
                            </div>

                                      <div className="operators">
                                      
                                        <button onClick={() => handleOperatorClick('/')}>/ 
                                        </button>
                                        <button onClick={() => handleOperatorClick('*')}>*
                                        </button>
                                        <button onClick={() => handleOperatorClick('+')}>+
                                        </button>
                                        <button onClick={() => handleOperatorClick('-')}>-
                                        </button>
                                      {/* <button> DEL </button> */}

                                    </div>

                            <div className="digits">
                              {createDigits()} 
                              <button onClick={() => handleNumberClick('0')}>0</button>
                              <button onClick={() => handleDecimalPointClick('.')}>.</button>
                             <button onClick={handleEqualClick}>=</button> 

                     
              
                      </div>


                    </div>
                                            
                    </div>
                        
                      
                    );




}

export default App;

/*


на экран ничего нет потому что реакт не понимает что в каком то
компоненты произошли изменения. для этого надо явно сообщить
где изменяем значение. 
при изменении состояния компонента реакт понимает что произошли изменения
и перерисовывет компонент */





