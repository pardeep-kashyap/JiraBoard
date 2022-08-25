import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';


const Model = ({ modalVisible, children }) => {
    return (
        <>
            <Modal
                title="Vertically centered modal dialog"
                centered
                width={700}
                footer={null}

                visible={modalVisible}
            >
                {
                    children
                }
            </Modal>
        </>
    );
};

export default Model;