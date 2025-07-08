import React, { useState } from 'react';
import { DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Upload, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  description: string;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
}

interface PaymentSectionProps {
  userRole: 'admin' | 'resident';
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'paid' | 'all'>('pending');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const payments: Payment[] = [
    {
      id: '1',
      amount: 250,
      description: 'Monthly Maintenance Fee',
      dueDate: new Date('2024-01-15'),
      status: 'pending'
    },
    {
      id: '2',
      amount: 75,
      description: 'Parking Fee',
      dueDate: new Date('2024-01-10'),
      status: 'overdue'
    },
    {
      id: '3',
      amount: 250,
      description: 'Monthly Maintenance Fee',
      dueDate: new Date('2023-12-15'),
      status: 'paid',
      paymentDate: new Date('2023-12-10')
    },
    {
      id: '4',
      amount: 75,
      description: 'Parking Fee',
      dueDate: new Date('2023-12-10'),
      status: 'paid',
      paymentDate: new Date('2023-12-08')
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'all') return true;
    if (activeTab === 'paid') return payment.status === 'paid';
    return payment.status === 'pending' || payment.status === 'overdue';
  });

  const handlePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Make Payment</h3>
          
          {selectedPayment && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount Due</span>
                <span className="text-2xl font-bold text-gray-900">${selectedPayment.amount}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedPayment.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Due: {selectedPayment.dueDate.toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Pay with Card</span>
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Bank Transfer</span>
              </button>
            </div>
            
            <div className="border-t pt-4">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Receipt</span>
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle payment logic here
                setShowPaymentModal(false);
                setSelectedPayment(null);
              }}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
          <p className="text-gray-600">Manage your payment dues and history</p>
        </div>
        {userRole === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-red-600">$325</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold text-green-600">$250</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Due Date</p>
              <p className="text-2xl font-bold text-gray-900">Jan 15</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['pending', 'paid', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} Payments
              </button>
            ))}
          </nav>
        </div>

        {/* Payment List */}
        <div className="divide-y divide-gray-200">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(payment.status)}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{payment.description}</h4>
                    <p className="text-sm text-gray-600">
                      Due: {payment.dueDate.toLocaleDateString()}
                      {payment.paymentDate && ` • Paid: ${payment.paymentDate.toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-900">${payment.amount}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                  {payment.status !== 'paid' && (
                    <button
                      onClick={() => handlePayment(payment)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPaymentModal && <PaymentModal />}
    </div>
  );
};