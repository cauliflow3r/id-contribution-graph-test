"use client";
import { useEffect, useState } from "react";
import styles from "./ContributionGraph.module.css";

const ContributionGraph = () => {
  const [contributions, setContributions] = useState({});

  // получаем данные

  async function getData() {
    const response = await fetch("https://dpg.gg/test/calendar.json");
    const data = await response.json();

    // решил что будет лучше мэпать уже готовые данные
    const newData = {};

    const currentDate = new Date();
    const daysUntilSunday = (7 - currentDate.getDay()) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSunday);

    for (let i = 0; i < 357; i++) {
      const formattedDate = currentDate.toISOString().split("T")[0];

      newData[formattedDate] = [
        data[formattedDate] || 0,
        getColor(data[formattedDate] || 0),
      ];

      currentDate.setDate(currentDate.getDate() - 1);
      // console.log("formattedDate", formattedDate);
    }

    setContributions(newData);
    // console.log(newData);
    // console.log(Object.keys(newData).length);
  }
  //! пихаем цвет сразу в наш объект )
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

  useEffect(() => {
    getData();
  }, []);

  // база

  // Months (убил больше времени чем хотел)
  const renderMonthLabels = () => {
    const monthLabels = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const month = currentDate.toLocaleString("ru-ru", { month: "short" });
      monthLabels.push(month);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return monthLabels.reverse();
  };

  const renderDayLabels = () => {
    const dayLabels = ["Пн", "", "Ср", "", "Пт", "", ""];
    // костыль хы )
    return dayLabels;
  };
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", options);
  };
  // todo: то что ниже надо рефакторить и пихать в компоненты
  return (
    <div className={styles.container}>
      <div className={styles.monthLabels}>
        {renderMonthLabels().map((month, index) => (
          <div key={index} className={styles.monthLabel}>
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </div>
        ))}
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.leftLabels}>
          {renderDayLabels().map((day, index) => (
            <div key={index} className={styles.dayLabel}>
              {day}
            </div>
          ))}
        </div>
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
                <div className={styles.tooltipText}>
                  <h5>{`${contributions[date][0]} Contribution`}</h5>
                  <p>{formatDate(date)}</p>
                  <div className={styles.pointerContainer}>
                    <div className={styles.pointer}></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;

// todo:  code refactoring ideas for the future, move most of the helper functions in a sepperate file for better readability.
// make smaller components for better usability
