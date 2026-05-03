
import React from 'react';
import { 
  CreditCard, 
  Download, 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { cn, formatCurrency } from './utils';
import { Modal } from './Modal';
import { useState } from 'react';
import { useData } from './context/DataContext';

export const PaymentManager: React.FC = () => {
  const { payments, children, addPayment, settings } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      id: Date.now().toString(),
      childId: formData.get('childId'),
      amount: Number(formData.get('amount')),
      date: new Date().toISOString().split('T')[0],
      month: `${formData.get('month')} ${formData.get('year')}`,
      status: 'Paid',
      method: formData.get('method') as any,
    };
    addPayment(data);
    setIsModalOpen(false);
  };

  const { t } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('financial_tracking')}</h2>
          <p className="text-gray-500">Gérez les frais, les paiements et les reçus.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-medium">
            <Download className="w-5 h-5" />
            <span>{t('export_report')}</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <CreditCard className="w-5 h-5" />
            <span>{t('new_payment')}</span>
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Payment">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Child</label>
            <select name="childId" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              {children.map((c: any) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Amount (DA)</label>
              <input name="amount" type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="15000" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Month / Year</label>
              <div className="flex gap-2">
                <select name="month" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option>
                  <option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                </select>
                <select name="year" className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>2026</option>
                  <option>2027</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Receipt Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="REC-2026-001" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Discount (DA)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Monthly fees, Transport, etc." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              {['Cash', 'Transfer', 'Card', 'Check'].map(method => (
                <label key={method} className="flex items-center gap-2 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input type="radio" name="method" value={method} className="text-blue-600" defaultChecked={method === 'Cash'} />
                  <span className="text-sm font-medium text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">Record Payment</button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title={t('collected_month')} value={`450,000 ${settings.currency || 'DA'}`} color="green" />
        <SummaryCard title={t('pending_month')} value={`85,000 ${settings.currency || 'DA'}`} color="amber" />
        <SummaryCard title={t('overdue_month')} value={`15,000 ${settings.currency || 'DA'}`} color="red" />
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <Filter className="w-5 h-5" />
            <span>{t('all')}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-4 font-semibold text-gray-600">{t('child')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('month')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('amount')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('method')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('status')}</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment: any) => {
                const child = children.find((c: any) => c.id === payment.childId);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <p className="text-sm font-semibold text-gray-900">{child?.firstName} {child?.lastName}</p>
                      <p className="text-xs text-gray-500">{child?.parentName}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{payment.month}</td>
                    <td className="py-4 text-sm font-bold text-gray-900">{formatCurrency(payment.amount, settings.currency || 'DZD')}</td>
                    <td className="py-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Receipt</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, color }: any) => {
  const colors: any = {
    green: "text-green-600 bg-green-50",
    amber: "text-amber-600 bg-amber-50",
    red: "text-red-600 bg-red-50",
  };
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={cn("text-xl font-bold", colors[color].split(' ')[0])}>{value}</p>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const config: any = {
    Paid: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
    Pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
    Overdue: { color: "bg-red-100 text-red-700", icon: AlertTriangle },
  };
  const { color, icon: Icon } = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold", color)}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};
