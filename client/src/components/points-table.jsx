import { formatNumber, capitalize, formatEmail } from "../helpers/utils";
import { IoCheckmarkCircle } from "react-icons/io5";
import "../styles/points-table.css";

function PointsTable({ data, searchResult }) {
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
              {searchResult &&
                data
                  .filter(
                    (record) =>
                      record.email === formatEmail(searchResult) ||
                      record.firstName === capitalize(searchResult) ||
                      record.lastName === capitalize(searchResult) ||
                      `${record.firstName} ${record.lastName}` ===
                        capitalize(searchResult) ||
                      `${record.lastName} ${record.firstName}` ===
                        capitalize(searchResult)
                  )
                  .map((record) => (
                    <tr key={record.id} className="searched-row">
                      <td>
                        {" "}
                        <IoCheckmarkCircle
                          size={24}
                          color="#22c55e"
                          className="check-icon"
                        />
                      </td>
                      <td>{record.email}</td>
                      <td>{formatNumber(record.amount)}</td>
                      <td>{record.date}</td>
                      <td>{record.time}</td>
                    </tr>
                  ))}

              {data.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.email}</td>
                  <td>{formatNumber(record.amount)}</td>
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
