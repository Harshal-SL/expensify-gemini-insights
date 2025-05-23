
import { useState } from 'react';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  notes?: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  type: string;
  date: string;
  frequency: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent?: number;
  period: string;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount?: number;
  type: 'short-term' | 'long-term';
  deadline: string;
}

export interface Investment {
  id: string;
  name: string;
  type: string; // stocks, bonds, crypto, real estate, etc.
  value: number;
  initialInvestment: number;
  purchaseDate: string;
  returnRate: number;
  risk: 'low' | 'medium' | 'high';
}

export interface Loan {
  id: string;
  name: string;
  description: string;
  amount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  monthlyPayment: number;
  lender: string;
  itemPurchased: string;
  remainingAmount: number;
  status: 'active' | 'paid' | 'defaulted';
}

export const useFinancialData = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    
    // Update budget spent amount
    setBudgets(prev => prev.map(budget => 
      budget.category === expense.category 
        ? { ...budget, spent: (budget.spent || 0) + expense.amount }
        : budget
    ));
  };

  const addIncome = (incomeData: Omit<Income, 'id'>) => {
    const newIncome = {
      ...incomeData,
      id: Date.now().toString(),
    };
    setIncome(prev => [newIncome, ...prev]);
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets(prev => [newBudget, ...prev]);
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0,
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: Date.now().toString(),
    };
    setInvestments(prev => [newInvestment, ...prev]);
  };

  const addLoan = (loan: Omit<Loan, 'id' | 'remainingAmount' | 'status'>) => {
    const newLoan = {
      ...loan,
      id: Date.now().toString(),
      remainingAmount: loan.amount,
      status: 'active' as const,
    };
    setLoans(prev => [newLoan, ...prev]);
  };

  const updateLoanPayment = (loanId: string, paymentAmount: number) => {
    setLoans(prev => prev.map(loan => {
      if (loan.id === loanId) {
        const newRemainingAmount = Math.max(0, loan.remainingAmount - paymentAmount);
        return {
          ...loan,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount === 0 ? 'paid' : 'active',
        };
      }
      return loan;
    }));
  };

  const getTotalIncome = () => {
    return income.reduce((total, item) => total + item.amount, 0);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getNetBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => total + investment.value, 0);
  };

  const getTotalInvestmentReturn = () => {
    return investments.reduce((total, investment) => 
      total + (investment.value - investment.initialInvestment), 0);
  };

  const getTotalLoanAmount = () => {
    return loans.reduce((total, loan) => total + loan.remainingAmount, 0);
  };

  const getCategoryExpenses = () => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    return categoryTotals;
  };

  return {
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
    getTotalLoanAmount,
    getCategoryExpenses,
  };
};
