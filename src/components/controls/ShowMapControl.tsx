import { useAtom } from "jotai";
import { showMapAtom } from "../../atoms/atoms";

export const ShowMapControl = () => {
  const [showMap, setShowMap] = useAtom(showMapAtom);

  return (
    <div>
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
        Karte anzeigen
      </label>
    </div>
  );
};
