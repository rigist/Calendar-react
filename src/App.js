import "./styles.css";

import React, { useState, useEffect } from "react";

/*
Реализовать органайзер. 
Он будет представлять собой календарь, даты которого
будут хранить в себе список дел за эту дату.
Пусть в этот список можно добавлять и удалять дела, а также редактировать их. 
По заходу на страницу календарь
должен отображать текущий месяц текущего года, но сверху должны быть стрелочки
для переключения на следующий или предыдущий месяц.
 
Дела для органайзера нужно хранить в локальном хранилище, чтобы при обновлении
браузера введенные дела не пропадали.
 
Сделать приятный глазу дизайн и выложить на бесплатный хостинг.
Для проверки прислать ссылку на выложенный сайт.
 
*/

//import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
let nanoid = (t = 21) => {
  let e = "",
    r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    let n = 63 & r[t];
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? "_"
        : "-";
  }
  return e;
};

function App({ children }) {
  const [dateOne, setDateOne] = useState(new Date());
  let [month, setMonth] = useState(dateOne.getMonth());
  let [year, setYear] = useState(dateOne.getFullYear());

  let [dayOne, setDayOne] = useState(dateOne.getDate() - 1);

  const [arrCalendar, setArrCalendar] = useState(draw(year, month));

  const [saveDay, setSaveDay] = useState("");
  const [dayBool, setDayBool] = useState(false);

  useEffect(() => {
    setArrCalendar(draw(year, month));
  }, [month]);

  function draw(year, month) {
    let arr = range(getLastDay(year, month));
    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay = getLastWeekDay(year, month);
    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);

    return nums;
  } //draw

  function range(count) {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr[i] = i + 1;
    } //for

    return arr;
  }

  function getLastDay(year, month) {
    let date = new Date(year, month + 1, 0);

    return date.getDate();
  }
  /////////////////////
  function getFirstWeekDay(year, month) {
    let date = new Date(year, month, 1);

    let dayWeek = date.getDay();

    if (dayWeek > 0) {
      dayWeek--;
    } //if
    else if (dayWeek == 0) {
      dayWeek = 6;
    }

    return dayWeek;
  }

  function getLastWeekDay(year, month) {
    let date = new Date(year, month + 1, 0);

    let dayWeek = date.getDay();

    if (dayWeek > 0) {
      dayWeek--;
    } //if
    else if (dayWeek == 0) {
      dayWeek = 6;
    }

    return dayWeek;
  }

  function normalize(arr, left, right) {
    for (let i = 0; i < left; i++) {
      arr.unshift(" ");
    } //for

    for (let i = 0; i < right; i++) {
      arr.push(" ");
    } //for

    return arr;
  }

  //////////////////////
  function chunk(arr, n) {
    let arrBig = [];

    let k = 0;

    while (k < arr.length) {
      let arrSmall = [];
      arrSmall.length = n;

      for (let j = 0; j < arrSmall.length; j++) {
        arrSmall[j] = arr[k];
        k++;
      } //for

      arrBig.push(arrSmall);
    } //while

    return arrBig;
  }

  /////////// right

  function right() {
    setYear(month == 11 ? year + 1 : year);

    setMonth((prevMonth) => {
      return prevMonth == 11 ? 0 : prevMonth + 1;
    });

    let arrTwo = draw(year, month);

    setArrCalendar([...arrTwo]);
  }

  /////////left
  function left() {
    setYear(month == 0 ? year - 1 : year);

    setMonth((prevMonth) => {
      return prevMonth == 0 ? (prevMonth = 11) : prevMonth - 1;
    });

    let arrTwo = draw(year, month);

    setArrCalendar([...arrTwo]);
  }

  let dayArr = [
    ["01", "011", "0111"],
    ["2"],
    ["3"],
    ["4"],
    ["5"],
    ["6"],
    ["7"],
    ["8"],
    ["9"],
    [],
    [],
    [],
    [],
    [],
    [],
    ["ttt", "bbb"],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];

  let monthArrOne = [
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr],
    [dayArr]
  ];

  let monthArrTwo = [
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr,
    dayArr
  ];

  let yearArrOne = new Array(2100);

  for (let i = 1900; i < yearArrOne.length; i++) {
    yearArrOne[i] = monthArrTwo;
  }
  console.log(yearArrOne);
  const [monthArr, setMonthArr] = useState(monthArrOne);

  const [notes, setNotes] = useState(yearArrOne); // monthArrTwo yearArrOne
  const [editNum, setEditNum] = useState(null);

  //*************************************************** */

  function funcV(e) {
    let day = 0;

    if (+e.target.innerHTML / 2) {
      day = +e.target.innerHTML - 1;
      setDayOne(day);
      setEditNum(null);
    }
  }

  const result = notes[year][month][dayOne].map((note, index) => {
    return (
      <li
        key={nanoid()}
        onClick={() => {
          console.log("i", index);
          startEdit(index);
        }}
      >
        {note}

        <button
          onClick={() => {
            delItem(index);
          }}
        >
          Del
        </button>
      </li>
    );
  });

  function startEdit(index) {
    setEditNum(index);
  }
  function editItem(event) {
    if (editNum != null) {
      setNotes([
        ...notes.slice(0, year),
        [
          ...notes[year].slice(0, month),
          [
            ...notes[year][month].slice(0, dayOne),
            [
              ...notes[year][month][dayOne].slice(0, editNum),

              event.target.value,
              ...notes[year][month][dayOne].slice(
                editNum + 1,
                notes[year][month][dayOne].length
              )
            ],
            ...notes[year][month].slice(dayOne + 1, 31)
          ],
          ...notes[year].slice(month + 1, 12)
        ],
        ...notes.slice(year + 1, 2100)
      ]);
    }
  }

  function delItem(index) {
    setNotes([
      ...notes.slice(0, year),
      [
        ...notes[year].slice(0, month),
        [
          ...notes[year][month].slice(0, dayOne),
          [
            ...notes[year][month][dayOne].slice(0, index),

            ...notes[year][month][dayOne].slice(
              index + 1,
              notes[year][month][dayOne].length
            )
          ],
          ...notes[year][month].slice(dayOne + 1, 31)
        ],
        ...notes[year].slice(month + 1, 12)
      ],
      ...notes.slice(year + 1, 2100)
    ]);
  }

  function createItem(e) {
    if (editNum == null) {
      const res = [
        ...notes.slice(0, year),
        [
          ...notes[year].slice(0, month),
          [
            ...notes[year][month].slice(0, dayOne),
            [
              ...notes[year][month][dayOne].slice(
                0,
                notes[year][month][dayOne].length
              ),
              e.target.value
            ], // было ''
            ...notes[year][month].slice(dayOne + 1, 30)
          ],
          ...notes[year].slice(month + 1, 12)
        ],
        ...notes.slice(year + 1, 2100)
      ];

      setNotes(res);

      setEditNum((prev) => notes[year][month][dayOne].length);
    }
  }
  function stopEdit() {
    setEditNum(null);
  }

  async function save() {
    try {
      await localStorage.setItem("arr", JSON.stringify(notes));
    } catch (err) {
      alert("ошибка");
    }
  }

  async function readOne() {
    try {
      let str = await localStorage.getItem("arr");
      let res = "";
      res = JSON.parse(str);

      console.log(res);

      //let result = confirm("данные заметок в календаре перепишутся");
      //console.log(result);
      if (true) {
        setNotes([...res]);
      }
    } catch (err) {
      alert("ошибка");
    }
  }

  return (
    <div>
      <div id="container">
        <div className="left">
          <button
            onClick={() => {
              left();
            }}
          >
            ←
          </button>
          <span>
            {dayOne + 1} {month + 1} {year}
          </span>
          <button
            onClick={() => {
              right();
            }}
          >
            →
          </button>
          <TableOne
            arrCalendar={arrCalendar}
            year={year}
            month={month}
            monthArr={monthArr}
            funcV={funcV}
            setNotes={setNotes}
            notes={notes}
            dayOne={dayOne}
            saveDay={saveDay}
            setSaveDay={setSaveDay}
            dayBool={dayBool}
            setDayBool={setDayBool}
          />
        </div>

        <div className="right">
          {result}
          <input
            value={editNum == null ? "" : notes[year][month][dayOne][editNum]}
            onChange={
              editNum != null
                ? editItem
                : (e) => {
                    createItem(e);
                    editItem(e);
                  }
            }
          />
          <button onClick={stopEdit}>add</button>
          <br />
          <button onClick={createItem}>New</button>

          <br />
          <button onClick={save}>Save</button>
          <button onClick={readOne}>Read</button>
        </div>
      </div>
    </div>
  );
}
export default App;
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////

