'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Truck, CheckCircle2, Clock, Eye, X } from 'lucide-react';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { useAdmin, CustomerOrder } from '../../../context/AdminContext';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  return (
    <div className="flex min-h-screen bg-bg-muted">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
              Orders & Fulfillment ({orders.length})
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Track customer order status, shipping tracking numbers, and white-glove deliveries.
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-card border border-border shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-text-primary">
            <thead className="bg-zinc-950 text-white uppercase font-display font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-bg-muted/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-sm text-text-primary block">{order.id}</span>
                    <span className="text-[10px] text-text-secondary">{order.date}</span>
                  </td>

                  <td className="p-4">
                    <strong className="text-text-primary font-bold block">{order.customerName}</strong>
                    <span className="text-[11px] text-text-secondary">{order.email} • {order.city}</span>
                  </td>

                  <td className="p-4 font-mono font-bold text-sm">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as CustomerOrder['status'])}
                      className={`px-3 py-1.5 rounded-pill text-xs font-bold focus:outline-none cursor-pointer border ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    {order.trackingNumber && (
                      <span className="block text-[10px] font-mono text-zinc-500 mt-1">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 rounded-pill bg-bg-muted border border-border font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <Eye size={14} /> View Items
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />

            <div className="relative w-full max-w-lg bg-white rounded-card shadow-2xl z-10 border border-border p-6">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary">
                    Order Details: {selectedOrder.id}
                  </h3>
                  <span className="text-xs text-text-secondary">{selectedOrder.date}</span>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-full hover:bg-zinc-100">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-bg-muted p-3 rounded-lg border border-border">
                  <p className="font-bold text-text-primary">Shipping Address:</p>
                  <p className="text-text-secondary mt-0.5">{selectedOrder.customerName}</p>
                  <p className="text-text-secondary">{selectedOrder.address}, {selectedOrder.city}</p>
                  <p className="text-text-secondary">Phone: {selectedOrder.phone}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-wider text-text-primary mb-2">Order Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded border border-border bg-white">
                        <div className="flex items-center gap-2">
                          <div className="relative w-10 h-10 rounded overflow-hidden bg-bg-muted shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">{item.title}</p>
                            <p className="text-text-secondary">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-text-primary">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-center text-sm font-bold text-text-primary">
                  <span>Total Paid</span>
                  <span className="font-mono text-lg text-zinc-950">₹{selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
