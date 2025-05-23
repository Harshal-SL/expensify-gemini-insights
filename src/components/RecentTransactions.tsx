
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Expense, Income } from "@/hooks/useFinancialData";

interface RecentTransactionsProps {
  expenses: Expense[];
  income: Income[];
}

export const RecentTransactions = ({ expenses, income }: RecentTransactionsProps) => {
  const allTransactions = [
    ...expenses.map(expense => ({
      ...expense,
      type: 'expense' as const,
      amount: -expense.amount,
    })),
    ...income.map(incomeItem => ({
      id: incomeItem.id,
      description: `${incomeItem.type} from ${incomeItem.source}`,
      category: incomeItem.type,
      date: incomeItem.date,
      type: 'income' as const,
      amount: incomeItem.amount,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {allTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet. Start by adding your first expense or income!</p>
        ) : (
          <div className="space-y-3">
            {allTransactions.slice(0, 10).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge variant={transaction.type === 'income' ? 'secondary' : 'outline'}>
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
