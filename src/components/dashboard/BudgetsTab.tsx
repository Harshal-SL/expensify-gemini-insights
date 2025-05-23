
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { BudgetForm } from "@/components/BudgetForm";
import { Budget } from "@/hooks/useFinancialData";

interface BudgetsTabProps {
  budgets: Budget[];
  onAddBudget: (budget: any) => void;
}

export const BudgetsTab = ({ budgets, onAddBudget }: BudgetsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Budget
          </CardTitle>
          <CardDescription>
            Set spending limits for different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetForm onSubmit={onAddBudget} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.length === 0 ? (
          <Card className="col-span-full bg-white shadow-sm border border-gray-100">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No budgets created yet. Create your first budget above!</p>
            </CardContent>
          </Card>
        ) : (
          budgets.map((budget, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow bg-white shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">{budget.category}</CardTitle>
                <CardDescription>${budget.amount} limit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent</span>
                    <span className="font-medium">${budget.spent || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((budget.spent || 0) / budget.amount * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining</span>
                    <span className="font-medium text-green-600">${Math.max(budget.amount - (budget.spent || 0), 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
