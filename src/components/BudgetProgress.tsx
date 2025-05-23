
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Expense } from "@/hooks/useFinancialData";
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface BudgetProgressProps {
  budgets: Budget[];
  expenses: Expense[];
}

export const BudgetProgress = ({ budgets, expenses }: BudgetProgressProps) => {
  const [budgetsWithSpending, setBudgetsWithSpending] = useState<(Budget & { spent: number, percentage: number })[]>([]);
  const [animateProgress, setAnimateProgress] = useState(false);
  
  useEffect(() => {
    const processedBudgets = budgets.map(budget => {
      const categoryExpenses = expenses
        .filter(expense => expense.category === budget.category)
        .reduce((total, expense) => total + expense.amount, 0);
      
      return {
        ...budget,
        spent: categoryExpenses,
        percentage: (categoryExpenses / budget.amount) * 100,
      };
    }).sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
    
    setBudgetsWithSpending(processedBudgets);
    
    // Trigger animation after a small delay
    setTimeout(() => setAnimateProgress(true), 100);
  }, [budgets, expenses]);

  if (budgets.length === 0) {
    return (
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
          <CardDescription>Track your spending against budgets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No budgets created yet
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProgressColorClasses = (percentage: number) => {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 85) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage > 100) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (percentage > 85) return <TrendingDown className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against budgets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {budgetsWithSpending.map((budget, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getStatusIcon(budget.percentage)}
                  <span className="font-medium">{budget.category}</span>
                </div>
                <span className="text-sm text-gray-600">
                  ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </span>
              </div>
              <Progress 
                value={animateProgress ? budget.percentage : 0} 
                className={`h-2 transition-all duration-1000 ease-out ${getProgressColorClasses(budget.percentage)}`}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{budget.percentage.toFixed(1)}% used</span>
                <span 
                  className={budget.percentage > 100 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}
                >
                  ${Math.abs(budget.amount - budget.spent).toFixed(2)} {budget.percentage > 100 ? 'over' : 'remaining'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
