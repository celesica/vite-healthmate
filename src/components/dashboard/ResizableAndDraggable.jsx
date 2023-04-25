import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

const ResizableAndDraggable = ({ width, height, onResize, onDrag, children }) => {
    return (
        <Draggable
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            onStop={(event, { x, y }) => onDrag({ x, y })}
        >
            <ResizableBox
                width={width}
                height={height}
                minConstraints={[100, 100]}
                maxConstraints={[window.innerWidth - 100, window.innerHeight - 100]}
                onResize={(event, { size }) => onResize(size)}
            >
                <div className="border p-2 handle" style={{ height: '100%' }}>
                    {children}
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default ResizableAndDraggable;
