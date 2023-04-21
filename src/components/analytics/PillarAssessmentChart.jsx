import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as d3Zoom from 'd3-zoom';
import { useChartDataContext } from '../../context/ChartDataContext';

const PillarAssessmentChart = () => {
    const { state } = useChartDataContext();
    const chartRef = useRef(null);

    const animateChart = () => {
        const svg = d3.select(chartRef.current).select('svg');
        const lines = ['fun-line', 'sleep-line', 'exercise-line', 'environment-line'];

        lines.forEach(lineClass => {
            const linePath = svg.select(`.${lineClass}`);
            const linePathLength = linePath.node().getTotalLength();
            linePath
                .attr('stroke-dasharray', `${linePathLength} ${linePathLength}`)
                .attr('stroke-dashoffset', linePathLength)
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);
        });
    };

    console.log(state.chartData);

    useEffect(() => {
        // Exit early if chart data is not yet available
        if (!chartRef.current ||
            !state.chartData.funAssessments.length ||
            !state.chartData.sleepAssessments.length ||
            !state.chartData.exerciseAssessments.length ||
            !state.chartData.environmentAssessments.length) return;

        // Clear the chart before rendering
        d3.select(chartRef.current).selectAll('*').remove();

        // Combine and sort data by date
        const combinedData = [
            ...state.chartData.funAssessments,
            ...state.chartData.sleepAssessments,
            ...state.chartData.exerciseAssessments,
            ...state.chartData.environmentAssessments
        ].sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate),);

        // Process data, create an array of objects containing date and scores
        const scoreTypes = {
            'Fun Assessment': 'funScore',
            'Sleep Assessment': 'sleepScore',
            'Exercise Assessment': 'exerciseScore',
            'Environment Assessment': 'environmentScore',
        };

        const processedData = combinedData.map((data) => {
            const scoreType = scoreTypes[data.formName];
            const score = data.formType === 'pillarAssessments' ? data.formScore : undefined;
            return {
                date: data.submissionDate.toDate(),
                [scoreType]: score,
            };
        });

        // Create the chart using D3.js
        // Set dimensions and margins
        const margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Define scales and axes
        const x = d3.scaleTime()
            .domain(d3.extent(processedData, d => new Date(d.date)))
            .range([0, width]);
        const xAxis = d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%m/%d")) // format the tick labels
            .ticks(d3.timeDay.every(1)); // set the tick interval to every day

        const y = d3.scaleLinear().range([height, 0]).domain([0, 105]);
        const yAxis = d3.axisLeft(y).tickValues(d3.range(0, 105, 5));

        // Create line generators
        const createLineGenerator = (scoreType) => {
            return d3.line()
                .defined(d => !isNaN(d[scoreType]))
                .x(d => x(new Date(d.date)))
                .y(d => y(d[scoreType]))
                .curve(d3.curveMonotoneX);
        };
        const funLine = createLineGenerator('funScore');
        const sleepLine = createLineGenerator('sleepScore');
        const exerciseLine = createLineGenerator('exerciseScore');
        const environmentLine = createLineGenerator('environmentScore');


        // Create the SVG element
        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Add the axes
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        // Add the lines
        const addLine = (svg, processedData, lineClass, lineColor, lineFunction) => {
            svg.append('path')
                .datum(processedData)
                .attr('class', `line ${lineClass}`)
                .attr('fill', 'none')
                .attr('stroke', lineColor)
                .attr('stroke-width', 1.5)
                .attr('d', lineFunction);
        };
        addLine(svg, processedData, 'fun-line', 'steelblue', funLine);
        addLine(svg, processedData, 'sleep-line', 'red', sleepLine);
        addLine(svg, processedData, 'exercise-line', 'limeGreen', exerciseLine);
        addLine(svg, processedData, 'environment-line', 'purple', environmentLine);


        // Define the Y axis scores and add horizontal lines
        const yScores = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const lineColors = {
            0: { color: 'green', label: 'Low' },
            20: { color: 'blue', label: 'Medium-low' },
            35: { color: 'yellow', label: 'Medium' },
            50: { color: 'orange', label: 'Medium-high' },
            100: { color: 'red', label: 'High' },
        };
        yScores.forEach(score => {
            const lineColor = lineColors[score] ?? { color: '#ccc', label: '' };
            const line = svg.append('line')
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', y(score))
                .attr('y2', y(score))
                .attr('stroke', lineColor.color)
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '5,5');
            if (lineColor.label) {
                const label = svg.append('text')
                    .attr('x', width + 10)
                    .attr('y', y(score))
                    .attr('dy', '0.35em')
                    .text(lineColor.label)
                    .attr('fill', lineColor.color);
            }
        });

        // Add the legend
        const addLegendItem = (legend, x, y, color, label) => {
            legend.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', color);
            legend.append('text')
                .attr('x', x + 20)
                .attr('y', y + 10)
                .text(label)
                .style('font-size', '12px');
        };
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${width - 100}, 20)`);
        addLegendItem(legend, 0, 0, 'steelblue', 'Fun Score');
        addLegendItem(legend, 0, 20, 'red', 'Sleep Score');
        addLegendItem(legend, 0, 40, 'limeGreen', 'Exercise Score');
        addLegendItem(legend, 0, 60, 'purple', 'Environment Score');

        // Format the date for the tooltip
        const formatDate = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
        };

        // Define mouseover, mousemove, and mouseout functions for data points
        const scoreTexts = {
            fun: d => `Fun Score: ${d.funScore}`,
            sleep: d => `Sleep Score: ${d.sleepScore}`,
            exercise: d => `Exercise Score: ${d.exerciseScore}`,
            environment: d => `Environment Score: ${d.environmentScore}`,
        };

        const handlePointMouseOver = (d, assessmentType) => (event) => {
            const tooltip = d3.select('#tooltip');
            const scoreText = scoreTexts[assessmentType](d);
            tooltip
                .style('display', 'inline')
                .html(`Date: ${formatDate(d.date)}<br>${scoreText}`);
        };

        const handlePointMouseMove = (event) => {
            const tooltip = d3.select('#tooltip');
            tooltip
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        };

        const handlePointMouseOut = () => {
            d3.select('#tooltip').style('display', 'none');
        };

        // Add the data points to the chart
        const addDataPoints = (svg, processedData, scoreType, color) => {
            svg.selectAll(`.${scoreType}-point`)
                .data(processedData.filter(d => d[`${scoreType}Score`] !== undefined))
                .enter().append('circle')
                .attr('class', `${scoreType}-point`)
                .attr('cx', d => x(new Date(d.date)))
                .attr('cy', d => y(d[`${scoreType}Score`]))
                .attr('r', 5)
                .style('fill', color)
                .on('mouseover', (event, d) => handlePointMouseOver(d, scoreType)(event))
                .on('mousemove', handlePointMouseMove)
                .on('mouseout', handlePointMouseOut);
        };
        addDataPoints(svg, processedData, 'fun', 'steelblue');
        addDataPoints(svg, processedData, 'sleep', 'red');
        addDataPoints(svg, processedData, 'exercise', 'limeGreen');
        addDataPoints(svg, processedData, 'environment', 'purple');

        animateChart();

    }, [state.chartData]);

    return (
        <div>
            <div ref={chartRef} />
            <div id="tooltip" style={{position: 'absolute', display: 'none', backgroundColor: 'white', padding: '5px', border: '1px solid black'}} />
        </div>
    );

};

export default PillarAssessmentChart;
