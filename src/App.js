import React, { useState } from "react";

function App() {
  const [display, setDisplay] = useState(0);
  const [prevNumber, setPrevNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [nowOperator, setNowOperator] = useState("");
  const [data, setData] = useState([]); // состояние. входной массив
  console.log("массив входных данных", data);

  /* В общем, массив входных данных data я вывел в консоль для наглядности. также num1 и num2 вывел в консоль для нагоядности
   В массив data летят все кнопки. 
  Далее есть функция middleWare, в которой вся суть. Массив оптимизируется и вычисляется результат.

  Далее идея в том чтобы я после вычислительного результата очищал массив data, чтобы он не рос бесконечно, и в очищенный data
  я вставлял полученный результат и дальше уже всё по кругу.
  ПРОБЛЕМА в том что при ситуации когда заполнен num1 и oper
  то есть когда я фактически еще не нажал второе число ->  ввел 1 + 'здесь жду второе число'. И когда я нажимаю второе число то он мне очищает data и сразу обновляет data на результат.
 А мне надо сначала заполнить num2 любой длины числом и только потом очищать data и вставлять результат. 
 А так получается что я получаю однозначное число в num2 и длинне число в num2 я вставить не могу
 В общем нагляднее всего это по консоли увидеть
  


   */

  const middleWare = (data) => {
    let num1 = []; // получаю первое число
    let num2 = []; // получаю второе число
    let oper = null; // оператор

    /*
     */

    for (let i = 0; i < data.length; i++) {
      if (oper == null && typeof data[i] === "number") {
        // num1
        num1.push(data[i]);
      }
      if (
        data[i] === "+" ||
        data[i] === "-" ||
        data[i] === "/" ||
        data[i] === "*"
      ) {
        // oper
        oper = data[i];
      }
      if (oper !== null && num1.length !== 0 && typeof data[i] === "number") {
        // num2
        num2.push(data[i]);
      }

      if (data[i] === "." && !num1.includes(".") && num1.length !== 0) {
        num1.push(".");
      }
      if (data[i] === "." && !num2.includes(".") && num2.length !== 0) {
        num2.push(".");
      }

      /*
              if (data[i] === '.' && !num1.includes('.') && !num1.includes('0.')){
                num1.push('0.')
              } 
              */
    }

    let firstNumOut = num1.join(""); // это получаю переменную. в консоль логе все ок.
    console.log(firstNumOut);

    let secondNumOut = num2.join("");
    console.log(secondNumOut);

    let hiddenResult = null;

    if (oper === "+") {
      hiddenResult = +firstNumOut + +secondNumOut;
    }
    if (oper === "-") {
      hiddenResult = +firstNumOut - +secondNumOut;
    }
    if (oper === "*") {
      hiddenResult = +firstNumOut * +secondNumOut;
    }
    if (oper === "/") {
      hiddenResult = +firstNumOut / +secondNumOut;
    }

    return [firstNumOut, secondNumOut, hiddenResult, num1, num2, oper];
  };

  const handleNumberClick = (value) => {
    // при нажатии на кнопки все уходит в массив data.
    const newData = [...data, value];
    setData([...newData]);
    let [firstNumOut, secondNumOut, hiddenResult, num1, num2, oper] =
      middleWare(newData);

    if (secondNumOut === "") {
      setDisplay(firstNumOut);
    }
    if (secondNumOut !== "") {
      setDisplay(secondNumOut);
    }
  };

  const handleOperatorClick = (selectedOperator) => {
    const newData = [...data, selectedOperator];

    let [firstNumOut, secondNumOut, hiddenResult, num1, num2, oper] =
      middleWare(newData); // !!! firstNumOut, secondNumOut здесь не должны быть удалены

    if (secondNumOut) {
      const newData = handleEqualClick("=");
      setData([newData, selectedOperator]);
      return;
    }
    /*
              if (data.length === 0) {
                    setData(newData);
                    setDisplay(selectedOperator);
              }
*/

    if (data.length !== 0 && selectedOperator !== data[data.length - 1]) {
      setData(newData);
      setDisplay(selectedOperator);
    }

    /*  
             
              if (data.includes('*') || data.includes('/') || data.includes('+') || data.includes('-') ) {
                setData([hiddenResult])
                  // setDisplay(hiddenResult)
                            
               
              }

              */
  };

  /*
это ненужно
          if(selectedOperator !== data[data.length - 1] ){ 
                                                          
                const newData = [...data, selectedOperator];
                setData(newData);
                //const [operOut] = joinOperands(newData);



                  setDisplay(data[data.length - 1]); 
                
                                         
                
          }
*/

  const handleDecimalPointClick = (PointClick) => {};

  const resetData = (res) => {
    setOperator(null);
    setData([res]);
    setPrevNumber(null);
    setNowOperator(null);
  };

  const handleEqualClick = (equalArg) => {
    const newData = [...data, equalArg];
    setDisplay(middleWare(newData)[2]);
    resetData(middleWare(newData)[2]);

    return middleWare(newData)[2];
  };

  const calculate = () => {
    const num1 = parseFloat(prevNumber);
    const num2 = parseFloat(display);
    if (nowOperator === "+") {
      return (num1 + num2).toString();
    }
    if (nowOperator === "-") {
      return (num1 - num2).toString();
    }
    if (nowOperator === "*") {
      return (num1 * num2).toString();
    }
    if (nowOperator === "/") {
      return (num1 / num2).toString();
    }
  };

  const createDigits = () => {
    // ГЕНЕРАЦИЯ КНОПОК С ЧИСЛАМИ
    const digit = [];

    for (let i = 1; i < 10; i++) {
      digit.push(<button onClick={() => handleNumberClick(i)}> {i} </button>);
    }

    return digit;
  };

  React.useEffect(() => {
    console.log("current data: ", data);
  }, [data]);

  /*________________________________________________________________________________________ */

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {display} {/*стартовый ноль на экране */}
        </div>

        <div className="operators">
          <button onClick={() => handleOperatorClick("/")}>/</button>
          <button onClick={() => handleOperatorClick("*")}>*</button>
          <button onClick={() => handleOperatorClick("+")}>+</button>
          <button onClick={() => handleOperatorClick("-")}>-</button>
          {/* <button> DEL </button> */}
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => handleNumberClick("0")}>0</button>
          <button onClick={() => handleNumberClick(".")}>.</button>
          <button onClick={() => handleEqualClick("=")}>=</button>
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
