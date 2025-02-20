import { IoClose } from "react-icons/io5";
import { cleanWhitespace } from "../helpers/utils";

function SearchUser({ searchResult, setSearchResult }) {
  function handleChange(value) {
    const formatInput = cleanWhitespace(value);
    setSearchResult(formatInput);
  }
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-user"
        placeholder="Search User"
        value={searchResult}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        type="button"
        className="clear-btn"
        onClick={() => setSearchResult("")}
      >
        <IoClose size={20} />
      </button>
    </div>
  );
}

export default SearchUser;
