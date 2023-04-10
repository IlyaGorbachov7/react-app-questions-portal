import Data from "bootstrap/js/src/dom/data";
import DatePicker from "react-date-picker";
import React from "react";

export const ANSWER_TYPES = [
    /*0*/'Single line text',
    /*1*/ 'Multiline text',
    /*2*/'Date',
    /*3*/ 'Radio button',
    /*4*/ 'Combo box',
    /*5*/ 'Check box']

export const splitOptionStringToListOptions = (optionsStr) => {
    debugger
    let d = optionsStr.split('\n');
    return d;
}
//
// const dataRetriever = {
//     textArea: "", setTextArea: (d) => {
//
//     }, dateTime: new Data(), setDateTime: (d) => {
//
//     },
//
//     options: [],
//
//     radioSelected: "Fist ELMEt ARRAY",
//     setRadioSelected: (d) => {
//     },
//
//     checkBoxSelected: [],
//     setCheckBoxSelected: (d) => {
//
//     }
// }
export const generateHtmlOptions = (nameAnswerType, dataRetriever, setDataRetriever) => {
    debugger
    if (ANSWER_TYPES[0] === nameAnswerType) { // Single line text
        return (<input type={"text"} value={dataRetriever.answerText}
                       onChange={(e) => {
                           setDataRetriever({...dataRetriever, answerText: e.target.value})
                       }}></input>)
    } else if (ANSWER_TYPES[1] === nameAnswerType) { //Multiline text
        return (<textarea className="form-control" value={dataRetriever.answerText}
                          onChange={(e) => setDataRetriever({...dataRetriever, answerText: e.target.value})}>
                </textarea>)
    } else if (ANSWER_TYPES[2] === nameAnswerType) { // Date
        return (<DatePicker value={dataRetriever.answerText} onChange={(e) => {
            let data = e.toLocaleDateString().split('.').reverse().join('-')
            setDataRetriever({...dataRetriever, answerText: data}) // выводит в виде : 23.03.2011
        }}/>)
    } else if (ANSWER_TYPES[3] === nameAnswerType) { // Radio button
        return (<div className="btn-group-vertical" role="group">
            {dataRetriever.options
                .map((txOption, index) => {
                    return (
                        // <div key={index}>
                        //     <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                        //     <span>{checked ? 'галочка есть' : 'галочки нет'}</span>
                        // </div>
                        <div key={index}>
                            <br/>
                            <label><input type="radio" key={index} name="radio"
                                          value={txOption}
                                          checked={(dataRetriever.answerText == txOption)} //  '==' только так работает
                                          onChange={(e) => {
                                              setDataRetriever({...dataRetriever, answerText: e.target.value})
                                          }}></input>
                                {txOption}</label>
                        </div>
                    )
                })}
            ;
        </div>)
    } else if (ANSWER_TYPES[4] === nameAnswerType) { // Combo box
        return <></> // сделать !
    } else if (ANSWER_TYPES[5] === nameAnswerType) { // Check box
        return (<div className="form-check">
            {
                dataRetriever.options.map((txOption, index) => {
                    return (<div key={index}>
                        <input className="form-check-input" name={"listCheckBox"} type="checkbox"
                               value={txOption}
                               checked={dataRetriever.answerText.find((e) => e == txOption) != undefined} // '!=' ' только так работает
                               id="flexCheckDefault"
                               onChange={(e) => {
                                   debugger
                                   console.log(e)
                                   const checkBox = e.target;
                                   if (checkBox.checked == true) {
                                       const prev = dataRetriever.answerText;
                                       setDataRetriever({
                                           ...dataRetriever,
                                           answerText: [...prev, checkBox.value]
                                       })
                                   } else {
                                       let arr = dataRetriever.answerText.filter((ck) => {
                                           return ck != checkBox.value // '!=' только так работает
                                       });
                                       setDataRetriever({...dataRetriever, answerText: arr})
                                   }
                               }}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {txOption}
                        </label>
                    </div>)
                })
            }
        </div>)
    }
}


export const prepareAnswerText = (nameAnswerType, dataRetriever) => {
    if (ANSWER_TYPES[0] === nameAnswerType) { // Single line text
        return dataRetriever.answerText;
    } else if (ANSWER_TYPES[1] === nameAnswerType) { //Multiline text
        return dataRetriever.answerText;
    } else if (ANSWER_TYPES[2] === nameAnswerType) { // Date
        return dataRetriever.answerText;
    } else if (ANSWER_TYPES[3] === nameAnswerType) { // Radio button
        return dataRetriever.answerText.join('\n')
    } else if (ANSWER_TYPES[4] === nameAnswerType) { // Combo box
        return dataRetriever.answerText.join('\n')
    } else if (ANSWER_TYPES[5] === nameAnswerType) { // Check box
        return dataRetriever.answerText.join('\n')
    }
}