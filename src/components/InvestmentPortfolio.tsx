
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, DollarSign, BadgeDollarSign, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Investment {
  id: string;
  name: string;
  type: string; // stocks, bonds, crypto, real estate, etc.
  value: number;
  initialInvestment: number;
  purchaseDate: string;
  returnRate: number;
  risk: 'low' | 'medium' | 'high';
}

interface InvestmentPortfolioProps {
  investments: Investment[];
}

export const InvestmentPortfolio = ({ investments }: InvestmentPortfolioProps) => {
  const [view, setView] = useState<'allocation' | 'performance'>('allocation');
  
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalInitialInvestment = investments.reduce((sum, inv) => sum + inv.initialInvestment, 0);
  const totalReturn = totalValue - totalInitialInvestment;
  const totalReturnPercentage = totalInitialInvestment > 0 
    ? ((totalReturn / totalInitialInvestment) * 100).toFixed(2) 
    : '0.00';

  // Data for allocation chart
  const allocationData = investments.reduce((acc, investment) => {
    const existingType = acc.find(item => item.name === investment.type);
    if (existingType) {
      existingType.value += investment.value;
    } else {
      acc.push({
        name: investment.type,
        value: investment.value,
      });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Data for performance chart
  const performanceData = investments.map(investment => ({
    name: investment.name,
    return: ((investment.value - investment.initialInvestment) / investment.initialInvestment * 100).toFixed(2),
    value: investment.value,
  })).sort((a, b) => parseFloat(b.return) - parseFloat(a.return)).slice(0, 5);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'
  ];

  const getRiskBadgeColor = (risk: 'low' | 'medium' | 'high') => {
    switch(risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };

  if (investments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>Track your investments and returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No investments to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Investment Portfolio
            </CardTitle>
            <CardDescription>Track your investment performance</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={view === 'allocation' ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={() => setView('allocation')}
            >
              Allocation
            </Badge>
            <Badge 
              variant={view === 'performance' ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={() => setView('performance')}
            >
              Performance
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardDescription>Total Portfolio Value</CardDescription>
              <CardTitle className="text-xl text-purple-800">${totalValue.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardDescription>Total Return</CardDescription>
              <CardTitle className={`text-xl ${totalReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {totalReturn >= 0 ? '+' : ''}{totalReturn.toLocaleString()} ({totalReturn >= 0 ? '+' : ''}{totalReturnPercentage}%)
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
            <CardHeader className="pb-2">
              <CardDescription>Number of Assets</CardDescription>
              <CardTitle className="text-xl text-teal-800">{investments.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="h-[300px] mb-6">
          {view === 'allocation' ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(tick) => `${tick}%`} />
                <Tooltip formatter={(value, name) => {
                  return name === 'return' ? [`${value}%`, 'Return'] : [`$${Number(value).toLocaleString()}`, 'Value'];
                }} />
                <Bar dataKey="return" fill="#8884d8" name="Return %" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-gray-700">Your Investments</h3>
          <div className="grid gap-3">
            {investments.map((investment, index) => {
              const returnPercent = ((investment.value - investment.initialInvestment) / investment.initialInvestment * 100).toFixed(2);
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <BadgeDollarSign className={`h-8 w-8 ${parseFloat(returnPercent) >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{investment.name}</p>
                      <p className="text-sm text-gray-500">{investment.type} • {new Date(investment.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${investment.value.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${parseFloat(returnPercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(returnPercent) >= 0 ? '+' : ''}{returnPercent}%
                      </span>
                      <Badge variant="outline" className={getRiskBadgeColor(investment.risk)}>
                        {investment.risk} risk
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
