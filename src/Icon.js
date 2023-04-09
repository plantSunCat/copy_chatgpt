import React from "react";

const Icon = ({ src, alt, size, hoverColor, style, ...rest }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <img
      aria-label="图标"
      src={src}
      alt={alt} //用于提供当图像无法显示时的替代文本
      style={{
        ...style,
        width: size,
        height: size,
        cursor: "pointer",
        filter: isHovered ? `brightness(120%) hue-rotate(20deg)` : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    />
  );
};

export default Icon;