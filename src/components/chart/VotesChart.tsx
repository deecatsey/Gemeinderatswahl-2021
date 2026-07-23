import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Parties as PartiesConsts,
  type PartyIdentifier,
} from "../../consts/parties";
import type { ElectionFeature } from "../../types/features";
import { getColor } from "../../utils/get-party-color";

type VotesChartProps = { feature: ElectionFeature };

export const VotesChart = ({ feature }: VotesChartProps) => {
  // if (!feature) return null;

  // if (!feature.properties) return null;
  const {
    feature: {
      properties: { votes },
    },
  } = feature;

  const getResults = (data: Record<string, number>, parties: string[]) =>
    Object.fromEntries(
      parties.map((p) => [
        p,
        p === "Wahlberechtigte"
          ? data.Wahlberechtigte - data["Wahlberechtigte"]
          : (data[p] ?? 0),
      ]),
    );

  const voteData = getResults(votes, Object.keys(PartiesConsts));
  console.log("VOTE DATA", voteData);

  const chartData = Object.entries(voteData)
    .map(([name, votes]) => ({ name, votes }))
    .sort((a, b) => b.votes - a.votes);

  // const votes = feature.feature.properties.votes;
  // if (!votes) return null;

  return (
    <div className="bar-chart-container">
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Bar
          dataKey="votes"
          radius={[5, 5, 0, 0]}
          shape={(props) => {
            return (
              <Rectangle
                {...props}
                fill={getColor(props.payload.name) ?? "#999999"}
              />
            );
          }}
        />
      </BarChart>
    </div>
  );
};
