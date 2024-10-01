import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({ value = { startDate: null, endDate: null }, onChange }) => {
  const handleChange = (dates) => {
    const [start, end] = dates;
    onChange({ startDate: start, endDate: end });
  };

  return (
    <DatePicker
      selected={value.startDate}
      onChange={handleChange}
      startDate={value.startDate}
      endDate={value.endDate}
      selectsRange
      isClearable
      placeholderText="Select a date range"
    />
  );
};

export default DateRange;
