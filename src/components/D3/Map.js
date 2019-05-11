import React, { useEffect } from 'react';
import * as d3 from "d3";

import { colors, districtsParam } from './utils';
import './Map.css'

export default ({ data }) => {
    const { districts, gradient, signs, modul } = data

    useEffect(() => {
        draveMap();
    });

    const draveMap = () => {
        const svg = d3.select('.canvas')
          .append('svg')
                .attr('viewBox', '0 0 1300 700');

        
        const map = svg.append('g')
                    .attr('transform', 'translate(150 10)');
                    
        const rects = svg.append('g');

        
        for (let i = 0; i <= 4; i++) {
            let gradientTo = gradient[i -1 ]
            let to = 'до'
            if(!gradientTo) {
                gradientTo = ''
                to = ''
            }
            
            rects.append('rect')
                .attr('width', 60)
                .attr('height', 20)
                .attr('fill', colors[i])
                .attr('x', 200)
                .attr('y', 430 + i * 35)
                .attr('stroke', 'black');
            rects.append('text')
                .text(`від ${gradient[i]} ${to} ${gradientTo} ${signs}`)
                .attr('widht', 700)
                .attr('height', 20)
                .attr('fill', 'black')
                .attr('stroke', 'black')
                .attr('x', 270)
                .attr('y', 445 + i * 35);
                
        }
        let color = []
        for (let i = 0; i <= 26; i++) {
            if (districts[i] > gradient[0] * modul) color[i] = colors[0];
            else if (districts[i] < gradient[0] * modul && districts[i] > gradient[1] * modul) color[i] = colors[1];
            else if (districts[i] < gradient[1] * modul && districts[i] > gradient[2] * modul) color[i] = colors[2];
            else if (districts[i] < gradient[2] * modul && districts[i] > gradient[3] * modul) color[i] = colors[3];
            else if (districts[i] < gradient[3] * modul && districts[i] > 0) color[i] = colors[4];
            
            const mapWrap =map.append('g')
            mapWrap.append('path')
                .attr('d', districtsParam[i].path)
                .attr('fill', color[i])
                .attr('class', 'district')
            mapWrap.append('text')
                .text(`${districts[i]}`)
                .attr('class', 'text')
                .attr('y', 28)
                

        }
    };

    return (
        <div className="canvas" ></div>
    )   

}