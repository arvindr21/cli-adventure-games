import { CSSProperties, ChangeEvent, FC, memo, useState } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import { Collapse } from "react-collapse";
import Modal from 'react-modal';

const sourceHandleStyleA: CSSProperties = {
    borderRadius: '100%', borderColor: 'green',
    width: '12px', height: '12px', bottom: '25px', right: '-10px'
};

Modal.setAppElement('#root');

const GameNode: FC<NodeProps> = ({ data }) => {
    const [game, setGame] = useState({
        "name": "Dark days",
        "author": "designer; designer2",
        "email": "designer@game.com; designer2@game.com;",
        "tagline": "Where your deepest fears are imagined",
        "welcome": "Welcome to Dark days..."
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
        const name = event.target.name as keyof typeof game;
        const valu = event.target.value;
        setGame({
            ...game,
            [name]: valu
        });
    }

    return (
        <div className="game-node" style={{
            border: '1px solid #aaa',
            padding: '10px',
            background: '#fff',
            width:'300px'
        }}>
            <h5 style={{ borderBottom: '1px solid #aaa' }}>Game Definition</h5>
            <div style={{ display: collapselIsOpen ? 'none' : 'block' }}>
                <input type="button" className="button-full" value={'Manage '+game.name} onClick={() => setIsCollapseOpen(true)} />
            </div>
            <Collapse isOpened={collapselIsOpen}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{game.name}</td>
                        </tr>
                        <tr>
                            <th>Tagline</th>
                            <td>{game.tagline}</td>
                        </tr>
                        <tr>
                            <th>Welcome Text</th>
                            <td>{game.welcome}</td>
                        </tr>
                        <tr>
                            <th>Author(s)</th>
                            <td>{game.author}</td>
                        </tr>
                        <tr>
                            <th>Author(s) Email</th>
                            <td>{game.email}</td>
                        </tr>
                    </tbody>
                </table>
                <input type="button" className="button-outline" value="Collapse" onClick={() => setIsCollapseOpen(false)} />&nbsp;&nbsp;
                <button  onClick={openModal}>Edit</button>
            </Collapse>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                data={game}
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
                        <label>Game Name</label>
                        <input type="text" placeholder="Dark days" name="name" value={game.name} onChange={onChange} />

                        <label>Game Tagline</label>
                        <input type="text" name="tagline" value={game.tagline} placeholder="Where your deepest fears are imagined" onChange={onChange} />

                        <label>Game Welcome Text</label>
                        <input type="text" name="welcome" value={game.welcome} placeholder="Welcome to Dark days..." onChange={onChange} />

                        <label>Game Author(s) (semicolon separated)</label>
                        <input type="text" name="author" value={game.author} placeholder="designer; designer2" onChange={onChange} />

                        <label>Author(s) Email (semicolon separated)</label>
                        <input type="text" name="email" value={game.email} placeholder="designer@game.com; designer2@game.com;" onChange={onChange} />

                        <input className="button-primary" type="button" value="Close" onClick={closeModal} />
                    </fieldset></form>


            </Modal>

            <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyleA} />


        </div>
    );
};

export default memo(GameNode);