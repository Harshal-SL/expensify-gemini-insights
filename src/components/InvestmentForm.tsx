
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Investment } from "./InvestmentPortfolio";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InvestmentFormProps {
  onSubmit: (investment: Omit<Investment, 'id'>) => void;
}

export const InvestmentForm = ({ onSubmit }: InvestmentFormProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [returnRate, setReturnRate] = useState("");
  const [risk, setRisk] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !value || !initialInvestment || !date || !returnRate || !risk) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit({
      name,
      type,
      value: parseFloat(value),
      initialInvestment: parseFloat(initialInvestment),
      purchaseDate: date.toISOString(),
      returnRate: parseFloat(returnRate),
      risk,
    });

    // Reset form
    setName("");
    setType("");
    setValue("");
    setInitialInvestment("");
    setDate(new Date());
    setReturnRate("");
    setRisk("medium");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Investment</CardTitle>
        <CardDescription>
          Track your investment assets and monitor their performance
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Investment Name</Label>
              <Input
                id="name"
                placeholder="e.g., Apple Stock, S&P 500 ETF"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Investment Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stocks">Stocks</SelectItem>
                  <SelectItem value="Bonds">Bonds</SelectItem>
                  <SelectItem value="ETFs">ETFs</SelectItem>
                  <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                  <SelectItem value="Commodities">Commodities</SelectItem>
                  <SelectItem value="Cash">Cash & Equivalents</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="5000"
                value={initialInvestment}
                min="0"
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value ($)</Label>
              <Input
                id="currentValue"
                type="number"
                placeholder="5500"
                value={value}
                min="0"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Purchase Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnRate">Annual Return Rate (%)</Label>
              <Input
                id="returnRate"
                type="number"
                placeholder="7.5"
                value={returnRate}
                step="0.01"
                onChange={(e) => setReturnRate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="risk">Risk Level</Label>
              <Select value={risk} onValueChange={(value: "low" | "medium" | "high") => setRisk(value)}>
                <SelectTrigger id="risk">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">Add Investment</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
