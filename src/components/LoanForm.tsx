
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, addYears, addMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { Loan } from "@/hooks/useFinancialData";

interface LoanFormProps {
  onSubmit: (loan: Omit<Loan, 'id' | 'remainingAmount' | 'status'>) => void;
}

export const LoanForm = ({ onSubmit }: LoanFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addYears(new Date(), 3)); // Default to 3-year loan
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [lender, setLender] = useState("");
  const [itemPurchased, setItemPurchased] = useState("");

  // Helper to calculate monthly payment when amount, interest rate and end date change
  const calculateMonthlyPayment = () => {
    const loanAmount = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const totalMonths = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)); // Approximate months
    
    if (loanAmount && rate && totalMonths > 0) {
      // Using the formula for monthly payment in a fixed-rate loan
      const monthlyAmount = (loanAmount * rate * Math.pow(1 + rate, totalMonths)) / (Math.pow(1 + rate, totalMonths) - 1);
      setMonthlyPayment(monthlyAmount.toFixed(2));
    }
  };

  // Update monthly payment when relevant fields change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    calculateMonthlyPayment();
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(e.target.value);
    calculateMonthlyPayment();
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setEndDate(date);
      calculateMonthlyPayment();
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      calculateMonthlyPayment();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !interestRate || !monthlyPayment || !lender || !itemPurchased) {
      return;
    }

    onSubmit({
      name,
      description,
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      monthlyPayment: parseFloat(monthlyPayment),
      lender,
      itemPurchased
    });

    // Reset form
    setName("");
    setDescription("");
    setAmount("");
    setInterestRate("");
    setStartDate(new Date());
    setEndDate(addYears(new Date(), 3));
    setMonthlyPayment("");
    setLender("");
    setItemPurchased("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Loan Name</Label>
          <Input
            id="name"
            placeholder="e.g. Car Loan, Mortgage"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemPurchased">Item Purchased</Label>
          <Input
            id="itemPurchased"
            placeholder="e.g. Toyota Camry, MacBook Pro"
            value={itemPurchased}
            onChange={(e) => setItemPurchased(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Loan Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            placeholder="5.5"
            value={interestRate}
            onChange={handleInterestRateChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lender">Lender</Label>
          <Input
            id="lender"
            placeholder="e.g. Bank of America, Credit Union"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyPayment">Monthly Payment</Label>
          <Input
            id="monthlyPayment"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Additional details about the loan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Loan
      </Button>
    </form>
  );
};
