"use client";
import { useEffect } from "react";
import styels from "./ContributionGraph.module.css";

const ContributionGraph = () => {
  async function getData() {
    const response = await fetch("https://dpg.gg/test/calendar.json");
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return <div className={styels.container}></div>;
};

export default ContributionGraph;
