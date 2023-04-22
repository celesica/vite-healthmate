import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext.jsx";

const GlucoseTimingChart = () => {
    const { currentUser } = useAuth();

    const [radarData, setRadarData] = useState({
        labels: ["Before Meal", "After Meal", "Bedtime", "Just Woke Up", "Exercise", "Fasting"],
        datasets: [
            {
                label: "Average Glucose Value",
                data: [],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(54, 162, 235, 1)",
            },
        ],
    });

    const [maxValue, setMaxValue] = useState(200);

    const radarOptions = {
        maintainAspectRatio: true,
        scales: {
            r: {
                min: 40,
                max: maxValue,
                angleLines: {
                    color: "lightPink",
                },
                ticks: {
                    beginAtZero: false,
                },
            },
        },
    };

    const fetchGlucoseData = () => {
        const db = getFirestore();
        const glucoseTrackerRef = collection(db, "glucoseTracker");

        return onSnapshot(glucoseTrackerRef, (querySnapshot) => {
            const currentUserDocs = querySnapshot.docs.filter(
                (doc) => doc.data().userID === currentUser.uid
            );

            const glucoseDataByTiming = {
                "Before Meal": [],
                "After Meal": [],
                "Bedtime": [],
                "Just Woke Up": [],
                "Exercise": [],
                "Fasting": [],
            };

            currentUserDocs.forEach((doc) => {
                const data = doc.data();
                glucoseDataByTiming[data.timing].push(data.glucoseValue);
            });

            const averageGlucoseValues = Object.values(glucoseDataByTiming).map((values) => {
                if (values.length === 0) {
                    return 0;
                }
                const sum = values.reduce((acc, curr) => acc + curr);
                return Math.round(sum / values.length);
            });

            // Find the maximum glucose value
            const maxGlucoseValue = Math.max(...averageGlucoseValues);

            // Set the maximum value for the y-axis of the chart
            setMaxValue(Math.ceil(maxGlucoseValue / 10) * 10);

            setRadarData((prevState) => {
                return {
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: averageGlucoseValues,
                        },
                    ],
                };
            });
        });
    };

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = fetchGlucoseData();
            return () => {
                unsubscribe();
            };
        }
    }, [currentUser]);

    return (
        <div>
            <Radar data={radarData} options={radarOptions} />
        </div>
    );
};

export default GlucoseTimingChart;
