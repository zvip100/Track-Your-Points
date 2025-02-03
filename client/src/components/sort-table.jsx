import { useState, useEffect } from "react";

function SortTable({ users, setReloadTable }) {
  const [order, setOrder] = useState("");

  useEffect(() => {
    function sort(arr) {
      if (order === "Sort by name") {
        arr.sort((a, b) => a.lastName.localeCompare(b.lastName));
      } else if (order === "Sort by highest points first") {
        arr.sort((a, b) => b.points - a.points);
      } else if (order === "Sort by lowest points first") {
        arr.sort((a, b) => a.points - b.points);
      } else return;

      setReloadTable();
    }
    sort(users);
  }, [order]);

  return (
    <>
      <select
        className="sort-table-dropdown"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option>Choose sorting order</option>
        <option>Sort by name</option>
        <option>Sort by highest points first</option>
        <option>Sort by lowest points first </option>
      </select>
    </>
  );
}

export default SortTable;
