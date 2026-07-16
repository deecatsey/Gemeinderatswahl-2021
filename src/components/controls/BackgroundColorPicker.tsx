import { useState } from "react";

export const BackgroundColorPicker = () => {
  const [bgColor, setBgColor] = useState("#ffffff");
  return (
    <input
      type="color"
      value={bgColor}
      onChange={(e) => setBgColor(e.target.value)}
    />
  );
};
