interface LogoProps {
  variant?: "light" | "dark";
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "text-[#fffefe]" : "text-[#191919]";
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <h1 className={`${sizeClasses[size]} tracking-tight`} style={{ fontFamily: 'var(--font-headline)' }}>
        <span className={textColor}>NEAT</span>
      </h1>
    </div>
  );
}
