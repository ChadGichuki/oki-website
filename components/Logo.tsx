import Image from "next/image";
import logo from "@/public/brand/oki-logo.png";
import mark from "@/public/brand/oki-mark.png";
import { site } from "@/content/site";

type LogoProps = {
  /** "full": bulb + "ki DIGITAL" lockup (light surfaces). "mark": orange bulb tile (any surface). */
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
};

/** OKI Digital logo, from the design canvas assets. */
export function Logo({ variant = "full", className = "", priority = false }: LogoProps) {
  if (variant === "mark") {
    return <Image src={mark} alt={site.logoAlt} width={32} height={32} className={`rounded ${className}`} />;
  }
  return (
    <Image
      src={logo}
      alt={site.logoAlt}
      height={40}
      style={{ width: "auto" }}
      priority={priority}
      className={className}
    />
  );
}
