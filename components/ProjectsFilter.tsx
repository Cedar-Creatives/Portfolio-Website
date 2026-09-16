type Props = {
  categories: string[]
  stacks: string[]
  activeCategory: string
  activeStack: string
  onCategoryChange: (value: string) => void
  onStackChange: (value: string) => void
}

export default function ProjectsFilter({
  categories,
  stacks,
  activeCategory,
  activeStack,
  onCategoryChange,
  onStackChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Category row */}
      <div>
        <p className="text-muted text-xs font-mono uppercase tracking-wider mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-gold text-bg'
                  : 'border border-border text-muted hover:border-gold'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stack row */}
      <div>
        <p className="text-muted text-xs font-mono uppercase tracking-wider mb-3">Stack</p>
        <div className="flex flex-wrap gap-2">
          {stacks.map((stack) => (
            <button
              key={stack}
              onClick={() => onStackChange(stack)}
              className={`text-sm font-mono px-4 py-2 rounded-full transition-colors duration-200 ${
                activeStack === stack
                  ? 'bg-gold text-bg'
                  : 'border border-border text-muted hover:border-gold'
              }`}
              aria-pressed={activeStack === stack}
            >
              {stack}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
