function AccountTable({ data }) {
  return (
    <div className="user-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Account</th>
              <th scope="col">Amount</th>
              <th scope="col">Date Added</th>
              <th scope="col">Time Added</th>
            </tr>
          </thead>

          <tbody>
            {data.map((record, index) => (
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
  );
}

export default AccountTable;
