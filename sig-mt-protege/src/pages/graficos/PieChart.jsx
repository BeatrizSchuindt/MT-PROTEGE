import React from "react";
import { Chart } from "react-google-charts";


const dataBase = {
    tipos: ["Militar", "Civil"],
    valores: [9, 8]
};

let arrIndice = Object.keys(dataBase);
let arrValues = Object.values(dataBase);
export let data = [];

for (let i = 0; i< arrValues[0].length; i++) {
    data[i] = arrValues.map((item) => {
        return item[i];
    });
}

data.unshift(arrIndice);

console.log(data);

export const options = {
    title: "Quantidade de ocorrências por tipo",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { format: "currency" },
    animation: { duration: 500, easing: "linear", startup: true },
    pieHole: 0.5
};


const ChartPieView = () => {
    return(
        <>
            <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
                chartLanguage="pt-BR"
            />
        </>
    );
};

export default ChartPieView;