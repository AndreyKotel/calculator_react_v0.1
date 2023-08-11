import React, {useState} from 'react';
import Button from './Components/Button';



function App() {

            const [calc, setCalc] = useState("0");
            const [prevNumber, setPrevNumber] = useState(null);
            const [operator, setOperator] = useState(null); /* получается есть на оператор два состояния, этот используется для отдельного вывода оператора и числа. ключевой момент что
            происходит обнуление в функции handleNumberClick - setOperator(null), поэтому вынужден был создать второе состояние для оператора чтобы он подлавливался в арифметике.*/
            const [nowOp, setNowOp] = useState('') // второй оператор состояния. для handleEqualClick(), чтобы она ловила последний знак. 
            
            

            console.log(prevNumber) // ПРЕДЫДУЩЕЕ ЗНАЧЕНИЕ. по умолчанию null
            console.log(calc) // ВВЕДЕННОЕ ЗНАЧЕНИЕ. по умолчанию '0'
            console.log(operator) // ОПЕРАТОР по умолчанию null
            console.log(nowOp)

            

            
            const handleNumberClick = value => { // ФУНКЦИЯ НАЖАТИЯ НА ЧИСЛО
          
          
                    if (calc === '0' || operator ) { // эта логика, чтобы отделить вывод на экран число и оператор и чтобы не прилипал дефолтный 0 к введеному числу
                    setCalc(value);
                    setOperator(null) //важно. если убрать эту строчку, то после оператора не могу вводить числа нормально больше однозначных, тк не будет видеть разницы между оператором и числом
                    } else {
                    setCalc(calc + value); 
                    }
                           
                      
            }
                                    
            
            const handleOperatorClick = (selectedOperator) => { // ФУНКЦИЯ НАЖАТИЯ НА ОПЕРАТОР
                    
                    setPrevNumber(calc) // предыдущее число уходит в отдельный стейт
                    setOperator(selectedOperator);
                    setNowOp(selectedOperator) //второй стейт для оператора, чтобы ловился оператор в функции арифм.расчетов

                      
              }
              

            const handleDecimalPointClick = (PointClick) => { // ОТДЕЛЬНО ЛОГИКА НА ПЛАВАЮЩУЮ ЗАПЯТУЮ
                    if (!calc.includes(PointClick)) {
                    setCalc(calc + PointClick);
                    }
              }



              const handleEqualClick = () => { // ФУНКЦИЯ РЕАЛИЗАЦИИ АРИФМЕТИЧЕСКИХ ДЕЙСТВИЙ. КНОПКА '='.

                    const num1 = parseFloat(prevNumber); 
                    const num2 = parseFloat(calc);
                    if (nowOp === '+'){
                      setCalc(num1 + num2)
                    }
                    if (nowOp === '-'){
                      setCalc(num1 - num2)
                    }
                    if (nowOp === '*'){
                      setCalc(num1 * num2)
                    }
                    if (nowOp === '/'){
                      setCalc(num1 / num2)
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
                          
                              {calc || "0"} {/*стартовый ноль на экране */}
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





