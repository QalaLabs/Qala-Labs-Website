import React from 'react';

// Bounding boxes of actual logo content within the 1024x1024 PNGs
const SYMBOL_BBOX = { x1: 255, y1: 269, x2: 810, y2: 717, img: 1024 };
const FULL_BBOX   = { x1: 167, y1: 392, x2: 861, y2: 618, img: 1024 };

function cropStyles(b: typeof SYMBOL_BBOX, contentHeight: number) {
  const scale = contentHeight / (b.y2 - b.y1);
  return {
    wrapper: {
      width: `${(b.x2 - b.x1) * scale}px`,
      height: `${contentHeight}px`,
      overflow: 'hidden' as const,
      flexShrink: 0 as const,
    },
    img: {
      height: `${b.img * scale}px`,
      width: 'auto',
      marginTop: `${-b.y1 * scale}px`,
      marginLeft: `${-b.x1 * scale}px`,
      maxWidth: 'none',
      display: 'block',
    },
  };
}

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, size = 36 }) => {
  const bbox = iconOnly ? SYMBOL_BBOX : FULL_BBOX;
  const { wrapper, img } = cropStyles(bbox, size);

  return (
    <div className={`flex items-center select-none ${className}`}>
      <div style={wrapper}>
        <img
          src={iconOnly ? '/assets/qala/qala-logo-symbol.png' : '/assets/qala/qala-logo-full.png'}
          alt="Qala Labs"
          style={img}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Logo;
