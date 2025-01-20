import { useGraphData } from '../hooks/useGraphData';
import {
  LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { useTranslation } from 'react-i18next';




const Graph = () => {
  const {t}= useTranslation();
  const { data, isLoading, error } = useGraphData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading graph data</div>;

  const cityCount: { name: string; count: number }[] = [];
  const companyCount: { name: string; count: number }[] = [];
  const lineData: { name: string; activity: number }[] = [];  

  data.forEach((user: any) => {
    const existingCity = cityCount.find(city => city.name === user.address.city);
    if (existingCity) {
      existingCity.count++;
    } else {
      cityCount.push({ name: user.address.city, count: 1 });
    }

    const existingCompany = companyCount.find(company => company.name === user.company.name);
    if (existingCompany) {
      existingCompany.count++;
    } else {
      companyCount.push({ name: user.company.name, count: 1 });
    }

    lineData.push({
      name: user.name,
      activity: Math.floor(Math.random() * 100), 
    });
  });


  const pieColors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff5733', '#c70039'];

  return (
    <div style={{"borderLeftWidth": "10px" ,"paddingLeft": "10px" }}>
      <h2>{t("LC")}</h2>
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activity" stroke="#8884d8" />
        </LineChart>
      
      </ResponsiveContainer>
     
      <h2>{t("BC")}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cityCount}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>{t("PC")}</h2>
      <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={companyCount}
        dataKey="count"
        nameKey="name"
        outerRadius={100}
        innerRadius={60}
        paddingAngle={5}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`} 
      >
        {companyCount.map((_, index) => (
          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
    </div>
  );
};

export default Graph;
