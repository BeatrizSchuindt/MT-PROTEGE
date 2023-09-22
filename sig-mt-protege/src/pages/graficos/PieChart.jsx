import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { contarCivil, contarMilitar } from "../../services/policial-services";

const ChartPieView = () => {
    const [countCivil, setCountCivil] = useState(0); // Inicializado com 0
    const [countMilitar, setCountMilitar] = useState(0); // Inicializado com 0

    useEffect(() => {
        const fetchCountCivil = async () => {
            try {
                const responseData = await contarCivil();
                setCountCivil(responseData.data);
            } catch (error) {
                console.error(
                    "Erro ao buscar contagem de policiais civis no componente:",
                    error
                );
            }
        };

        const fetchCountMilitar = async () => {
            try {
                const responseData = await contarMilitar();
                setCountMilitar(responseData.data);
            } catch (error) {
                console.error(
                    "Erro ao buscar contagem de policiais militares no componente:",
                    error
                );
            }
        };

        fetchCountCivil();
        fetchCountMilitar();
    }, []);

    const data = [
        ["Tipos", "Valores"],
        ["Civil", countCivil],
        ["Militar", countMilitar]
    ];

    const options = {
        title: "QUANTIDADE DE POLICIAIS POR TIPO",
        curveType: "function",
        legend: { position: "bottom" },
        hAxis: { format: "currency" },
        animation: { duration: 500, easing: "linear", startup: true },
        pieHole: 0.5,
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
                chartLanguage="pt-BR"
            />
        </div>
    );
};

export default ChartPieView;
