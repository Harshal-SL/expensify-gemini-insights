
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";
import { TaxOptimization } from "@/components/TaxOptimization";
import { Expense } from "@/hooks/useFinancialData";

interface TaxTabProps {
  expenses: Expense[];
}

export const TaxTab = ({ expenses }: TaxTabProps) => {
  return (
    <div className="space-y-6">
      <TaxOptimization />
      
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-4" />
            Tax Deductible Expenses
          </CardTitle>
          <CardDescription>
            Expenses that may qualify for tax deductions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.filter(e => 
              ["Business", "Education", "Healthcare", "Charity", "Home Office"].includes(e.category)
            ).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No potential tax deductible expenses found.</p>
            ) : (
              <div className="space-y-4">
                {expenses
                  .filter(e => ["Business", "Education", "Healthcare", "Charity", "Home Office"].includes(e.category))
                  .map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">${expense.amount}</p>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">Tax Deductible</Badge>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Potential Tax Deductions Total:</span>
                      <span className="text-blue-700">
                        ${expenses
                          .filter(e => ["Business", "Education", "Healthcare", "Charity", "Home Office"].includes(e.category))
                          .reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
