import "../styles/points-table.css";

function PointsTable({ data }) {
  const sortedData = [...data].sort((a, b) => {
    // Convert dates
    const [monthA, dayA, yearA] = a.date.split("/");
    const [monthB, dayB, yearB] = b.date.split("/");
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    // Compare dates first
    if (dateB - dateA !== 0) return dateB - dateA;

    // If dates are equal, compare times
    const [timeA, periodA] = a.time.split(" ");
    const [timeB, periodB] = b.time.split(" ");
    const [hoursA, minutesA, secondsA] = timeA.split(":");
    const [hoursB, minutesB, secondsB] = timeB.split(":");

    // Convert to 24hr format for comparison
    let hrs24A = parseInt(hoursA);
    let hrs24B = parseInt(hoursB);

    if (periodA === "PM" && hrs24A !== 12) hrs24A += 12;
    if (periodB === "PM" && hrs24B !== 12) hrs24B += 12;
    if (periodA === "AM" && hrs24A === 12) hrs24A = 0;
    if (periodB === "AM" && hrs24B === 12) hrs24B = 0;

    // Compare hours, then minutes, then seconds
    if (hrs24B !== hrs24A) return hrs24B - hrs24A;
    if (minutesB !== minutesA) return parseInt(minutesB) - parseInt(minutesA);
    return parseInt(secondsB) - parseInt(secondsA);
  });

  return (
    <>
      <p className="table-row-amount">
        Total Records:
        <span>{data.length}</span>
      </p>

      <div className="user-table">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Account</th>
                <th scope="col">Amount</th>
                <th scope="col">Date Added</th>
                <th scope="col">Time</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.email}</td>
                  <td>{record.amount}</td>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PointsTable;
