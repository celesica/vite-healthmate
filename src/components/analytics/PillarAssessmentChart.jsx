import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useChartDataContext } from '../../context/ChartDataContext';

const PillarAssessmentChart = () => {
    const { state } = useChartDataContext();
    const chartRef = useRef(null);

    const animateChart = () => {
        const svg = d3.select(chartRef.current).select('svg');

        const funPath = svg.select('.fun-line');
        const funPathLength = funPath.node().getTotalLength();
        funPath
            .attr('stroke-dasharray', `${funPathLength} ${funPathLength}`)
            .attr('stroke-dashoffset', funPathLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        const sleepPath = svg.select('.sleep-line');
        const sleepPathLength = sleepPath.node().getTotalLength();
        sleepPath
            .attr('stroke-dasharray', `${sleepPathLength} ${sleepPathLength}`)
            .attr('stroke-dashoffset', sleepPathLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);
    };

    useEffect(() => {
        if (!chartRef.current || !state.chartData.funAssessments.length || !state.chartData.sleepAssessments.length) return;

        d3.select(chartRef.current).selectAll('*').remove();
        // Combine and sort data by date
        const combinedData = [...state.chartData.funAssessments, ...state.chartData.sleepAssessments].sort(
            (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate),
        );

        // Process data, create an array of objects containing date, funScore, and sleepScore
        const processedData = combinedData.map((data) => {
            const isFun = data.formType === 'pillarAssessments' && data.formName === "Fun Assessment";
            const isSleep = data.formType === 'pillarAssessments' && data.formName === "Sleep Assessment";

            return {
                date: data.submissionDate.toDate(),
                funScore: isFun ? data.formScore : undefined,
                sleepScore: isSleep ? data.formScore : undefined,
            };
        });

        // Create the chart using D3.js
        // Set dimensions and margins
        const margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Create scales
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Create line generators
        const funLine = d3.line()
            .defined(d => !isNaN(d.funScore))
            .x(d => x(new Date(d.date)))
            .y(d => y(d.funScore))
            .curve(d3.curveMonotoneX);

        const sleepLine = d3.line()
            .defined(d => !isNaN(d.sleepScore))
            .x(d => x(new Date(d.date)))
            .y(d => y(d.sleepScore))
            .curve(d3.curveMonotoneX);


        // Set the domains of the scales
        x.domain(d3.extent(processedData, d => new Date(d.date)));
        y.domain([0, d3.max(processedData, d => Math.max(d.funScore || 0, d.sleepScore || 0))]);

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
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(y));

        // Add fun line
        svg.append('path')
            .datum(processedData)
            .attr('class', 'line fun-line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', funLine);

        // Add sleep line
        svg.append('path')
            .datum(processedData)
            .attr('class', 'line sleep-line')
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 1.5)
            .attr('d', sleepLine);

        // Add a legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(' + (width - 100) + ',' + 20 + ')');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', 'steelblue');

        legend.append('text')
            .attr('x', 20)
            .attr('y', 10)
            .text('Fun Score')
            .style('font-size', '12px');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', 'red');

        legend.append('text')
            .attr('x', 20)
            .attr('y', 30)
            .text('Sleep Score')
            .style('font-size', '12px');

        const formatDate = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
        };

        const handlePointMouseOver = (d, assessmentType) => (event) => {
            const tooltip = d3.select('#tooltip');
            const scoreText = assessmentType === 'fun' ? `Fun Score: ${d.funScore}` : `Sleep Score: ${d.sleepScore}`;
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

        // Add fun data points
        svg.selectAll('.fun-point')
            .data(processedData.filter(d => d.funScore !== undefined))
            .enter().append('circle')
            .attr('class', 'fun-point')
            .attr('cx', d => x(new Date(d.date)))
            .attr('cy', d => y(d.funScore))
            .attr('r', 5)
            .style('fill', 'steelblue')
            .on('mouseover', (event, d) => handlePointMouseOver(d, 'fun')(event))
            .on('mousemove', handlePointMouseMove)
            .on('mouseout', handlePointMouseOut);

// Add sleep data points
        svg.selectAll('.sleep-point')
            .data(processedData.filter(d => d.sleepScore !== undefined))
            .enter().append('circle')
            .attr('class', 'sleep-point')
            .attr('cx', d => x(new Date(d.date)))
            .attr('cy', d => y(d.sleepScore))
            .attr('r', 5)
            .style('fill', 'red')
            .on('mouseover', (event, d) => handlePointMouseOver(d, 'sleep')(event))
            .on('mousemove', handlePointMouseMove)
            .on('mouseout', handlePointMouseOut);

        animateChart();

    }, [state.chartData]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!chartRef.current) return;
    //
    //         const svg = d3.select(chartRef.current).select('svg');
    //
    //         const funPath = svg.select('.fun-line');
    //         const funPathLength = funPath.node()?.getTotalLength() || 0;
    //         funPath
    //             .attr('stroke-dasharray', `${funPathLength} ${funPathLength}`)
    //             .attr('stroke-dashoffset', funPathLength)
    //             .transition()
    //             .duration(2000)
    //             .ease(d3.easeLinear)
    //             .attr('stroke-dashoffset', 0);
    //
    //         const sleepPath = svg.select('.sleep-line');
    //         const sleepPathLength = sleepPath.node()?.getTotalLength() || 0;
    //         sleepPath
    //             .attr('stroke-dasharray', `${sleepPathLength} ${sleepPathLength}`)
    //             .attr('stroke-dashoffset', sleepPathLength)
    //             .transition()
    //             .duration(2000)
    //             .ease(d3.easeLinear)
    //             .attr('stroke-dashoffset', 0);
    //     }, 10);
    //
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div>
            <div ref={chartRef} />
            <div id="tooltip" style={{position: 'absolute', display: 'none', backgroundColor: 'white', padding: '5px', border: '1px solid black'}} />
        </div>
    );

};

export default PillarAssessmentChart;
