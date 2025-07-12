

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

const Icon = ({ name, size = 24, className }: IconProps) => (
  <svg width={size} height={size} className={className}>
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
