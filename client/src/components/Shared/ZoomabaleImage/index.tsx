import React, { useState, useRef } from 'react';
import './ZoomableImage.scss';

interface ZoomableImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className }) => {
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef: any = useRef(null);

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = containerRef?.current?.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`zoomable-image-container ${zoom ? 'zoomed' : ''} ${className}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
      }}
    >
      {!zoom && <img src={src} alt={alt} />}
    </div>
  );
};

export default ZoomableImage;
