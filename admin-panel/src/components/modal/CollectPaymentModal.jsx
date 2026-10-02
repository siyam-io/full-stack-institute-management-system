import React, { useMemo, useState, useEffect } from "react";
import { Wallet, Tags, ReceiptText, X, CheckCircle, Download, Loader2, Smartphone, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useCollectPayment, useStudentFinance, useUpdateFeeDiscount, useDownloadReceipt } from "../../hooks/useFinance.js";
import { initBkashPaymentAPI, executeBkashPaymentAPI } from "../../api/payment.api.js";
import EntityForm from "../common/EntityForm";

const CollectPaymentModal = ({ isOpen, onClose, studentId, studentName }) => {
  const paymentMutation = useCollectPayment();
  const discountMutation = useUpdateFeeDiscount();
  const { mutate: downloadReceipt, isPending: isDownloading } = useDownloadReceipt(); // 🚀 Backend PDF Hook
  
  const { data: financeData } = useStudentFinance(studentId);

  const [activeTab, setActiveTab] = useState("payment"); // "payment" | "bkash" | "discount"
  const [successfulTxn, setSuccessfulTxn] = useState(null); // 🚀 Success state
  const [bkashAmount, setBkashAmount] = useState("");
  const [bkashPhone, setBkashPhone] = useState("");
  const [isBkashLoading, setIsBkashLoading] = useState(false);

  const feeSummary = financeData?.fee_summary || {};
  const dueAmount = useMemo(() => {
    return (feeSummary.net_payable || 0) - (feeSummary.paid_amount || 0);
  }, [feeSummary]);

  useEffect(() => {
    if (dueAmount > 0) setBkashAmount(dueAmount);
    if (feeSummary.student?.contact_number) {
      setBkashPhone(feeSummary.student.contact_number);
    }
  }, [dueAmount, feeSummary]);

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

  const handleBkashCheckout = async (e) => {
    e.preventDefault();
    const amt = Number(bkashAmount);
    if (!amt || amt <= 0 || amt > dueAmount) {
      return toast.error(`Enter a valid amount up to ৳${dueAmount.toLocaleString()}`);
    }

    setIsBkashLoading(true);
    try {
      const initRes = await initBkashPaymentAPI({
        invoiceId: feeSummary._id,
        amount: amt,
        payerReference: bkashPhone,
      });

      if (initRes.mode === "live" && initRes.bkashURL) {
        window.location.href = initRes.bkashURL;
        return;
      }

      // Execute simulated/sandbox checkout
      const execRes = await executeBkashPaymentAPI({
        paymentID: initRes.paymentID,
        invoiceId: feeSummary._id,
        amount: amt,
        trxID: `BK${Date.now().toString(36).toUpperCase()}`,
      });

      toast.success(execRes.message || "bKash Payment Verified Successfully!");
      if (execRes.payment) setSuccessfulTxn(execRes.payment);
      else if (execRes.data?.payment) setSuccessfulTxn(execRes.data.payment);
    } catch (err) {
      toast.error(err.response?.data?.message || "bKash checkout failed");
    } finally {
      setIsBkashLoading(false);
    }
  };

  // 🚀 SUCCESS SCREEN UI
  if (successfulTxn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl text-center shadow-2xl relative flex flex-col items-center">
          <CheckCircle className="text-emerald-500 mb-4" size={64} />
          <h2 className="text-2xl font-black text-zinc-100 tracking-tight">Payment Successful!</h2>
          <p className="text-sm font-bold text-zinc-400 mt-2">Receipt No: <span className="font-mono text-emerald-400 font-black">{successfulTxn.receipt_number}</span></p>
          <p className="text-xs text-zinc-500 mt-1">Amount: BDT {Number(successfulTxn.amount || 0).toLocaleString()}</p>
          
          <div className="flex gap-3 w-full mt-8">
            <button onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 font-black uppercase tracking-widest text-xs rounded-xl transition-all">
              Done
            </button>
            <button 
              onClick={() => downloadReceipt(successfulTxn._id || successfulTxn.id)} 
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
      <div className="w-full max-w-lg bg-zinc-900 border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden relative">
        <div className="p-6 bg-white/5 border-b border-white/5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-black text-zinc-100 flex items-center gap-2">
              <Wallet size={20} className="text-power-red" /> Fee Collection
            </h2>
            <p className="text-xs font-bold text-zinc-400 mt-1">Student: <span className="text-power-red">{studentName}</span></p>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 rounded-full transition-colors text-zinc-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-transparent overflow-y-auto custom-scrollbar flex-1">
          {/* Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl mb-6 shrink-0">
            <button 
              onClick={() => setActiveTab("payment")} 
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === "payment" ? "bg-white/10 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <ReceiptText size={15} /> Collect
            </button>
            <button 
              onClick={() => setActiveTab("bkash")} 
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === "bkash" ? "bg-[#E2136E] text-white shadow-md shadow-[#E2136E]/30" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Smartphone size={15} /> bKash Pay
            </button>
            <button 
              onClick={() => setActiveTab("discount")} 
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === "discount" ? "bg-white/10 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Tags size={15} /> Discount
            </button>
          </div>

          <div className="flex-1">
            {activeTab === "payment" ? (
              dueAmount <= 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-emerald-400 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 shadow-inner">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-black">Account Settled</h3>
                  <p className="text-xs font-bold text-emerald-400/80 mt-2">No outstanding balance.</p>
                </div>
              ) : (
                <EntityForm
                  title="" subtitle={`Total Due: ৳${dueAmount.toLocaleString()}`} config={paymentConfig}
                  onSubmit={handlePaymentSubmit} isLoading={paymentMutation.isPending} onCancel={onClose}
                  buttonText="Confirm & Complete" buttonColor="bg-power-red hover:bg-[#C8102E] shadow-power-red/20"
                  initialData={{ payment_type: "Installment", payment_method: "Cash" }}
                />
              )
            ) : activeTab === "bkash" ? (
              dueAmount <= 0 ? (
                <div className="py-10 text-center text-emerald-400 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                  <CheckCircle size={40} className="mx-auto mb-2" />
                  <p className="font-black text-sm">Account already fully paid!</p>
                </div>
              ) : (
                <form onSubmit={handleBkashCheckout} className="space-y-4">
                  <div className="p-4 bg-[#E2136E]/10 border border-[#E2136E]/30 rounded-2xl flex items-center gap-3">
                    <div className="p-2.5 bg-[#E2136E] text-white rounded-xl font-black text-xs">bKash</div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-zinc-100">bKash Online Payment Gateway</h4>
                      <p className="text-[10px] text-zinc-400">Automated checkout with instant official receipt generation</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
                      Payment Amount (BDT)
                    </label>
                    <input
                      type="number"
                      value={bkashAmount}
                      onChange={(e) => setBkashAmount(e.target.value)}
                      max={dueAmount}
                      min={1}
                      required
                      placeholder={`Max Due: ৳${dueAmount}`}
                      className="w-full bg-zinc-800 border border-white/10 text-zinc-100 text-sm font-bold rounded-2xl px-4 py-3 outline-none focus:border-[#E2136E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
                      bKash Mobile Number
                    </label>
                    <input
                      type="text"
                      value={bkashPhone}
                      onChange={(e) => setBkashPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-zinc-800 border border-white/10 text-zinc-100 text-sm font-bold rounded-2xl px-4 py-3 outline-none focus:border-[#E2136E]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isBkashLoading}
                      className="w-full py-4 bg-[#E2136E] hover:bg-[#c20f5c] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-[#E2136E]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isBkashLoading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                      {isBkashLoading ? "Processing bKash Checkout..." : `Pay ৳${Number(bkashAmount || 0).toLocaleString()} with bKash`}
                    </button>
                  </div>
                </form>
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