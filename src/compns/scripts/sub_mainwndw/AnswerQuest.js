import Data from "bootstrap/js/src/dom/data";
import DatePicker from "react-date-picker";

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
//  const generateHtmlOptions = (nameAnswerType, dataRetriever, setDataRetriever) => {
//     if (ANSWER_TYPES[0] === nameAnswerType) { // Single line text
//         return (<input type={"text"} value={dataRetriever.textArea}
//                        onChange={(e) => {
//                            debugger
//                            dataRetriever.setTextArea(e.target.value)
//                        }}></input>)
//     } else if (ANSWER_TYPES[1] === nameAnswerType) { //Multiline text
//         return (<textarea className="form-control" value={dataRetriever.textArea}
//                           onChange={(e) => dataRetriever.setTextArea(e.target.value)}></textarea>)
//     } else if (ANSWER_TYPES[2] === nameAnswerType) { // Date
//         return (<DatePicker onChange={dataRetriever.setDateTime} value={dataRetriever.dateTime}/>)
//     } else if (ANSWER_TYPES[3] === nameAnswerType) { // Radio button
//         return (<div className="btn-group" role="group">
//             {dataRetriever.options
//                 .map((txOption, index) => {
//                     return (
//                         <label><input key={index} type="radio" className="btn-check" name="btnradio" value={txOption}
//                                       checked={(index === 0)}
//                                       autoComplete="off" onChange={(e) => {
//                             dataRetriever.setRadioSelected(e.target.value)
//                         }}/></label>)
//                 })}
//         </div>)
//     } else if (ANSWER_TYPES[4] === nameAnswerType) { // Combo box
//         return <></> // сделать !
//     } else if (ANSWER_TYPES[5] === nameAnswerType) { // Check box
//         return (<div className="form-check">
//             {
//                 dataRetriever.options
//                     .map((txOption, index) => {
//                         return (<div key={index}>
//                             <input className="form-check-input" name={"listCheckBox"} type="checkbox" value={txOption}
//                                    id="flexCheckDefault"
//                                    onChange={(e) => {
//                                        const checkBox = e.target;
//                                        if (checkBox.checked) {
//                                            dataRetriever.setCheckBoxSelected([...dataRetriever.checkBoxSelected, checkBox.value])
//                                        } else {
//                                            let arr = dataRetriever.checkBoxSelected.filter((ck) => {
//                                                return ck !== checkBox.value
//                                            });
//                                            dataRetriever.setCheckBoxSelected(arr)
//                                        }
//                                    }}/>
//                             <label className="form-check-label" htmlFor="flexCheckDefault">
//                                 {txOption}
//                             </label>
//                         </div>)
//                     })
//             }
//         </div>)
//     }
// }


export const prepareAnswerText = (nameAnswerType, dataRetriever) => {

}