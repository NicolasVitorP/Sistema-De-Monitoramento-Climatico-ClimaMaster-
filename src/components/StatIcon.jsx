import React from 'react';

/**
 * Componente simples para exibir um ícone com fundo colorido.
 * 
 * @param {Object} props
 * @param {ReactNode} props.icon Ícone a ser exibido
 * @param {string} props.color Cor base para o ícone e fundo
 */
const StatIcon = ({ icon, color }) => (
    <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `${color}1A`, // 10% opacity (hex + 1A)
        color: color,
        fontSize: '24px'
    }}>
        {icon}
    </div>
);

export default StatIcon;
