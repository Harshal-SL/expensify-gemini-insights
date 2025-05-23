
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet, Briefcase, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

interface FinancialOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalInvestments?: number;
  totalReturns?: number;
}

export const FinancialOverview = ({ 
  totalIncome, 
  totalExpenses, 
  netBalance,
  totalInvestments = 0,
  totalReturns = 0
}: FinancialOverviewProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold text-green-800 transform transition-transform duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {formatNumber(totalIncome)}
          </div>
          <p className="text-xs text-green-600 mt-1">All-time earnings</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold text-red-800 transform transition-transform duration-1000 delay-200 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {formatNumber(totalExpenses)}
          </div>
          <p className="text-xs text-red-600 mt-1">All-time spending</p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br ${netBalance >= 0 ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-orange-50 to-orange-100 border-orange-200'} hover:shadow-lg transition-shadow`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${netBalance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            Net Balance
          </CardTitle>
          <Wallet className={`h-4 w-4 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-800' : 'text-orange-800'} transform transition-transform duration-1000 delay-400 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {netBalance >= 0 ? '+' : ''}{formatNumber(netBalance)}
          </div>
          <p className={`text-xs mt-1 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {netBalance >= 0 ? 'Positive balance' : 'Overspending'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Investments</CardTitle>
          <Briefcase className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold text-purple-800 transform transition-transform duration-1000 delay-600 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {formatNumber(totalInvestments)}
          </div>
          <p className="text-xs text-purple-600 mt-1">Portfolio value</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-teal-700">Investment Returns</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-teal-800' : 'text-red-600'} transform transition-transform duration-1000 delay-800 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {totalReturns >= 0 ? '+' : ''}{formatNumber(totalReturns)}
          </div>
          <p className="text-xs text-teal-600 mt-1">
            {totalReturns >= 0 ? 'Capital gains' : 'Capital losses'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
