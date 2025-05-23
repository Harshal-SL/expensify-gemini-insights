
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Landmark } from "lucide-react";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialOverview } from "@/components/FinancialOverview";
import { InvestmentPortfolio } from "@/components/InvestmentPortfolio";
import { Expense, Income, Loan, Investment, Budget } from "@/hooks/useFinancialData";

interface DashboardTabProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalInvestments: number;
  totalReturns: number;
  expenses: Expense[];
  income: Income[];
  budgets: Budget[];
  loans: Loan[];
  investments: Investment[];
  setActiveTab: (tab: string) => void;
}

export const DashboardTab = ({
  totalIncome,
  totalExpenses,
  netBalance,
  totalInvestments,
  totalReturns,
  expenses,
  income,
  budgets,
  loans,
  investments,
  setActiveTab
}: DashboardTabProps) => {
  return (
    <div className="space-y-6">
      <FinancialOverview 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netBalance={netBalance}
        totalInvestments={totalInvestments}
        totalReturns={totalReturns}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart expenses={expenses} />
        <BudgetProgress budgets={budgets} expenses={expenses} />
      </div>
      
      <RecentTransactions expenses={expenses} income={income} />

      {loans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              Active Loans
            </CardTitle>
            <CardDescription>
              Track your outstanding loans and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loans.slice(0, 3).map((loan) => (
                <Card key={loan.id} className="bg-white shadow-sm border border-gray-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{loan.name}</CardTitle>
                      <Badge variant={loan.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                        {loan.status}
                      </Badge>
                    </div>
                    <CardDescription>{loan.itemPurchased}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Remaining</span>
                        <span className="font-medium">${loan.remainingAmount.toFixed(2)}</span>
                      </div>
                      <Progress 
                        value={(loan.amount - loan.remainingAmount) / loan.amount * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-sm">
                        <span>Monthly</span>
                        <span className="font-medium text-blue-600">${loan.monthlyPayment.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {loans.length > 3 && (
                <div className="flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab("loans")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View All Loans
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {investments.length > 0 && (
        <div className="mt-6">
          <InvestmentPortfolio investments={investments} />
        </div>
      )}
    </div>
  );
};
