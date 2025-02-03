import { useState, useEffect } from "react";
import PointsTable from "./points-table";
import LoadingSpinner from "./loading";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";

function PointsHistory() {
  const [history, setHistory] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function GetHistory() {
      setPending(true);
      try {
        const response = await fetch(`${URL}/api/admin/points`, {
          method: "GET",
        });

        const result = await response.json();
        console.log(result);

        setPending(false);
        setHistory(result);
      } catch (e) {
        console.error("Error getting points history: ", e.message);
        setPending(false);
      }
    }
    GetHistory();
  }, []);

  return (
    <>
      <h1 className="title">~Points History~</h1>

      {history && (
        <>
          <PointsTable data={history} />
        </>
      )}

      {pending && <LoadingSpinner />}

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default PointsHistory;
