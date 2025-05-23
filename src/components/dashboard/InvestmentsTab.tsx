
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { InvestmentForm } from "@/components/InvestmentForm";
import { InvestmentPortfolio } from "@/components/InvestmentPortfolio";
import { Investment } from "@/hooks/useFinancialData";

interface InvestmentsTabProps {
  investments: Investment[];
  onAddInvestment: (investment: any) => void;
}

export const InvestmentsTab = ({ investments, onAddInvestment }: InvestmentsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Add Investment
          </CardTitle>
          <CardDescription>
            Track your investment portfolio performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentForm onSubmit={onAddInvestment} />
        </CardContent>
      </Card>

      <InvestmentPortfolio investments={investments} />
    </div>
  );
};
