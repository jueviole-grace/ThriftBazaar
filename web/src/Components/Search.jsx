import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../Styles/search.css";
import { Icon, Input, Link } from "@chakra-ui/react";
import { searchItems } from "../axios/axios";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";

const SuggestionsList = (props) => {
  const {
    suggestions,
    inputValue,
    onSelectSuggestion,
    displaySuggestions,
    selectedSuggestion,
  } = props;

  if (inputValue && displaySuggestions) {
    if (suggestions.length > 0) {
      return (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestion === index;
            const classname = `suggestion ${isSelected ? "selected" : ""}`;
            return (
              <Link href={`/search/${suggestion}`}>
                <li
                  key={index}
                  className={classname}
                  onClick={() => onSelectSuggestion(index)}
                >
                  {suggestion}
                </li>
              </Link>
            );
          })}
        </ul>
      );
    }
  }
  return <></>;
};
const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  let suggestions = [];

  async function callItems() {
    const response = await fetch("../../data/items.json");
    const data = await response.json();
    suggestions = data;
  }

  callItems();

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filteredSuggestions);
    setDisplaySuggestions(true);
  };

  const onSelectSuggestion = (index) => {
    setSelectedSuggestion(index);
    setInputValue(filteredSuggestions[index]);
    setFilteredSuggestions([]);
    setDisplaySuggestions(false);
  };

  return (
    <>
      <div className="searchWrapper">
        <Icon as={SearchIcon} className="searchIcon" />
        <input
          name="search"
          className="user-input"
          type="text"
          placeholder="Find products"
          onChange={onChange}
          value={inputValue}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              window.location.href = `/search/${inputValue}` 
            }
          }}
        />
      </div>
      <SuggestionsList
        inputValue={inputValue}
        selectedSuggestion={selectedSuggestion}
        onSelectSuggestion={onSelectSuggestion}
        displaySuggestions={displaySuggestions}
        suggestions={filteredSuggestions}
      />
    </>
  );
};

export default Autocomplete;