function TdOne({
  num,
  year,
  month,
  monthArr,
  funcV,
  setNotes,
  notes,
  dayOne,
  dayBool,
  setDayBool
}) {
  return (
    <td
      onClick={(e) => {
        funcV(e);
      }}
    >
      {num}
    </td>
  );
}

function TrOne({
  weekOne,
  year,
  month,
  monthArr,
  funcV,
  setNotes,
  notes,
  dayOne,
  saveDay,
  setSaveDay,
  dayBool,
  setDayBool
}) {
  return (
    <tr>
      <TdOne
        num={weekOne[0]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[1]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[2]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[3]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[4]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[5]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
      <TdOne
        num={weekOne[6]}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
      ></TdOne>
    </tr>
  );
}

// table
function TableOne({
  arrCalendar,
  year,
  month,
  monthArr,
  funcV,
  setNotes,
  notes,
  dayOne,
  saveDay,
  setSaveDay,
  dayBool,
  setDayBool
}) {
  const result = arrCalendar.map((item) => {
    return (
      <TrOne
        key={nanoid()}
        weekOne={item}
        year={year}
        month={month}
        monthArr={monthArr}
        funcV={funcV}
        setNotes={setNotes}
        notes={notes}
        dayOne={dayOne}
        saveDay={saveDay}
        setSaveDay={setSaveDay}
        dayBool={dayBool}
        setDayBool={setDayBool}
      />
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>пн</th>
            <th>вт</th>
            <th>ср</th>
            <th>чт</th>
            <th>пт</th>
            <th>сб</th>
            <th>вс</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
    </div>
  );
}
// table

///////////////////////////////
///////////////////////////////
