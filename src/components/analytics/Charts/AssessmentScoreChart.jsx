import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useChartDataContext } from '../../../context/ChartDataContext';

const AssessmentScoreChart = ({ assessmentName }) => {
    const { state } = useChartDataContext();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
            },
        ],
    });

    useEffect(() => {
        const assessments = state.chartData[`${assessmentName?.toLowerCase() ?? ''}Assessments`] || [];
        console.log(assessments);

        // Create an array of objects with submissionDate and formScore properties
        const assessmentData = assessments.map(assessment => ({
            submissionDate: assessment.submissionDate.toDate(),
            formScore: assessment.formScore,
        }));

        // Sort the array by submissionDate
        assessmentData.sort((a, b) => a.submissionDate - b.submissionDate);

        // Extract the submission dates and form scores into separate arrays
        const submissionDates = assessmentData.map(assessment => assessment.submissionDate.toLocaleDateString());
        const scores = assessmentData.map(assessment => assessment.formScore);

        const backgroundColors = scores.map(score => {
            if (score >= 0 && score <= 10) return '#E4EFE7';
            if (score >= 11 && score <= 20) return '#ECF9FF';
            if (score >= 21 && score <= 35) return '#FFF9DE';
            if (score >= 36 && score <= 50) return '#FFE3B0';
            if (score >= 51 && score <= 100) return '#FAD4D4';
        });

        setChartData({
            labels: submissionDates,
            datasets: [
                {
                    label: `${assessmentName} Health Scores`,
                    data: scores,
                    backgroundColor: backgroundColors,
                },
            ],
        });
    }, [assessmentName, state.chartData]);

    return (
        <div>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                        },
                    },
                }}
            />
        </div>
    );
};

export default AssessmentScoreChart;
