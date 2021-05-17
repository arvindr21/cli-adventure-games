import './index.css';

import React, { DragEvent, useCallback, useState } from 'react';
import ReactFlow, {
    ArrowHeadType,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    ElementId,
    Elements,
    MiniMap,
    Node,
    OnLoadParams,
    Position,
    ReactFlowProvider,
    addEdge,
    isNode,
    removeElements,
    useZoomPanHelper
} from 'react-flow-renderer';

import ExitNode from './Nodes/Exit';
import GameNode from './Nodes/Game';
import Logo from './logo.svg';
import RoomNode from './Nodes/Room';
import Sidebar from './Shared/Sidebar';
import dagre from 'dagre';
import { useToasts } from 'react-toast-notifications';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const edgeType = 'SmoothStepEdge';
const nodeTypes = {
    GameNode,
    RoomNode,
    ExitNode
};

let id = 0;
const getId = (): ElementId => `gsd_${id++}`;

const initialElements = [{
    id: getId(),
    type: 'GameNode',
    data: { label: 'Game', color: '#eee' },
    position: { x: 25, y: 25 }
}];

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

function App() {
    const { addToast } = useToasts();
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements);
    const { transform } = useZoomPanHelper();
    const onConnect = (params: Connection | Edge) => {
        params = params as Edge;
        params.label = `To ${params.targetHandle}`;
        params.animated = true;
        params.arrowHeadType = ArrowHeadType.Arrow;
        params.type = edgeType;
        setElements((els) => addEdge(params, els));
    }
    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
        restore();
    }

    const layout = (direction: string) => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        elements.forEach((el) => {
            if (isNode(el)) {
                dagreGraph.setNode(el.id, { width: 300, height: 125 });
            } else {
                dagreGraph.setEdge(el.source, el.target);
            }
        });

        dagre.layout(dagreGraph);

        const layoutedElements = elements.map((el) => {
            if (isNode(el)) {
                const nodeWithPosition = dagreGraph.node(el.id);
                el.targetPosition = isHorizontal ? Position.Left : Position.Top;
                el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
                el.position = { x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y };
            }

            return el;
        });

        setElements(layoutedElements);
    };

    const save = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem('gds', JSON.stringify(flow));
            console.log(flow);
        }
    }, [reactFlowInstance]);

    const exportMap = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            console.log(flow);
        }
    }, [reactFlowInstance]);

    const restore = useCallback(() => {
        const flow = JSON.parse(localStorage.getItem('gds') || '{}');

        if (flow) {
            const [x = 0, y = 0] = flow.position;
            setElements(flow.elements || []);
            transform({ x, y, zoom: flow.zoom || 0 });
            id = flow.elements.length - 1;
        }

    }, [setElements, transform]);

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        if (reactFlowInstance) {
            const type = event.dataTransfer.getData('application/reactflow');
            if (elements.length > 0) {
                let unqGameNodes = elements.filter(node => {
                    return node.type === 'GameNode'
                })
                if (unqGameNodes.length > 0 && type === 'GameNode') {
                    addToast('There can be only one game node!', { appearance: 'error' });
                    return;
                }
            }
            const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };



            setElements((es) => es.concat(newNode));
        }
    };

    const clearMap = (args: Array<any>) => {
        setElements(args);
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>
                <img src={Logo} alt="App Logo" height={45} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                <span style={{ verticalAlign: 'middle' }}>Game Script Designer | CLI Adventure Games</span>
            </h1>

            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper">
                        <ReactFlow
                            elements={elements}
                            snapToGrid={true}
                            onConnect={onConnect}
                            onElementsRemove={onElementsRemove}
                            onLoad={onLoad}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodeTypes={nodeTypes}
                        >
                            <Background
                                variant={BackgroundVariant.Lines}
                            />
                            <MiniMap
                                nodeColor={(node) => {
                                    switch (node.type) {
                                        case 'GameNode':
                                            return 'green';
                                        case 'RoomNode':
                                            return 'blue';
                                        case 'ExitNode':
                                            return 'red';
                                        default:
                                            return '#eee';
                                    }
                                }}
                                nodeStrokeWidth={3}
                            />
                            <Controls />
                        </ReactFlow>
                    </div>
                    <Sidebar onClear={clearMap} onSave={save} onExport={exportMap} onRestore={restore} onLayout={layout} />

                </ReactFlowProvider>
            </div>
        </>
    );
}

export default App;
