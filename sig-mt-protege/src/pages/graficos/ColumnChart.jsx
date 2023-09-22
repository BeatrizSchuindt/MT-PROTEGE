import React from "react";
import { Chart } from "react-google-charts";

const dataBase = {
    tipos: ["Homicídio", "Agressão", "Roubo", "Abuso Sexual", "Furto", "Vandalismo", "Fraude", "Evasão Fiscal", "Contrabando", "Cibercrime", "Corrupção", "Outros"],
    valores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
    animation: { duration: 500, easing: "linear", startup: true }
};


const ChartView = () => {
    return(
        <>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
                chartLanguage="pt-BR"
            />
        </>
    );
};

export default ChartView;