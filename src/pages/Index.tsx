
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Target, Plus, CreditCard, Wallet, PiggyBank } from "lucide-react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { IncomeForm } from "@/components/IncomeForm";
import { BudgetForm } from "@/components/BudgetForm";
import { GoalForm } from "@/components/GoalForm";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialOverview } from "@/components/FinancialOverview";
import { useFinancialData } from "@/hooks/useFinancialData";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { 
    expenses, 
    income, 
    budgets, 
    goals, 
    addExpense, 
    addIncome, 
    addBudget, 
    addGoal,
    getTotalIncome,
    getTotalExpenses,
    getNetBalance
  } = useFinancialData();

  const handleAddExpense = (expense: any) => {
    addExpense(expense);
    toast({
      title: "Expense Added",
      description: "Your expense has been successfully recorded.",
    });
  };

  const handleAddIncome = (incomeData: any) => {
    addIncome(incomeData);
    toast({
      title: "Income Added",
      description: "Your income has been successfully recorded.",
    });
  };

  const handleAddBudget = (budget: any) => {
    addBudget(budget);
    toast({
      title: "Budget Created",
      description: "Your budget has been successfully created.",
    });
  };

  const handleAddGoal = (goal: any) => {
    addGoal(goal);
    toast({
      title: "Goal Created",
      description: "Your financial goal has been successfully created.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-lg text-gray-600">AI-Powered Expense Tracking & Financial Insights</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Income
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <FinancialOverview 
              totalIncome={getTotalIncome()}
              totalExpenses={getTotalExpenses()}
              netBalance={getNetBalance()}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart expenses={expenses} />
              <BudgetProgress budgets={budgets} expenses={expenses} />
            </div>
            
            <RecentTransactions expenses={expenses} income={income} />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
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
                <ExpenseForm onSubmit={handleAddExpense} />
              </CardContent>
            </Card>

            <Card>
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
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
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
                <IncomeForm onSubmit={handleAddIncome} />
              </CardContent>
            </Card>

            <Card>
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
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
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
                <BudgetForm onSubmit={handleAddBudget} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgets.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No budgets created yet. Create your first budget above!</p>
                  </CardContent>
                </Card>
              ) : (
                budgets.map((budget, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
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
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Create Financial Goal
                </CardTitle>
                <CardDescription>
                  Set and track your financial objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GoalForm onSubmit={handleAddGoal} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="text-center py-8">
                    <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No goals set yet. Create your first financial goal above!</p>
                  </CardContent>
                </Card>
              ) : (
                goals.map((goal, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{goal.name}</span>
                        <Badge variant={goal.type === 'short-term' ? 'default' : 'secondary'}>
                          {goal.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Target</span>
                          <span className="font-semibold">${goal.targetAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Saved</span>
                          <span className="font-semibold text-green-600">${goal.currentAmount || 0}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((goal.currentAmount || 0) / goal.targetAmount * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{Math.round((goal.currentAmount || 0) / goal.targetAmount * 100)}%</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Target Date: {goal.deadline}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
