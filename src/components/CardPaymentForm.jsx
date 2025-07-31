const CardPaymentForm = () => (
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Card Number"
      className="w-full p-2 bg-[#0F1115] border border-gray-600 rounded"
    />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="MM/YY"
        className="p-2 bg-[#0F1115] border border-gray-600 rounded"
      />
      <input
        type="text"
        placeholder="CVV"
        className="p-2 bg-[#0F1115] border border-gray-600 rounded"
      />
    </div>
    <input
      type="text"
      placeholder="Cardholder Name"
      className="w-full p-2 bg-[#0F1115] border border-gray-600 rounded"
    />
  </div>
);

export default CardPaymentForm;
