
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loan } from "@/hooks/useFinancialData";
import { format, differenceInMonths, parseISO } from "date-fns";
import { DollarSign, Calendar, Landmark, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoanTrackerProps {
  loans: Loan[];
  onPayment: (loanId: string, amount: number) => void;
}

export const LoanTracker = ({ loans, onPayment }: LoanTrackerProps) => {
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  
  const selectedLoan = loans.find(loan => loan.id === selectedLoanId);
  
  const getProgressPercentage = (loan: Loan) => {
    return Math.min(100, ((loan.amount - loan.remainingAmount) / loan.amount) * 100);
  };
  
  const getRemainingMonths = (loan: Loan) => {
    if (loan.status === 'paid') return 0;
    return differenceInMonths(parseISO(loan.endDate), new Date());
  };
  
  const getStatusBadgeClass = (status: Loan['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'defaulted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: Loan['status']) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'defaulted': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLoanId && paymentAmount) {
      onPayment(selectedLoanId, parseFloat(paymentAmount));
      setPaymentAmount("");
    }
  };

  if (loans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loan Tracker</CardTitle>
          <CardDescription>Track your loan payments and progress</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <Landmark className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No loans added yet. Add a new loan to start tracking.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
          <CardDescription>Track your loan payments and progress</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">
                    <div className="font-medium">{loan.name}</div>
                    <div className="text-sm text-gray-500">{loan.itemPurchased}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusBadgeClass(loan.status)}`}>
                      {getStatusIcon(loan.status)}
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${loan.remainingAmount.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">
                      {getRemainingMonths(loan) > 0 ? `${getRemainingMonths(loan)} months left` : 'Completed'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={getProgressPercentage(loan)} className="h-2" />
                      <span className="text-xs text-gray-500">
                        {getProgressPercentage(loan).toFixed(0)}% paid
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedLoanId(loan.id === selectedLoanId ? null : loan.id);
                        setPaymentAmount(loan.monthlyPayment.toString());
                      }}
                    >
                      Make Payment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedLoan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Loan Details: {selectedLoan.name}</CardTitle>
            <CardDescription>Make a payment or view details for this loan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Loan Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Purchased</span>
                    <span className="font-medium">{selectedLoan.itemPurchased}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-medium">${selectedLoan.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Balance</span>
                    <span className="font-medium">${selectedLoan.remainingAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium">{selectedLoan.interestRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">${selectedLoan.monthlyPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-medium">{format(parseISO(selectedLoan.startDate), 'PP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium">{format(parseISO(selectedLoan.endDate), 'PP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lender</span>
                    <span className="font-medium">{selectedLoan.lender}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <h3 className="font-semibold mb-4">Make a Payment</h3>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentAmount">Payment Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="paymentAmount"
                        type="number"
                        step="0.01"
                        min="0"
                        max={selectedLoan.remainingAmount}
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="pl-10"
                        placeholder="Enter payment amount"
                        disabled={selectedLoan.status === 'paid'}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={selectedLoan.status === 'paid' || !paymentAmount || parseFloat(paymentAmount) <= 0}
                    >
                      Make Payment
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPaymentAmount(selectedLoan.monthlyPayment.toString())}
                      disabled={selectedLoan.status === 'paid'}
                      className="whitespace-nowrap"
                    >
                      Use Monthly Amount
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 pt-2">
                    <span>Monthly Payment:</span>
                    <span>${selectedLoan.monthlyPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Remaining Balance:</span>
                    <span>${selectedLoan.remainingAmount.toFixed(2)}</span>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
