import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

function MyCalendar({ markedDates }) {

  const parsedDates = markedDates.map((dateString) => dayjs(dateString).toDate());

  return (
    <div>
      <Calendar
        tileClassName={({ date }) =>
            parsedDates.some((markedDate) => dayjs(markedDate).isSame(date, 'day'))
                ? date.toISOString() === new Date().toISOString() ? '' : 'marked'
                : ''
        }
        selectable={false}
      />
    </div>
  );
}

export default MyCalendar;