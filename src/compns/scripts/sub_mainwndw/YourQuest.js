import Data from "bootstrap/js/src/dom/data";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export function rangeViewHtml(limit, totalCountRecord, curNPage, totalPage) {
    return [((curNPage) * limit + 1), (curNPage !== (totalPage - 1)) ? (limit * curNPage + limit) : (totalCountRecord)]
}


const answerTypes = ['Single line text', 'Multiline text', 'Date', 'Radio button', 'Combo box', 'Check box']

const dataRetriever = {
    textArea: "", setTextArea: (d) => {

    }, dataTime: new Data(), setDataTime: (d) => {

    },

    options: [],

    radioSelected: "Fist ELMEt ARRAY",
    setRadioData: (d) => {
    },

    checkBoxSelected: [],
    setCheckBoxData: (d) => {

    }
}
const generateHtmlOptions = (nameAnswerType, dataRetriever, setDataRetriever) => {
    if (answerTypes[0] === nameAnswerType) { // Single line text
        return (<></>)
    } else if (answerTypes[1] === nameAnswerType) { //Multiline text
        return (<textarea className="form-control" style="height: 100px" value={dataRetriever.textArea}
                          onChange={(e) => dataRetriever.setTextArea(e.target.value)}></textarea>)
    } else if (answerTypes[2] === nameAnswerType) { // Date
        return (<DatePicker onChange={dataRetriever.setDataTime} value={dataRetriever.dataTime}/>)
    } else if (answerTypes[3] === nameAnswerType) { // Radio button
        return (<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            {dataRetriever.options
                .map((txOption, index) => {
                    return (<input key={index} type="radio" className="btn-check" name="btnradio" value={txOption}
                                   checked={(index === 0)}
                                   autoComplete="off" onChange={(e) => {
                        dataRetriever.setRadioData(e.target.value)
                    }}>{txOption}</input>)
                })}
        </div>)
    } else if (answerTypes[4] === nameAnswerType) { // Combo box
        return <></> // сделать !
    } else if (answerTypes[5] === nameAnswerType) { // Check box
        return (<div className="form-check">
            {
                dataRetriever.options
                    .map((txOption, index) => {
                        return (<div key={index}>
                            <input className="form-check-input" name={"listCheckBox"} type="checkbox" value={txOption}
                                   id="flexCheckDefault"
                                   onChange={(e) => {
                                       const checkBox = e.target;
                                       if (checkBox.checked) {
                                           dataRetriever.setCheckBoxData([...dataRetriever.checkBoxSelected, checkBox.value])
                                       } else {
                                           dataRetriever.setCheckBoxData(dataRetriever.checkBoxSelected.filter(chk => {chk !== checkBox.value}))
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