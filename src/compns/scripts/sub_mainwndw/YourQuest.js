import Data from "bootstrap/js/src/dom/data";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export function rangeViewHtml(limit, totalCountRecord, curNPage, totalPage) {
    return [((curNPage) * limit + 1), (curNPage !== (totalPage - 1)) ? (limit * curNPage + limit) : (totalCountRecord)]
}
