interface GoTwoTextProps {
  className?: string;
}

const GoTwoText = ({ className = "" }: GoTwoTextProps) => {
  return (
    <span className={`logo-text ${className}`}>
      <span className="go">Go</span>
      <span className="two">Two</span>
    </span>
  );
};

export default GoTwoText;
