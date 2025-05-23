
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart4, CreditCard, Wallet, TrendingUp, 
  Target, Briefcase, Landmark, Calculator 
} from "lucide-react";

interface TabHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const TabHeader = ({ activeTab, setActiveTab }: TabHeaderProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-8 mb-8">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <BarChart4 className="h-4 w-4" />
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
        <TabsTrigger value="investments" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Investments
        </TabsTrigger>
        <TabsTrigger value="loans" className="flex items-center gap-2">
          <Landmark className="h-4 w-4" />
          Loans
        </TabsTrigger>
        <TabsTrigger value="tax" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Tax
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
