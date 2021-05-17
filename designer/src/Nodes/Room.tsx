import { CSSProperties, ChangeEvent, FC, memo, useState } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { faAngleDoubleDown, faAngleDoubleUp, faDiceD6, faEdit, faTasks, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Collapse } from "react-collapse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

const handleStyle: CSSProperties = {
    borderRadius: '100%', borderColor: 'green',
    width: '12px', height: '12px', bottom: '25px'
};

const eastHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 50, top: '-10px' };
const westHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 120, top: '-10px' };
const northHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 190, top: '-10px' };
const southHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 250, top: '-10px' };

const eastSHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 50, bottom: '-10px' };
const westSHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 120, bottom: '-10px' };
const northSHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 190, bottom: '-10px' };
const southSHandleStyle: CSSProperties = { ...handleStyle, right: 'auto', left: 250, bottom: '-10px' };

Modal.setAppElement('#root');

const RoomNode: FC<NodeProps> = ({ data }) => {
    const [room, setRoom] = useState({
        "alias": "Exit",
        "description": "  The game ends now.. Yeah!!! :o",
        "contextualhelp": "",
    })
    const [modalIsOpen, setIsOpen] = useState(false);
    const [collapselIsOpen, setIsCollapseOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof typeof room;
        const valu = event.target.value;
        setRoom({
            ...room,
            [name]: valu
        });
    }

    return (
        <div className="room-node" style={{
            border: '1px solid #aaa',
            padding: '10px',
            background: '#fff',
            width: '300px'
        }}>
            <Handle type="target" position={Position.Top} id="east" style={eastHandleStyle} />
            <Handle type="target" position={Position.Top} id="west" style={westHandleStyle} />
            <Handle type="target" position={Position.Top} id="north" style={northHandleStyle} />
            <Handle type="target" position={Position.Top} id="south" style={southHandleStyle} />
            <h5 style={{ borderBottom: '1px solid #aaa' }}>
                <FontAwesomeIcon icon={faDiceD6} className="icon mb-0" />
                Room Definition
                </h5>
            <div style={{ display: collapselIsOpen ? 'none' : 'block' }}>
                <button className="button-full" onClick={() => setIsCollapseOpen(true)}>
                    <FontAwesomeIcon icon={faTasks} className="icon mb-0" />
                    {'Manage ' + room.alias}
                    <FontAwesomeIcon icon={faAngleDoubleDown} className="icon mb-0" />
                </button>
            </div>
            <Collapse isOpened={collapselIsOpen}>
                <table>
                    <tbody>
                        <tr>
                            <th>Alias</th>
                            <td>{room.alias}</td>
                        </tr>

                    </tbody>
                </table>
                <button className="button-outline" onClick={() => setIsCollapseOpen(false)}>
                    Collapse
                <FontAwesomeIcon icon={faAngleDoubleUp} className="icon mb-0" />
                </button>
                &nbsp;&nbsp;
                <button onClick={openModal}>
                    <FontAwesomeIcon icon={faEdit} className="icon mb-0" />
                    Edit
                </button>
            </Collapse>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                data={room}
                style={{
                    content: {
                        width: '50%',
                        margin: '0 auto',
                        height: '75%'
                    }
                }}
            >

                <h2>Game Data
                    {/* <button className="float-right button-clear" onClick={closeModal}>x</button> */}
                </h2>
                <hr />
                <form>
                    <fieldset>
                        <label>Alias</label>
                        <input type="text" placeholder="Dark days" name="alias" value={room.alias} onChange={onChange} />

                        <button className="button-primary" type="button" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} className="icon mb-0" />
                        Close
                            </button>
                    </fieldset></form>


            </Modal>

            <Handle type="source" position={Position.Bottom} id="east" style={eastSHandleStyle} />
            <Handle type="source" position={Position.Bottom} id="west" style={westSHandleStyle} />
            <Handle type="source" position={Position.Bottom} id="north" style={northSHandleStyle} />
            <Handle type="source" position={Position.Bottom} id="south" style={southSHandleStyle} />


        </div>
    );
};

export default memo(RoomNode);