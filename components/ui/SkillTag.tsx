interface SkillTagProps {
  name: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ name }) => (
  <div className="px-3 py-2 bg-soft-white dark:bg-dark-secondary border border-light dark:border-dark-tertiary rounded-sm hover:border-primary transition-all group">
    <span className="text-sm font-mono font-medium text-dark-tertiary dark:text-gray-300 group-hover:text-primary transition-colors">
      {name}
    </span>
  </div>
);

export default SkillTag;
