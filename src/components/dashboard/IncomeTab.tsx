
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { IncomeForm } from "@/components/IncomeForm";
import { Income } from "@/hooks/useFinancialData";

interface IncomeTabProps {
  income: Income[];
  onAddIncome: (income: any) => void;
}

export const IncomeTab = ({ income, onAddIncome }: IncomeTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Income Source
          </CardTitle>
          <CardDescription>
            Track your income from various sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IncomeForm onSubmit={onAddIncome} />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Income Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {income.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No income sources added yet.</p>
            ) : (
              income.map((incomeItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">{incomeItem.source}</p>
                    <p className="text-sm text-gray-500">{incomeItem.type} • {incomeItem.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${incomeItem.amount}</p>
                    <Badge variant="outline" className="bg-green-50">{incomeItem.frequency}</Badge>
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
