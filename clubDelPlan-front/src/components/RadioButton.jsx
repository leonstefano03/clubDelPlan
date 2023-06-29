import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioButton = ({ options, onSelect, style, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View {...style}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleOptionSelect(option.value)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: selectedOption === option.value ? "white" : "gray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedOption === option.value && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "white",
                }}
              />
            )}
          </View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginVertical: 5,
              marginLeft: 5,
              marginRight: 10,
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
