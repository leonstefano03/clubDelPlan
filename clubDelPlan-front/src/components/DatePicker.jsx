import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import { styles } from "../styles/datePickerStyles";
import React, { useState } from "react";

export const DatePicker = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onChange(date);
    }
  };

  const showDateTimePicker = () => {
    if (!showPicker) {
      setShowPicker(true);
      setIsEditing(true);
    }
  };

  const formatDate = (date) => {
   
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={selectedDate ? formatDate(selectedDate) : ""}
        onFocus={showDateTimePicker}
        onBlur={() => setIsEditing(false)}
        editable={!showPicker}
      />

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          dateFormat="DD/MM/YYYY"
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </>
  );
};
