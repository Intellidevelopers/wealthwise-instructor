
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Wallet, TrendingUp, Download, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WalletPage = () => {
  const transactions = [
    { id: 1, type: 'earning', amount: 150, description: 'Course Purchase - Financial Planning', date: '2024-01-15' },
    { id: 2, type: 'withdrawal', amount: -500, description: 'Bank Transfer', date: '2024-01-10' },
    { id: 3, type: 'earning', amount: 75, description: 'Course Purchase - Investment Basics', date: '2024-01-08' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">
            <Download className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wealthwise-700">$2,847.50</div>
              <p className="text-xs text-muted-foreground">Available for withdrawal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$1,234.00</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">$156.25</div>
              <p className="text-xs text-muted-foreground">Processing withdrawals</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'earning' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'earning' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <Download className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.description}</h4>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
