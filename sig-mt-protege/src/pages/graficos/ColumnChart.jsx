import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { contarOcorrenciasPorTipo } from "../../services/ocorrencia-services";

const ChartView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchOcorrenciasPorTipo = async () => {
            try {
                const response = await contarOcorrenciasPorTipo();
                const dataFromAPI = response.data;
    
                // Convert the counts to numbers
                for (const tipo in dataFromAPI) {
                    dataFromAPI[tipo] = parseInt(dataFromAPI[tipo]); // ou parseFloat se os valores forem decimais
                }
    
                // Format data for the chart
                const chartData = [["Tipo de Ocorrência", "Quantidade"]];
                for (const tipo in dataFromAPI) {
                    chartData.push([tipo, dataFromAPI[tipo]]);
                }
    
                // Set the chart data in state
                setData(chartData);
            } catch (error) {
                console.error("Erro ao buscar contagem de ocorrências por tipo:", error);
            }
        };
    
        fetchOcorrenciasPorTipo();
    }, []);
    

    const options = {
        title: "QUANTIDADE DE OCORRÊNCIA POR TIPO",
        legend: { position: "bottom" },
        animation: { duration: 500, easing: "linear", startup: true },
        pieHole: 0.5,
    };

    return(
        <div>
        {data ? (
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
                chartLanguage="pt-BR"
            />
        ) : (
            <p>Carregando dados...</p>
        )}
    </div>
    );
};

export default ChartView;