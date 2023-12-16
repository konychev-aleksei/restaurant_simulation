import Chart from "react-apexcharts";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { getConfig } from "../../redux/slices/config";

const inititalState = {
  options: {
    chart: {
      id: "",
    },
    xaxis: {
      categories: [],
    },
  },
  series: [
    {
      name: "",
      data: [],
    },
  ],
};

const getChartData = (categories: any, data: any) => ({
  options: {
    ...inititalState.options,
    xaxis: {
      ...inititalState.options.xaxis,
      categories,
    },
  },
  series: [
    {
      name: "",
      data,
    },
  ],
});

const ChartsList = () => {
  const [spawnRateData, setSpawnRateData] = useState(inititalState);
  const [foodQualityData, setFoodQualityData] = useState(inititalState);
  const [waiterSpeedData, setWaiterSpeedData] = useState(inititalState);
  const [leaveRate1Data, setLeaveRate1Data] = useState(inititalState);
  const [leaveRate2Data, setLeaveRate2Data] = useState(inititalState);
  const [happinessRateData, setHapinessRateData] = useState(inititalState);

  const {
    time,
    params: {
      spawnRate,
      foodQuality,
      waiterSpeed,
      leaveRate1,
      leaveRate2,
      overallHappiness,
    },
  } = useAppSelector(getConfig);

  useEffect(() => {
    setSpawnRateData(getChartData(time, spawnRate));
  }, [spawnRate]);

  useEffect(() => {
    setFoodQualityData(getChartData(time, foodQuality));
  }, [foodQuality]);

  useEffect(() => {
    setWaiterSpeedData(getChartData(time, waiterSpeed));
  }, [waiterSpeed]);

  useEffect(() => {
    setLeaveRate1Data(getChartData(time, leaveRate1));
  }, [leaveRate1]);

  useEffect(() => {
    setLeaveRate2Data(getChartData(time, leaveRate2));
  }, [leaveRate2]);

  useEffect(() => {
    setHapinessRateData(getChartData(time, overallHappiness));
  }, [overallHappiness]);

  return (
    <div className={style.wrapper}>
      <p>Общая удовлетворенность обслуживанием</p>
      <br />
      <Chart
        options={happinessRateData.options}
        series={happinessRateData.series}
        type="area"
        width={1400}
        height={320}
      />
      <br />
      <div>
        <p>Частота прихода клиентов</p>
        <Chart
          options={spawnRateData.options}
          series={spawnRateData.series}
          type="area"
          width={700}
          height={320}
        />
      </div>
      <div>
        <p>Скорость официанта</p>
        <Chart
          options={foodQualityData.options}
          series={foodQualityData.series}
          type="area"
          width={700}
          height={320}
        />
      </div>
      <div>
        <p>Скорость официанта</p>
        <Chart
          options={waiterSpeedData.options}
          series={waiterSpeedData.series}
          type="area"
          width={700}
          height={320}
        />
      </div>
      <div>
        <p>Вежливость персонала</p>
        <Chart
          options={leaveRate1Data.options}
          series={leaveRate1Data.series}
          type="area"
          width={700}
          height={320}
        />
      </div>
      <div>
        <p>Чистота помещения</p>
        <Chart
          options={leaveRate2Data.options}
          series={leaveRate2Data.series}
          type="area"
          width={700}
          height={320}
        />
      </div>
    </div>
  );
};

export default ChartsList;
