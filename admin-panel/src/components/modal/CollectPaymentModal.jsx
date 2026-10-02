import React, { useMemo, useState } from "react";
import { Wallet, Tags, ReceiptText, X, CheckCircle, Download, Loader2 } from "lucide-react";
import { useCollectPayment, useStudentFinance, useUpdateFeeDiscount, useDownloadReceipt } from "../../hooks/useFinance.js";
import EntityForm from "../common/EntityForm";

const CollectPaymentModal = ({ isOpen, onClose, studentId, studentName }) => {
  const paymentMutation = useCollectPayment();
  const discountMutation = useUpdateFeeDiscount();
  const { mutate: downloadReceipt, isPending: isDownloading } = useDownloadReceipt(); // 🚀 Backend PDF Hook
  
  const { data: financeData } = useStudentFinance(studentId);

  const [activeTab, setActiveTab] = useState("payment");
  const [successfulTxn, setSuccessfulTxn] = useState(null); // 🚀 Success state

  const feeSummary = financeData?.fee_summary || {};
  const dueAmount = useMemo(() => {
    return (feeSummary.net_payable || 0) - (feeSummary.paid_amount || 0);
  }, [feeSummary]);

  if (!isOpen) return null;

  const paymentConfig = [
    { name: "amount", label: "Payment Amount (BDT)", type: "number", required: true, placeholder: `Current Due: ৳${dueAmount.toLocaleString()}`, props: { max: dueAmount, min: 1, step: "any" } },
    { name: "payment_type", label: "Category", type: "select", required: true, options: [{ label: "Installment", value: "Installment" }, { label: "Admission Fee", value: "Admission Fee" }, { label: "Other", value: "Other" }], defaultOption: "Select Type" },
    { name: "payment_method", label: "Method", type: "select", required: true, options: [{ label: "Cash", value: "Cash" }, { label: "Mobile Banking", value: "Mobile Banking" }, { label: "Bank Transfer", value: "Bank Transfer" }, { label: "Card", value: "Card" }], defaultOption: "Select Method" },
    { name: "transaction_id", label: "TrxID / Reference", type: "text", placeholder: "e.g. bKash TrxID", fullWidth: false },
    { name: "remarks", label: "Remarks", type: "textarea", placeholder: "Internal notes...", fullWidth: true },
  ];

  const discountConfig = [
    { name: "additional_discount", label: "Add Extra Discount Amount (BDT)", type: "number", required: true, placeholder: "e.g. 500", props: { min: 1, max: dueAmount, step: "any" } },
  ];

  const handlePaymentSubmit = async (formDataInstance, plainDataObject) => {
    try {
      const res = await paymentMutation.mutateAsync({
        ...plainDataObject,
        fee_record: feeSummary._id,
        amount: Number(plainDataObject.amount),
      });
      // 🚀 Show Success Screen
      if (res?.data?.payment) setSuccessfulTxn(res.data.payment);
      else if (res?.data) setSuccessfulTxn(res.data);
    } catch (err) { console.error("Payment failed", err); }
  };

  const handleDiscountSubmit = async (formDataInstance, plainDataObject) => {
    try {
      const currentTotalDiscount = feeSummary.discount || 0;
      await discountMutation.mutateAsync({
        feeId: feeSummary._id,
        discount: currentTotalDiscount + Number(plainDataObject.additional_discount),
      });
      setActiveTab("payment");
    } catch (err) { console.error("Discount update failed", err); }
  };

  // 🚀 SUCCESS SCREEN UI
  if (successfulTxn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl text-center shadow-2xl relative flex flex-col items-center">
          <CheckCircle className="text-emerald-500 mb-4" size={64} />
          <h2 className="text-2xl font-black text-zinc-100 tracking-tight">Payment Successful!</h2>
          <p className="text-sm font-bold text-zinc-500 mt-2">Receipt No: <span className="font-mono text-zinc-200">{successfulTxn.receipt_number}</span></p>
          
          <div className="flex gap-3 w-full mt-8">
            <button onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-zinc-500 font-black uppercase tracking-widest text-xs rounded-xl transition-all">
              Done
            </button>
            <button 
              onClick={() => downloadReceipt(successfulTxn._id)} 
              disabled={isDownloading}
              className="flex-1 py-3 bg-power-red hover:bg-[#C8102E] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-power-red/20"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isDownloading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🚀 MAIN MODAL UI
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white/5 shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden relative">
        <div className="p-6 bg-white/5 border-b border-white/5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-black text-zinc-100 flex items-center gap-2">
              <Wallet size={20} className="text-power-red" /> Action Panel
            </h2>
            <p className="text-xs font-bold text-zinc-500 mt-1">For <span className="text-power-red">{studentName}</span></p>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors text-zinc-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-white/5 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex bg-white/5 p-1.5 rounded-2xl mb-6 shrink-0">
            <button onClick={() => setActiveTab("payment")} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === "payment" ? "bg-white/5 text-power-red shadow-sm" : "text-zinc-500 hover:text-zinc-500"}`}>
              <ReceiptText size={16} /> Collect
            </button>
            <button onClick={() => setActiveTab("discount")} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === "discount" ? "bg-white/5 text-power-red shadow-sm" : "text-zinc-500 hover:text-zinc-500"}`}>
              <Tags size={16} /> Discount
            </button>
          </div>

          <div className="flex-1">
            {activeTab === "payment" ? (
              dueAmount <= 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-emerald-600 bg-emerald-50/50 rounded-3xl border border-emerald-100 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-500 shadow-inner">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-black">Account Settled</h3>
                  <p className="text-xs font-bold text-emerald-600/70 mt-2">No outstanding balance.</p>
                </div>
              ) : (
                <EntityForm
                  title="" subtitle={`Total Due: ৳${dueAmount.toLocaleString()}`} config={paymentConfig}
                  onSubmit={handlePaymentSubmit} isLoading={paymentMutation.isPending} onCancel={onClose}
                  buttonText="Confirm & Complete" buttonColor="bg-power-red hover:bg-[#C8102E] shadow-power-red/20"
                  initialData={{ payment_type: "Installment", payment_method: "Cash" }}
                />
              )
            ) : (
              <EntityForm
                title="" subtitle={`Current Fee: ৳${feeSummary.net_payable?.toLocaleString()}`} config={discountConfig}
                onSubmit={handleDiscountSubmit} isLoading={discountMutation.isPending} onCancel={onClose}
                buttonText="Apply Extra Discount" buttonColor="bg-power-red hover:bg-[#C8102E] shadow-power-red/20"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectPaymentModal;