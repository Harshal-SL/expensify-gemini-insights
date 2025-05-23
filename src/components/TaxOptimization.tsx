
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptText, ShieldCheck, Calculator } from "lucide-react";

export const TaxOptimization = () => {
  const taxSavingTips = [
    {
      title: "Tax-Deductible Expenses",
      description: "Categorize business expenses properly to maximize deductions.",
      icon: <ReceiptText className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: "Retirement Contributions",
      description: "Maximize contributions to tax-advantaged retirement accounts.",
      icon: <ShieldCheck className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: "Tax Loss Harvesting",
      description: "Offset capital gains with strategic investment losses.",
      icon: <Calculator className="h-8 w-8 text-indigo-600" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Tax Optimization
        </CardTitle>
        <CardDescription>
          Strategies to minimize your tax burden
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {taxSavingTips.map((tip, index) => (
            <Card key={index} className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">{tip.icon}</div>
                <CardTitle className="text-center text-lg">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-gray-600">
                {tip.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
