import { CSSProperties, FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

const sourceHandleStyleA: CSSProperties = {
    borderRadius: '100%', borderColor: 'green',
    width: '6px', bottom: '25px'
};

const ExitNode: FC<NodeProps> = ({ data }) => {
    return (
        <div className="game-node" style={{
            border: '1px solid #aaa',
            padding: '10px', width: '300px',
            background: '#fff'
        }}>
            <h5 style={{ borderBottom: '1px solid #aaa' }}>Exit</h5>
            <label style={{fontSize: '1.3rem'}}>Game Name</label>
            <input className="nodrag" type="text" defaultValue={data.color} required />
            <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyleA} />
        </div>
    );
};

export default memo(ExitNode);