import React from 'react';

/**
 * Componente de Logo da Aplicação.
 * Exibe o ícone e o nome "ClimaMaster".
 * 
 * @param {Object} props
 * @param {number} props.width Largura do logo (default: 180)
 * @param {boolean} props.showText Se deve exibir o texto (default: true)
 * @param {boolean} props.condensed Se deve exibir a versão condensada (default: false)
 */
const Logo = ({ width = 180, showText = true, condensed = false }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '100%' }}>
      {/* Dynamic SVG Icon - Sun & Cloud */}
      {/* Usando o ícone personalizado do usuário em 3D */}
      <img
        src="/logo-climamaster-clean.png"
        alt="Weather Icon"
        width={condensed ? 40 : 48}
        height={condensed ? 40 : 48}
        style={{ 
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
      />

      {/* Marca Texto */}
      {showText && !condensed && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ 
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 800, 
            fontSize: '20px', 
            color: '#0f172a',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Clima<span style={{ color: '#1976D2' }}>Master</span>
          </span>
          <span style={{ 
            fontSize: '10px', 
            color: '#64748b', 
            fontWeight: 500, 
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Monitoring
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
