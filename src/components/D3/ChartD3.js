import React, { useEffect } from 'react';
import * as d3 from "d3";

import { districtNames } from './utils';
import './Map.css'

export default ({ data }) => {
    const { districts, gradient, signs, modul } = data

    useEffect(() => {
        draveMap();
    });

    const draveMap = () => {
        //create objects with districts name
        const dataObj = []
        for ( let i = 0; i < 27; i++) {
            dataObj.push({name: districtNames[i], orders: districts[i] })
        }
        dataObj.sort((a, b) => +a.orders < +b.orders)

        const svg = d3.select('.chart')
        .append('svg')
            .attr('viewBox', '0 0 1300 700')
            

        // create margins & dimensions
        const margin = {top: 20, right: 20, bottom: 200, left: 100};
        const graphWidth = 1300 - margin.left - margin.right;
        const graphHeight = 700 - margin.top - margin.bottom;

        const graph = svg.append('g')
        .attr('width', graphWidth )
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // create axes groups
        const xAxisGroup = graph.append('g')
        .attr('transform', `translate(0, ${graphHeight})`)

        const yAxisGroup = graph.append('g');
        
            const y = d3.scaleLinear()
                .domain([0, d3.max(dataObj, d => d.orders)])
                .range([graphHeight, 0]);

            const x = d3.scaleBand()
                .domain(dataObj.map(item => item.name))
                .range([0, graphWidth])
                .paddingInner(0.2)
                .paddingOuter(0.2);

            // join the data to circs
            const rects = graph.selectAll('rect')
                .data(dataObj);

            // add attrs to circs already in the DOM
            rects.attr('width', x.bandwidth )
                .attr('fill', `rgb(${Math.random() * 99}, ${Math.random() * 99}, ${Math.random() * 99})`)
                .attr('x', d => { return x(d.name)})
                .transition().duration(2500)
                //transition (const t = d3.transition().duration(500) міняєм на .transition(t))
                .attr("height", d => graphHeight - y(d.orders))
                .attr('y', d => y(d.orders));

            // append the enter selection to the DOM
            rects.enter()
                .append('rect')
                .attr('width', x.bandwidth )
                .attr("height", 0)
                .attr('fill', d => `rgb(${Math.random() * 99}, ${Math.random() * 99}, ${Math.random() * 99})`)
                .attr('x', (d) => x(d.name))
                .attr('y', graphHeight)
                .merge(rects)//добавляє код з низу до всіх rects
                .transition().duration(2500)//transitoon
                    .attr('y', d => y(d.orders))
                    .attr("height", d => graphHeight - y(d.orders));
            

            // create & call axesit
            const xAxis = d3.axisBottom(x);
            const yAxis = d3.axisLeft(y)
                .ticks(3)
                .tickFormat(d => d / modul  + ' ' + signs);

            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);

            xAxisGroup.selectAll('text')
                .attr('fill', 'black')
                .attr('transform', 'rotate(-70)')
                .attr('text-anchor', 'end')
                .attr('font-size', 20)
                .attr('x', -10)
                .attr('y', -5)

        ;
    };

    return (
        <div className="chart" ></div>
    )   

}