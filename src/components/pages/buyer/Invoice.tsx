import { getStatusColor } from "../../../utilities/color";
import { formatCurrency } from "../../../utilities/general";

interface OrderItem {
  id?: number;
  name: string;
  unitPrice: number | string;
  quantity: number;
  total: number | string;
}

interface OrderDetailsData {
  id: string;
  createdDate: string;
  reference: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  businessName?: string;
  businessAddress?: string;
  paymentType: string;
  disputeManager: string;
  inspectionPeriod: string;
  dueDate: string;
  buyerPaysEscrowFee: boolean;
  items?: OrderItem[];
  subtotal: number | string;
  deliveryFee: number | string;
  escrowFee: number | string;
  total: number | string;
  status?: string;
  allowPayment?: boolean;
}

interface InvoiceProps {
  orderDetails: OrderDetailsData | null;
  orderStatus?: { status: string, allowPayment: boolean };
  allowPayment?: boolean;
}

export default function Invoice({
  orderDetails,
  orderStatus,
  allowPayment,
}: InvoiceProps) {
  const orderData = {
    id: orderDetails?.id || "",
    invoiceDate: orderDetails?.createdDate || "",
    invoiceNumber: orderDetails?.reference || "",
    recipientName: orderDetails?.recipientName || "",
    recipientEmail: orderDetails?.recipientEmail || "",
    recipientPhone: orderDetails?.recipientPhone || "",
    recipientAddress: orderDetails?.recipientAddress || "",
    businessName: orderDetails?.businessName || "Bridge Marketplace",
    businessAddress:
      orderDetails?.businessAddress || "",
    paymentType: orderDetails?.paymentType || "",
    disputeManager: orderDetails?.disputeManager || "",
    inspectionPeriod: orderDetails?.inspectionPeriod || "",
    dueDate: orderDetails?.dueDate || "",
    buyerPaysEscrowFee: orderDetails?.buyerPaysEscrowFee || false,
    orderItems:
      orderDetails?.items?.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.unitPrice,
        quantity: item.quantity,
        total: item.total,
      })) || [],
    subTotal: orderDetails?.subtotal || 0,
    deliveryFee: orderDetails?.deliveryFee || 0,
    escrowFee: orderDetails?.escrowFee || 0,
    total: orderDetails?.total || 0,
    status: orderStatus?.status || "...",
    allowPayment: orderStatus?.allowPayment,
  };

  const statusStyle = getStatusColor(orderData.status);

  return (
    <div className="w-full">
      {orderData.status !== "Completed" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-textColor mb-2">
            Order Summary
            {allowPayment === true && (
              <span className="text-base font-normal text-textColor ml-2">
                (Kindly confirm your order details below before making payment)
              </span>
            )}
          </h2>
        </div>
      )}

      {/* Invoice Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
          <div className="order-2 lg:order-none">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-orange-600 text-xl">🏪</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-textColor">
                {orderData.businessName}
              </h3>
              <p className="text-sm font-medium text-textColor pb-2">
                {orderData.businessAddress}
              </p>
              <p className="text-sm font-medium text-grey2">
                {orderData.invoiceDate}
              </p>
            </div>
          </div>

          <div className="lg:text-right mb-9 lg:mb-0">
            <h4 className="text-3xl font-bold text-textColor pb-2 ">
              Invoice #{orderData.invoiceNumber}
            </h4>
            <span
              style={statusStyle}
              className={`text-xs font-medium px-2 py-1 rounded-full`}
            >
              {orderData.status}
            </span>
          </div>
        </div>

        {/* Recipient and Order Details */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10 lg:mb-8">
          <div>
            <h4 className="text-base font-bold text-textColor mb-2">
              Recipient Details
            </h4>
            <p className="text-base text-textColor">
              {orderData.recipientName}
            </p>
            <p className="text-base text-grey2">{orderData.recipientEmail}</p>
            <p className="text-base text-grey2">{orderData.recipientPhone}</p>
            <p className="text-base text-grey2">{orderData.recipientAddress}</p>
          </div>

          <div className="lg:text-right">
            <h4 className="font-bold text-base text-textColor mb-2">
              Order Details
            </h4>
            <p className="text-base text-grey2">
              Payment Type:&nbsp;
              <span className="text-textColor">{orderData.paymentType}</span>
            </p>
            <p className="text-base text-grey2">
              Dispute Manager:&nbsp;
              <span className="text-textColor">{orderData.disputeManager}</span>
            </p>
            <p className="text-base text-grey2">
              Inspection Period:&nbsp;
              <span className="text-textColor">
                {orderData.inspectionPeriod}
              </span>
            </p>
            <p className="text-base text-grey2">
              Due Date:&nbsp;
              <span className="text-textColor">{orderData.dueDate}</span>
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="overflow-x-auto">
          <div className="gap-0 bg-white">
            {/* Header Row */}
            <section className="grid grid-cols-[100px_1fr_1fr]  lg:grid-cols-[60px_1fr_1fr_1fr_1fr]">
              <div className="bg-[#EEEEEE] py-3 px-3 text-sm font-semibold text-gray-700">
                #
              </div>
              <div className="bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                Item
              </div>
              <div className="hidden lg:block bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                Price
              </div>
              <div className="hidden lg:block bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                Unit
              </div>
              <div className="bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                TOTAL
              </div>
            </section>

            {/* Data Rows */}
            {orderData.orderItems.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-[100px_1fr_1fr] lg:grid-cols-[60px_1fr_1fr_1fr_1fr]"
              >
                <div className="py-4 px-3 text-sm text-gray-600 ">
                  {index + 1}
                </div>
                <div className="py-4 px-4 text-sm text-gray-900 flex flex-col lg:block">
                  {item.name}
                  <span className="text-grey2 lg:hidden">{`Quantity: ${item.quantity}`}</span>
                </div>
                <div className="hidden lg:block py-4 px-4 text-sm text-gray-600">
                  {formatCurrency(item.price)}
                </div>
                <div className="hidden lg:block py-4 px-4 text-sm text-gray-600">
                  {item.quantity}
                </div>
                <div className="py-4 px-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(item.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 w-full flex justify-between lg:justify-end">
          <div className="space-y-3 lg:space-y-2 w-full lg:w-auto">
            <div className="flex text-sm gap-x-14 justify-between">
              <span className="text-gray-600">SUBTOTAL</span>
              <span className="font-semibold">
                {formatCurrency(orderData.subTotal)}
              </span>
            </div>
            <div className="flex text-sm gap-x-14 justify-between">
              <span className="text-gray-600">Delivery fee</span>
              <span className="font-semibold">
                {formatCurrency(orderData.deliveryFee)}
              </span>
            </div>
            <div className="flex text-sm gap-x-14 justify-between">
              <span className="text-gray-600">Escrow fee (5%)</span>
              <span className="font-semibold">
                {formatCurrency(orderData.escrowFee)}
              </span>
            </div>
            <div className="flex gap-x-14 text-lg font-bold pt-2 justify-between">
              <span>TOTAL</span>
              <span> {formatCurrency(orderData.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
