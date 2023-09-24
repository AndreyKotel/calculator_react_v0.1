import React, {useState} from 'react';
import Button from './Components/Button';



function App() {
  const [display, setDisplay] = useState("0");
  const [prevNumber, setPrevNumber] = useState(null);
  const [operator, setOperator] = useState(null); 
    const [nowOperator, setNowOperator] = useState('') 
  
  

    
        const [data, setData] = useState([]); // состояние. входной массив
        console.log(data)

        let num1 = []; // "склеиваю" первое число
        let num2 = [] // "склеиваю" второе число
        let oper = null; // оператор


        for (let i = 0; i < data.length; i++){
          if (oper == null && typeof(data[i]) === 'number'){ // num1
            num1.push(data[i])
          }
          if (data[i] === '+' || data[i] === '-' || data[i] === '/' || data[i] === '*') { // oper
              oper = data[i]
              }
          if (oper !== null && num1.length !== 0 && typeof(data[i] === 'number')){ // num2
            num2.push(data[i])
          }
          // тут дописать надо реализацию рассчета. когда num1,num2 .length !==0 ,  oper !== null, то если элемент !== number и !== '.', то num1 num2 вычисляются и результат обновляется в num1
      
          
        }           


          let firstNumOut = +num1.join('') // это получаю переменную. в консоль логе все ок.
          console.log(firstNumOut)
      
          let secondNumOut = +num2.join('')




        
          const handleNumberClick = value => { // при нажатии на кнопки все уходит в массив data.
          const newData = [...data, value];
          setData(newData);

          setDisplay(firstNumOut) // пытаюсь переменную в стейт вывести на дисплей. первое нажатие пропускает
                              
        }
                          
        
        /* ________________________________________________________________________________________
        все что ниже это старое, вся суть сверху пока */
        
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
                  <button onClick={() => handleNumberClick(i)} > {i} </button>
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





