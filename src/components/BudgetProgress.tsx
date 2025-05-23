
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Expense } from "@/hooks/useFinancialData";

interface BudgetProgressProps {
  budgets: Budget[];
  expenses: Expense[];
}

export const BudgetProgress = ({ budgets, expenses }: BudgetProgressProps) => {
  const budgetsWithSpending = budgets.map(budget => {
    const categoryExpenses = expenses
      .filter(expense => expense.category === budget.category)
      .reduce((total, expense) => total + expense.amount, 0);
    
    return {
      ...budget,
      spent: categoryExpenses,
      percentage: (categoryExpenses / budget.amount) * 100,
    };
  });

  if (budgets.length === 0) {
    return (
      <Card>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against budgets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgetsWithSpending.map((budget, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{budget.category}</span>
                <span className="text-sm text-gray-600">
                  ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </span>
              </div>
              <Progress 
                value={budget.percentage} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{budget.percentage.toFixed(1)}% used</span>
                <span 
                  className={budget.percentage > 100 ? 'text-red-600' : 'text-green-600'}
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
