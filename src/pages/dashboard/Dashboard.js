import { React, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

import { getPenelitianCountByProgramStudi } from "../../functions/Penelitian";
import { getPengabdianMasyarakatCountByProgramStudi } from "../../functions/PengabdianMasyarakat";
import { getPublikasiCountByProgramStudi } from "../../functions/Publikasi";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { countKerjasamaByStatus } from "../../functions/Kerjasama";

const data = [
  { name: "Aktif", value: 400 },
  { name: "Non-Aktif", value: 300 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    uhuy,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Dashboard() {
  const [chart1, setChart1] = useState([]);
  const [chartKerjasama, setChartKerjasama] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataPenelitianCountByProgramStudi = await getPenelitianCountByProgramStudi();
      const dataPengabdianMasyarakatCountByProgramStudi = await getPengabdianMasyarakatCountByProgramStudi();
      const dataPublikasiCountByProgramStudi = await getPublikasiCountByProgramStudi();
      const dataProgramStudi = await getProgramStudi();

      const dataCountKerjasamaByStatus = await countKerjasamaByStatus();
      let dataChartKerjasama = dataCountKerjasamaByStatus.data;
      dataChartKerjasama.map((x) => {
        x.name = x.status;
        x.value = parseInt(x.count);
      });
      setChartKerjasama(dataChartKerjasama);

      let dataChart1 = dataProgramStudi.data;

      dataChart1.map((x) => {
        x.penelitian = 0;
        x.publikasi = 0;
        x.pengabdianMasyarakat = 0;

        dataPenelitianCountByProgramStudi.data.map((penelitian) => {
          if (penelitian.program_studi.id === x.id) {
            x.penelitian = parseInt(penelitian.count);
          }
        });
        dataPublikasiCountByProgramStudi.data.map((publikasi) => {
          if (publikasi.program_studi.id === x.id) {
            x.publikasi = parseInt(publikasi.count);
          }
        });
        dataPengabdianMasyarakatCountByProgramStudi.data.map(
          (pengabdianMasyarakat) => {
            if (pengabdianMasyarakat.program_studi.id === x.id) {
              x.pengabdianMasyarakat = parseInt(pengabdianMasyarakat.count);
            }
          },
        );
      });
      setChart1(dataChart1);
    }
    getData();
  }, []);

  const [state, setState] = useState({
    activeIndex: 0,
  });

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid item xs={12}>
        <Widget
          header={
            <Typography variant="h5" color="text" colorBrightness="secondary">
              Jumlah Penelitian, Publikasi, dan Penelitian Masyarakat
            </Typography>
          }
        >
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <BarChart
              width={500}
              height={300}
              data={chart1}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="nama"
                interval={0}
                orientation="bottom"
                tick={false}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="penelitian" fill="#4ac0c0" />
              <Bar dataKey="publikasi" fill="#36a2eb" />
              <Bar dataKey="pengabdianMasyarakat" fill="#c1bfc0" />
            </BarChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>
      <Grid item xs={12}>
        <Widget
          header={
            <Typography variant="h5" color="text" colorBrightness="secondary">
              Jumlah Kerjasama
            </Typography>
          }
        >
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={state.activeIndex}
                activeShape={renderActiveShape}
                data={chartKerjasama}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseOver={(_, index) => setState({ activeIndex: index })}
              />
            </PieChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>
    </>
  );
}
