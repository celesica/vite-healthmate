import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext.jsx";

const GlucoseLevelChart = () => {
    const { currentUser } = useAuth();
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = () => {
            const db = getFirestore();
            const glucoseTrackerRef = collection(db, "glucoseTracker");

            return onSnapshot(glucoseTrackerRef, (querySnapshot) => {
                const currentUserDocs = querySnapshot.docs.filter(
                    (doc) => doc.data().userID === currentUser.uid
                );

                let normalCount = 0;
                let prediabetesCount = 0;
                let diabetesCount = 0;
                let latestGlucoseValue = 0;

                currentUserDocs.forEach((doc) => {
                    const data = doc.data();
                    if (data.glucoseLevel === "Normal") {
                        normalCount++;
                    } else if (data.glucoseLevel === "Prediabetes") {
                        prediabetesCount++;
                    } else if (data.glucoseLevel === "Diabetes") {
                        diabetesCount++;
                    }

                    if (!latestGlucoseValue || data.submissionDate > latestGlucoseValue.submissionDate) {
                        latestGlucoseValue = data;
                    }
                });

                setChartData({
                    labels: ["Normal", "Prediabetes", "Diabetes"],
                    datasets: [
                        {
                            data: [normalCount, prediabetesCount, diabetesCount],
                            backgroundColor: ["#36a2eb", "#ffce56", "#ff6384"],
                            hoverBackgroundColor: ["#36a2eb", "#ffce56", "#ff6384"],
                        },
                    ],
                    latestGlucoseValue: latestGlucoseValue.glucoseValue,
                });
            });
        };

        if (currentUser) {
            const unsubscribe = fetchData();
            return () => {
                unsubscribe();
            };
        }
    }, [currentUser]);

    const customChartPlugin = {
        id: "customCenterText",
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "25px Arial heavy";
            ctx.fillStyle = "#006968";
            const centerX = chart.chartArea.left + chart.chartArea.width / 2;
            const centerY = chart.chartArea.top + chart.chartArea.height / 2;
            ctx.fillText(chartData.latestGlucoseValue || "", centerX, centerY);
        },
    };

    return (
        <div>
            {chartData.labels && chartData.datasets && chartData.latestGlucoseValue !== undefined ? (
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        plugins: {
                            legend: {
                                display: true,
                                position: "right",
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        if (context && context.dataset && context.dataset.data) {
                                            const value = context.dataset.data[context.dataIndex];
                                            const label = context.chart.data.labels[context.dataIndex];
                                            return `${label}: ${value}`;
                                        } else {
                                            return "";
                                        }
                                    }

                                },
                            },
                        },
                    }}
                    plugins={[customChartPlugin]}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default GlucoseLevelChart;