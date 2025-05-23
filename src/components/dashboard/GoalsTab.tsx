
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, PiggyBank } from "lucide-react";
import { GoalForm } from "@/components/GoalForm";
import { Goal } from "@/hooks/useFinancialData";

interface GoalsTabProps {
  goals: Goal[];
  onAddGoal: (goal: any) => void;
}

export const GoalsTab = ({ goals, onAddGoal }: GoalsTabProps) => {
  return (
    <div className="space-y-6">
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
          <GoalForm onSubmit={onAddGoal} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.length === 0 ? (
          <Card className="col-span-full bg-white shadow-sm border border-gray-100">
            <CardContent className="text-center py-8">
              <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No goals set yet. Create your first financial goal above!</p>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow bg-white shadow-sm border border-gray-100">
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
    </div>
  );
};
