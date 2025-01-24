import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './CalenderView.css';

const CalenderView = () => {
  const events = [
    {
      title: 'StarCycle',
      start: '2024-09-16T06:00:00',
      end: '2024-09-16T07:00:00',
      extendedProps: {
        instructor: 'Olivia Alvarado',
        location: 'Santa Barbara',
      },
    },
    {
      title: 'StarKids Lounge (45 mins)',
      start: '2024-09-16T09:00:00',
      end: '2024-09-16T09:45:00',
      extendedProps: {
        instructor: 'Play Lounge Staff',
        location: 'Santa Barbara',
      },
    },
    {
      title: 'StarStrength',
      start: '2024-09-16T09:00:00',
      end: '2024-09-16T10:00:00',
      extendedProps: { instructor: 'Dani Stone', location: 'Santa Barbara' },
    },
    {
      title: 'StarCycle',
      start: '2024-09-16T12:00:00',
      end: '2024-09-16T13:00:00',
      extendedProps: { instructor: 'Hayley Smith', location: 'Santa Barbara' },
    },
    {
      title: 'StarKids Lounge (45 mins)',
      start: '2024-09-16T17:30:00',
      end: '2024-09-16T18:15:00',
      extendedProps: {
        instructor: 'Play Lounge Staff',
        location: 'Santa Barbara',
      },
    },
  ];

  return (
    <div className="weekly-calendar">
      {/* Header with city name and date range */}
      <div className="calendar-header">
        <h2>Santa Barbara</h2>
        <div className="date-range">
          <span>16</span> <span>17</span> <span>18</span> <span>19</span>{' '}
          <span>20</span> <span>21</span> <span>22</span>
        </div>
      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={false}
        events={events}
        slotMinTime="06:00:00"
        slotMaxTime="18:00:00"
        eventContent={renderEventContent} // custom render function for events
      />
    </div>
  );
};

// Custom render function for events to show instructor, location, and a button
function renderEventContent(eventInfo) {
  return (
    <div className="event-content">
      <strong>{eventInfo.event.title}</strong>
      <p>{eventInfo.event.extendedProps.instructor}</p>
      <p>{eventInfo.event.extendedProps.location}</p>
      <button className="reserve-button">Reserve</button>
    </div>
  );
}

export default CalenderView;
