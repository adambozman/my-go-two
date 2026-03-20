interface CoverflowTitlePillProps {
  title: string;
  className?: string;
}

const CoverflowTitlePill = ({ title, className = "" }: CoverflowTitlePillProps) => {
  return (
    <div className="coverflow-stage-title-wrap">
      <div className={`coverflow-title-pill ${className}`.trim()}>
        <h2 className="coverflow-stage-title text-center">{title}</h2>
      </div>
    </div>
  );
};

export default CoverflowTitlePill;
