import { useQuery } from "react-query"
import { fetchCoinHistory } from "./api"
import ApexChart from "react-apexcharts"

interface IHistorical {
    time_open: string
    time_close: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: string
}

interface ChartProps {
    coinId: string
}
export const Chart = ({ coinId }: ChartProps) => {
    const { isLoading, data: hisData } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 })
    return (
        <div>
            {isLoading ? "Loading chart..." : <ApexChart type="line" series={[
                {
                    name: "Price",
                    data: hisData?.map(price => price.close) ?? [],
                }
            ]} options={{
                theme: {
                    mode: "dark"
                },
                chart: {
                    toolbar: {
                        show: false
                    },
                    height: 500,
                    width: 500,
                    background: "transparent",
                },
                grid: {
                    show: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 4,
                },
                xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    type: "datetime",
                    categories: hisData?.map(date => {
                        const utcTime = parseInt(date.time_close) * 1000
                        var data = new Date(utcTime);
                        return data.toDateString().slice(4, 10)
                    })
                },
                yaxis: {
                    show: false
                },
                fill: { type: "gradient", gradient: { gradientToColors: ["blue"], stops: [0, 100] } },
                colors: ["red"],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(2)}`
                    }
                }
            }} />}
        </div>
    )
}

