import React from "react";

interface DynamicIconProps {
  icon: React.ElementType | null;
  size?: number;
  color?: string;
  onClick?: () => void;
  selected?: boolean;
  colorSelected?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  icon: IconComponent,
  size,
  color,
  onClick,
  selected,
  colorSelected,
}) => {
  return (
    <>
      {IconComponent && (
        <IconComponent
          onClick={onClick}
          color={selected ? colorSelected : color}
          {...(size && { size })}
        />
      )}
    </>
  );
};

export default DynamicIcon;
