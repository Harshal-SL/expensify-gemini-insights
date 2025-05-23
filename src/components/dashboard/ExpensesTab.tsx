
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Expense } from "@/hooks/useFinancialData";

interface ExpensesTabProps {
  expenses: Expense[];
  onAddExpense: (expense: any) => void;
}

export const ExpensesTab = ({ expenses, onAddExpense }: ExpensesTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Expense
          </CardTitle>
          <CardDescription>
            Track your spending with AI-powered categorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm onSubmit={onAddExpense} />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No expenses recorded yet. Add your first expense above!</p>
            ) : (
              expenses.slice(0, 10).map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">${expense.amount}</p>
                    <Badge variant="outline">{expense.paymentMethod}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
