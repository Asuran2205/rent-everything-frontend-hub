
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { CircleDollarSign, Download, Upload, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const EarningsPayments = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const earningStats = [
    { title: 'Total Earnings', value: '₹32,450', icon: <CircleDollarSign className="h-8 w-8 text-green-500" />, change: '+₹3,200 this month' },
    { title: 'Available Balance', value: '₹28,250', icon: <CircleDollarSign className="h-8 w-8 text-blue-500" />, change: 'Ready to withdraw' },
    { title: 'Pending Payouts', value: '₹4,200', icon: <CircleDollarSign className="h-8 w-8 text-orange-500" />, change: 'Will be available in 3 days' },
  ];

  const transactions = [
    { id: '1', date: 'Apr 8, 2025', description: 'DSLR Camera Rental', customer: 'John Doe', amount: 1500, status: 'Completed' },
    { id: '2', date: 'Apr 6, 2025', description: 'Drone Rental', customer: 'Sarah Johnson', amount: 3500, status: 'Completed' },
    { id: '3', date: 'Apr 5, 2025', description: 'Withdrawal to HDFC Bank', customer: '', amount: -10000, status: 'Completed' },
    { id: '4', date: 'Apr 3, 2025', description: 'Mountain Bike Rental', customer: 'Mike Peters', amount: 600, status: 'Completed' },
    { id: '5', date: 'Apr 1, 2025', description: 'Power Tools Rental', customer: 'Alex Brown', amount: 850, status: 'Completed' },
  ];

  const payouts = [
    { id: '1', date: 'Apr 5, 2025', amount: 10000, method: 'HDFC Bank ****5678', status: 'Completed' },
    { id: '2', date: 'Mar 20, 2025', amount: 8000, method: 'HDFC Bank ****5678', status: 'Completed' },
    { id: '3', date: 'Mar 8, 2025', amount: 12000, method: 'HDFC Bank ****5678', status: 'Completed' },
  ];

  const paymentMethods = [
    { id: '1', name: 'HDFC Bank', accountNumber: '****5678', type: 'Bank Account', isDefault: true },
    { id: '2', name: 'UPI', accountNumber: 'user@ybl', type: 'UPI ID', isDefault: false },
  ];

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error('Please enter a valid amount to withdraw');
      return;
    }
    
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    
    toast.success(`Withdrawal of ₹${withdrawAmount} initiated successfully`);
    setWithdrawAmount('');
    setSelectedPaymentMethod('');
  };

  const handleAddPaymentMethod = () => {
    if (!accountNumber || !accountName || !ifscCode) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success('Bank account added successfully');
    setIsAddPaymentMethodOpen(false);
    setAccountNumber('');
    setAccountName('');
    setIfscCode('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Earnings & Payments</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {earningStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="transactions">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>View your rental earnings and withdrawals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.amount < 0 ? '-₹' + Math.abs(transaction.amount) : '₹' + transaction.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>View your past withdrawals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.date}</TableCell>
                          <TableCell>₹{payout.amount}</TableCell>
                          <TableCell>{payout.method}</TableCell>
                          <TableCell>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                              {payout.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Transfer your earnings to your bank account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="withdrawAmount">Amount (₹)</Label>
                  <Input
                    id="withdrawAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name} ({method.accountNumber}) {method.isDefault && '- Default'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || !selectedPaymentMethod}
                >
                  <Upload className="h-4 w-4 mr-1" /> Withdraw Funds
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Payment Methods</h3>
                  <Dialog open={isAddPaymentMethodOpen} onOpenChange={setIsAddPaymentMethodOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-1" /> Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Bank Account</DialogTitle>
                        <DialogDescription>
                          Enter your bank account details for withdrawals
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="accountName">Account Holder Name</Label>
                          <Input
                            id="accountName"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddPaymentMethod}>Save Bank Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-md flex justify-between items-center ${method.isDefault ? 'border-blue-200 bg-blue-50' : ''}`}
                    >
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.accountNumber}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EarningsPayments;
