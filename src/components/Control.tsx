import { useAtom } from "jotai";
import { showMapAtom } from "../atoms/atoms";

export const Control = () => {
  const [showMap, setShowMap] = useAtom(showMapAtom);

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 10,
        zIndex: 1000,
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <input
          type="checkbox"
          checked={showMap}
          onChange={(e) => setShowMap(e.target.checked)}
        />
        Show map
      </label>
    </div>
  );
};
