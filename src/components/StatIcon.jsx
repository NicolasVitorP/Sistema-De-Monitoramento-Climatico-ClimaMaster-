import React from 'react';

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
