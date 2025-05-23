
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface FinancialOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export const FinancialOverview = ({ totalIncome, totalExpenses, netBalance }: FinancialOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">${totalIncome.toFixed(2)}</div>
          <p className="text-xs text-green-600 mt-1">All-time earnings</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-800">${totalExpenses.toFixed(2)}</div>
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
          <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
            {netBalance >= 0 ? '+' : ''}${netBalance.toFixed(2)}
          </div>
          <p className={`text-xs mt-1 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {netBalance >= 0 ? 'Positive balance' : 'Overspending'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
