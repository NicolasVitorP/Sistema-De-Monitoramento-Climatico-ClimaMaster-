import React from 'react';
import { Modal, Image } from 'antd';

const IconPreviewModal = ({ url, open, onClose }) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            title="Visualização do Ícone"
        >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Image
                    src={url}
                    alt="Ícone do Estado do Tempo"
                    fallback="https://via.placeholder.com/150?text=Sem+G%C3%A5o"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                    preview={false}
                />
            </div>
        </Modal>
    );
};

export default IconPreviewModal;
