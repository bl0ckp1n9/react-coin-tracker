import { FC } from "react"
import { useQuery } from "react-query"
import { fetchCoinHistory } from "./api"
import { ChartProps, IHistorical } from "./interface"
import ApexChart from "react-apexcharts"


export const Price: FC<ChartProps> = ({ coinId }) => {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 })

    console.log(data?.map((price) => {
        return [
            price.time_close,
            [price.open,
            price.high,
            price.low,
            price.close,]
        ];
    }))
    return (
        <>

            {isLoading ? <>Loading</> : <ApexChart
                type="candlestick"
                series={[
                    {
                        data:
                            data?.map((price) => {
                                const openTime = parseInt(price.time_open) * 1000
                                return [
                                    openTime,
                                    [price.open,
                                    price.high,
                                    price.low,
                                    price.close,]
                                ];
                            }) as any,
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark",
                    },
                    chart: {
                        type: "candlestick",
                        height: 350,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        type: "datetime",
                        categories: data?.map((price) => price.time_close),
                        labels: {
                            style: {
                                colors: '#9c88ff'
                            }
                        }
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                            }
                        }
                    }
                }}
            />}
        </>
    )
}