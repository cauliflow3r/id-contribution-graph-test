"use client";
import { useEffect, useState } from "react";
import styles from "./ContributionGraph.module.css";

const ContributionGraph = () => {
  const [contributions, setContributions] = useState({});

  async function getData() {
    const response = await fetch("https://dpg.gg/test/calendar.json");
    const data = await response.json();

    const newData = {};

    for (let i = 1; i <= 357; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i + 1);

      // Format the date as "YYYY-MM-DD"
      const formattedDate = currentDate.toISOString().split("T")[0];

      newData[formattedDate] = [
        data[formattedDate] || 0,
        getColor(data[formattedDate] || 0),
      ];
    }
    setContributions(newData);
    console.log(newData);
    console.log(Object.keys(newData).length);
  }
  const getColor = (value) => {
    if (value === 0) {
      return "#EDEDED";
    } else if (value >= 1 && value <= 9) {
      return "#ACD5F2";
    } else if (value >= 10 && value <= 19) {
      return "#7FA8C9";
    } else if (value >= 20 && value <= 29) {
      return "#527BA0";
    } else {
      return "#254E77";
    }
  };
  const onMouseOver = (date) => {
    console.log(date);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        {Object.keys(contributions)
          .reverse()
          .map((date) => (
            <div
              className={styles.square}
              key={date}
              date={date}
              style={{
                backgroundColor: contributions[date][1],
              }}
            >
              <span className={styles.tooltipText}>
                <h5>{`${contributions[date][0]} Contribution`}</h5>
                <p>{[date]}</p>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContributionGraph;
