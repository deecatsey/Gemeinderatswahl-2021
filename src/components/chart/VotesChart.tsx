import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

// const data = [
//   { name: "LINZ", votes: 15 },
//   { name: "SPÖ", votes: 33 },
// ];

// const data = [{ LINZ: 15, SPÖ: 33 }];

const testdata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];

export const VotesChart = ({ feature }: VotesChartProps) => {
  // if (!feature) return null;

  // if (!feature.properties) return null;
  const {
    feature: {
      properties: { votes },
    },
  } = feature;

  console.log(
    "???? WTF?votes",
    feature.feature.properties.votes,
    "DESTRUCT",
    votes,
  );

  const votesData = Object.values(PartiesConsts).map((party) => {
    return votes[party.identifier];
  });
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

  const bars = Object.values(PartiesConsts).map((party) => (
    <Bar
      key={`${party.identifier}-bar`}
      dataKey={party.identifier}
      fill={getColor(party.identifier)}
      // activeBar={{ fill: getColor("SPÖ"), stroke: "blue" }}
      radius={[10, 10, 0, 0]}
    />
  ));

  const mehData = Object.entries(voteData)
    .map(([name, votes]) => ({
      name,
      votes,
    }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="bar-chart-container" style={{ height: "300px" }}>
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
        <Legend />
        <Bar
          dataKey="votes"
          fill="#8884d8"
          activeBar={{ fill: "pink", stroke: "blue" }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
      {/* <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={[chartData]}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Tooltip />
        {bars}
      </BarChart> */}
    </div>
  );
};
