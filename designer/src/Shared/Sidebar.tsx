import { faDiceD6, faDoorOpen, faGamepad } from '@fortawesome/free-solid-svg-icons'

import { DragEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { useStoreActions, useStoreState } from 'react-flow-renderer';


const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = ({ onClear, onSave, onExport, onRestore, onLayout }: any) => {
    // const nodes = useStoreState((store) => store.nodes);
    // const transform = useStoreState((store) => store.transform);
    // const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    // const selectAll = () => {
    //     setSelectedElements(nodes.map((node) => ({ id: node.id, type: node.type })));
    // };

    return (
        <aside>
            <h4 style={{ borderBottom: '1px solid #aaa' }}>Game Script Components</h4>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode card-shadow draggableI"
                onDragStart={(event: DragEvent) => onDragStart(event, 'GameNode')} draggable>
                    <FontAwesomeIcon icon={faGamepad} className="icon"/>
                Game
      </div>
            <div className="dndnode card-shadow draggableI"
                onDragStart={(event: DragEvent) => onDragStart(event, 'RoomNode')} draggable>
                    <FontAwesomeIcon icon={faDiceD6} className="icon"/>
                Room
      </div>
            <div className="dndnode card-shadow draggableI"
                onDragStart={(event: DragEvent) => onDragStart(event, 'ExitNode')} draggable>
                    <FontAwesomeIcon icon={faDoorOpen} className="icon"/>
                Exit
      </div>
            {/* <hr />
            <div className="title">Zoom & pan transform</div>
            <div className="transform">
                [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
            <div className="title">Nodes</div>
            {nodes.map((node) => (
                <div key={node.id}>
                    Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)}
                </div>
            ))}

            <div className="selectall">
                <button onClick={selectAll}>select all nodes</button>
            </div> */}
            <hr />
            <input type="button" className="button button-full" value="Clear" onClick={() => onClear([])} />
            <input type="button" className="button button-outline" value="Save" onClick={() => onSave([])} /> &nbsp;&nbsp;
            <input type="button" className="button button-outline" value="Restore" onClick={() => onRestore([])} />
            <input type="button" className="button button-full button-outline" value="Export" onClick={() => onExport([])} />
            <input type="button" className="button button-outline" value="Vertical Layout" onClick={() => onLayout('TB')} /> &nbsp;&nbsp;
            <input type="button" className="button button-outline" value="Horizontal Layout" onClick={() => onLayout('LR')} />
        </aside>
    );
};

export default Sidebar;
