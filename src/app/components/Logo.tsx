import logoImage from "./assets/images/luxislogo.png";

interface LogoProps {
  variant?: "light" | "dark";
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "light", showIcon = false, size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "text-[#fffefe]" : "text-[#191919]";
  const goldColor = "text-[#fcb316]";
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };
  
  const imageSizes = {
    sm: 32,
    md: 48,
    lg: 64
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <img src={logoImage} alt="LUXIS Logo" style={{ width: imageSizes[size], height: imageSizes[size] }} className="object-contain" />
      )}
      <h1 className={`${sizeClasses[size]} tracking-tight`} style={{ fontFamily: 'var(--font-headline)' }}>
        <span className={textColor}>LU</span>
        <span className={goldColor}>X</span>
        <span className={textColor}>IS</span>
      </h1>
    </div>
  );
}
