interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({
  name,
  width = 24,
  height = 24,
  className,
}: IconProps) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
