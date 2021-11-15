import { PageStateInterface } from "../../interfaces/pageState.interface";
import Select from "react-select";
import { StandardButton } from "../Buttons";
import { useRef } from "react";

interface SearchListInputProps {
  pageState: PageStateInterface;
  setPageState: React.Dispatch<React.SetStateAction<PageStateInterface>>;
}

const ORGS = [
  { value: "100 Thieves", label: "100 Thieves" },
  { value: "CLG", label: "CLG" },
  { value: "Cloud9", label: "Cloud9" },
  { value: "Complexity", label: "Complexity" },
  { value: "Dignitas", label: "Dignitas" },
  { value: "Evil Geniuses", label: "Evil Geniuses" },
  { value: "Excel", label: "Excel" },
  { value: "Fnatic", label: "Fnatic" },
  { value: "G2", label: "G2" },
  { value: "Golden Guardians", label: "Golden Guardians" },
  { value: "Guild Esports", label: "Guild Esports" },
  { value: "Heroic", label: "Heroic" },
  { value: "Immortals", label: "Immortals" },
  { value: "Ninjas in Pyjamas", label: "Ninjas in Pyjamas" },
  { value: "OverActive Media", label: "OverActive Media" },
  { value: "ReKTGlobal", label: "ReKTGlobal" },
  { value: "Team Liquid", label: "Team Liquid" },
  { value: "Vitality", label: "Vitality" },
];

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    borderRadius: "9999px",
    border: "2px solid #fbcfe8",
    boxShadow: "none",
    padding: "3px 5px",
    "&:hover": {},
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: state.isSelected ? "#f9a8d4" : "#fff",
    "&:hover": {
      backgroundColor: "#fbcfe8",
    },
  }),
};

const SearchComponent = ({ pageState, setPageState }: SearchListInputProps) => {
  const textRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<any | null>(null);
  const setText = (text: string) => {
    setPageState({
      ...pageState,
      search: text,
      page: 0,
    });
  };

  const setOrg = (org: string) => {
    setPageState({
      ...pageState,
      org: org,
      page: 0,
    });
  };

  const clearSearch = () => {
    (textRef.current as HTMLInputElement).value = "";
    selectRef.current.state.selectValue = [];
    setPageState({
      ...pageState,
      search: "",
      org: "",
      page: 0,
    });
  };

  const setTextOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setText((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center ">
      <div className="w-full sm:w-1/3 mb-4 sm:mr-8">
        <Select
          ref={selectRef}
          placeholder="Select"
          onChange={(option: any) => setOrg(option?.value)}
          options={ORGS as any}
          styles={customStyles}
        />
      </div>
      <input
        ref={textRef}
        type="search"
        placeholder="Search..."
        className="w-full sm:w-1/2 mb-4 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-300 outline-none transition-colors"
        onBlur={(event) => setText(event.target.value)}
        onKeyPress={(event) => setTextOnEnter(event)}
      />
      <StandardButton
        onClick={clearSearch}
        text="Clear"
        className="mb-4 sm:ml-8"
      />
    </div>
  );
};

export default SearchComponent;
