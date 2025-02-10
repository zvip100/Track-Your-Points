import { IoClose } from "react-icons/io5";

function SearchUser({ searchResult, setSearchResult }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-user"
        placeholder="Search User"
        value={searchResult}
        onChange={(e) => setSearchResult(e.target.value)}
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
