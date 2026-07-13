import type { ReactNode } from "react";

type ControlsContainerProps = {
  children: ReactNode;
  anchor: { top: number; left?: number; right?: number };
};

export const ControlsContainer = ({
  children,
  anchor,
}: ControlsContainerProps) => {
  return (
    <div
      style={{
        ...anchor,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "1.5em",
        zIndex: 1000,
        backgroundColor: "#FFFFFF", //TODO: make dynamic based on theme
        padding: "0.5em", //TODO: based on theme spacing
        borderRadius: "0.5em",
      }}
    >
      {children}
    </div>
  );
};
