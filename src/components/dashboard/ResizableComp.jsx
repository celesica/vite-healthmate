import React, { useState } from 'react';
import ResizableAndDraggable from './ResizableAndDraggable';
import PillarAssessmentChart from "../analytics/Charts/PillarAssessmentChart.jsx";

const MyResizableAndDraggableComponent = () => {
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleResize = (newSize) => {
        setSize(newSize);
    };

    const handleDrag = (newPosition) => {
        setPosition(newPosition);
    };

    return (
        <ResizableAndDraggable
            width={size.width}
            height={size.height}
            onResize={handleResize}
            onDrag={handleDrag}
        >
            <div className="bg-blue-500 text-white p-2">
                <PillarAssessmentChart />
            </div>
        </ResizableAndDraggable>
    );
};

export default MyResizableAndDraggableComponent;