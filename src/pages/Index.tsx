
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useFinancialData } from "@/hooks/useFinancialData";
import { TabHeader } from "@/components/dashboard/TabHeader";
import { TabsContent } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/dashboard/DashboardTab";
import { ExpensesTab } from "@/components/dashboard/ExpensesTab";
import { IncomeTab } from "@/components/dashboard/IncomeTab";
import { BudgetsTab } from "@/components/dashboard/BudgetsTab";
import { GoalsTab } from "@/components/dashboard/GoalsTab";
import { InvestmentsTab } from "@/components/dashboard/InvestmentsTab";
import { LoansTab } from "@/components/dashboard/LoansTab";
import { TaxTab } from "@/components/dashboard/TaxTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { 
    expenses, 
    income, 
    budgets, 
    goals, 
    investments,
    loans,
    addExpense, 
    addIncome, 
    addBudget, 
    addGoal,
    addInvestment,
    addLoan,
    updateLoanPayment,
    getTotalIncome,
    getTotalExpenses,
    getNetBalance,
    getTotalInvestmentValue,
    getTotalInvestmentReturn,
    getTotalLoanAmount
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

  const handleAddInvestment = (investment: any) => {
    addInvestment(investment);
    toast({
      title: "Investment Added",
      description: "Your investment has been successfully added to your portfolio.",
    });
  };

  const handleAddLoan = (loan: any) => {
    addLoan(loan);
    toast({
      title: "Loan Added",
      description: "Your loan has been successfully added to your tracker.",
    });
  };

  const handleLoanPayment = (loanId: string, amount: number) => {
    updateLoanPayment(loanId, amount);
    toast({
      title: "Payment Made",
      description: `Your payment of $${amount.toFixed(2)} has been recorded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-lg text-gray-600">AI-Powered Expense Tracking & Financial Insights</p>
        </header>

        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabsContent value="dashboard">
          <DashboardTab 
            totalIncome={getTotalIncome()}
            totalExpenses={getTotalExpenses()}
            netBalance={getNetBalance()}
            totalInvestments={getTotalInvestmentValue()}
            totalReturns={getTotalInvestmentReturn()}
            expenses={expenses}
            income={income}
            budgets={budgets}
            loans={loans}
            investments={investments}
            setActiveTab={setActiveTab}
          />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesTab 
            expenses={expenses} 
            onAddExpense={handleAddExpense} 
          />
        </TabsContent>

        <TabsContent value="income">
          <IncomeTab 
            income={income} 
            onAddIncome={handleAddIncome} 
          />
        </TabsContent>

        <TabsContent value="budgets">
          <BudgetsTab 
            budgets={budgets} 
            onAddBudget={handleAddBudget} 
          />
        </TabsContent>

        <TabsContent value="goals">
          <GoalsTab 
            goals={goals} 
            onAddGoal={handleAddGoal} 
          />
        </TabsContent>

        <TabsContent value="investments">
          <InvestmentsTab 
            investments={investments} 
            onAddInvestment={handleAddInvestment} 
          />
        </TabsContent>

        <TabsContent value="loans">
          <LoansTab 
            loans={loans} 
            onAddLoan={handleAddLoan} 
            onPayment={handleLoanPayment} 
          />
        </TabsContent>

        <TabsContent value="tax">
          <TaxTab expenses={expenses} />
        </TabsContent>
      </div>
    </div>
  );
};

export default Index;
