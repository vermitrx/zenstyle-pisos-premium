type SpacerSectionProps = {
  mobileHeight?: string;
  desktopHeight?: string;
  background?: string;
};

export default function SpacerSection({
  mobileHeight = "h-5",
  desktopHeight = "lg:h-20",
  background = "bg-white",
}: SpacerSectionProps) {
  return (
    <div
      aria-hidden="true"
      className={`${mobileHeight} ${desktopHeight} ${background}`}
    />
  );
}