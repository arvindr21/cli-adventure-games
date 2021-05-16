import React, { DragEvent } from 'react';

const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = ({ onClear, onSave, onExport, onRestore, onLayout }: any) => {
    return (
        <aside>
            <h4 style={{ borderBottom: '1px solid #aaa' }}>Game Script Components</h4>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input"
                onDragStart={(event: DragEvent) => onDragStart(event, 'GameNode')} draggable>
                Game
      </div>
            <div className="dndnode"
                onDragStart={(event: DragEvent) => onDragStart(event, 'RoomNode')} draggable>
                Room
      </div>
            <div className="dndnode output"
                onDragStart={(event: DragEvent) => onDragStart(event, 'ExitNode')} draggable>
                Exit
      </div>
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
