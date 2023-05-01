import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

function MyCalendar({ markedDates }) {
  console.log('markedDates:', markedDates);

  const parsedDates = markedDates.map((dateString) => dayjs(dateString).toDate());

  return (
    <div>
      <Calendar
        value={new Date()}
        tileClassName={({ date }) => {
          console.log('checking date:', date);
          return parsedDates.some((markedDate) => dayjs(markedDate).isSame(date, 'day'))
            ? 'marked'
            : '';
        }}
        selectable={false}
      />
    </div>
  );
}

export default MyCalendar;