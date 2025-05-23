
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { LoanForm } from "@/components/LoanForm";
import { LoanTracker } from "@/components/LoanTracker";
import { Loan } from "@/hooks/useFinancialData";

interface LoansTabProps {
  loans: Loan[];
  onAddLoan: (loan: any) => void;
  onPayment: (loanId: string, amount: number) => void;
}

export const LoansTab = ({ loans, onAddLoan, onPayment }: LoansTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5" />
            Add New Loan
          </CardTitle>
          <CardDescription>
            Track loans for major purchases and their repayments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoanForm onSubmit={onAddLoan} />
        </CardContent>
      </Card>

      <LoanTracker loans={loans} onPayment={onPayment} />
    </div>
  );
};
