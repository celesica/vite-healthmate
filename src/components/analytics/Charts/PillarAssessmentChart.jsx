import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {useChartDataContext} from '../../../context/ChartDataContext.jsx';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment';
import 'chartjs-adapter-moment';
import LoadingState from '../../../components/dashboard/LoadingState';
import NoData from '../../analytics/Charts/NoData';

Chart.register(annotationPlugin, zoomPlugin);

const PillarAssessmentChart = () => {
    const { state, hasChartData } = useChartDataContext();
    const chartCanvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const getSubmissionDates = (assessments) => {
        return assessments.map((assessment) => {
            return moment(assessment.submissionDate.seconds * 1000).format('YYYY-MM-DDTHH:mm:ss.sssZ');
        });
    };

    useEffect(() => {
        if (!chartCanvasRef.current) {
            return;
        }

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const resizeHandler = () => {
            chartInstanceRef.current.resize();
        };
        window.addEventListener('resize', resizeHandler);

        const pillarAssessmentChartCanvas = chartCanvasRef.current;
        // console.log(state);
        try {
            const allSubmissionDates = [
                ...getSubmissionDates(state.chartData.funAssessments),
                ...getSubmissionDates(state.chartData.sleepAssessments),
                ...getSubmissionDates(state.chartData.exerciseAssessments),
                ...getSubmissionDates(state.chartData.environmentAssessments),
            ];

            const createAssessmentDataset = (type, color) => {
                const assessments = state.chartData[`${type}Assessments`];
                return {
                    label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
                    data: assessments.map((assessment) => assessment.formScore),
                    backgroundColor: color,
                    borderColor: color,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                };
            };

            const pillarAssessmentChart = new Chart(pillarAssessmentChartCanvas, {
                type: 'line',
                data: {
                    labels: allSubmissionDates,
                    datasets: [
                        createAssessmentDataset('fun', '#FF97A5'),
                        createAssessmentDataset('sleep', '#03AAC2'),
                        createAssessmentDataset('exercise', '#04E4D8'),
                        createAssessmentDataset('environment', '#FF9658'),
                    ],
                },
                options: {
                    animation: {
                        duration: 2000,
                        easing: 'linear',
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                parser: 'YYYY-MM-DDTHH:mm:ss.sssZ',
                                displayFormats: {
                                    day: 'MMM D',
                                    hour: 'HH:mm',
                                    minute: 'HH:mm',
                                    second: 'HH:mm:ss',
                                },
                            },
                            ticks: {
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 50,
                            },
                            adapter: {
                                date: moment,
                            },
                        },
                        y: {
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 10,
                                callback: (value) => `${value}%`,
                            },
                        },
                    },
                    plugins: {
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 0,
                                    borderColor: 'green',
                                    borderWidth: 2,
                                    label: {
                                        backgroundColor: 'green',
                                        content: 'Overall good balance',
                                        display: true,
                                        position: 'end'
                                    },
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 20,
                                    borderColor: '#3d85c6',
                                    borderWidth: 2,
                                    label: {
                                        backgroundColor: '#3d85c6',
                                        content: 'Needs tune up',
                                        display: true,
                                        position: 'end'
                                    },
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 35,
                                    borderColor: '#ffd966',
                                    borderWidth: 2,
                                    label: {
                                        backgroundColor: '#ffd966',
                                        content: 'Out of balance',
                                        display: true,
                                        position: 'end'
                                    },
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 50,
                                    borderColor: '#e69138',
                                    borderWidth: 2,
                                    label: {
                                        backgroundColor: '#e69138',
                                        content: 'Very compromised',
                                        display: true,
                                        position: 'end'
                                    },
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 80,
                                    borderColor: '#cc0000',
                                    borderWidth: 2,
                                    label: {
                                        backgroundColor: '#cc0000',
                                        content: 'Severely compromised',
                                        display: true,
                                        position: 'end'
                                    },
                                }
                            ]
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'x',
                            }
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                },
            });

            chartInstanceRef.current = pillarAssessmentChart;

            return () => {
                pillarAssessmentChart.destroy();
                window.removeEventListener('resize', resizeHandler);
            };
        } catch (error) {
            console.error('Error rendering PillarAssessmentChart:', error);
        }
    }, [state]);

    console.log(state.chartData.funAssessments);

    return (
        <div>
            {state.loading ? (
                <LoadingState />
            ) : !hasChartData ? (
                    <NoData onButtonClick={() => console.log('Take the test now clicked!')} />
            ) : (
                <canvas ref={chartCanvasRef}></canvas>
            )}
        </div>
    );

};

export default PillarAssessmentChart;