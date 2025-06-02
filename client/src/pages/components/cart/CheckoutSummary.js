import React from "react";
import { Form, Button } from "react-bootstrap";

const CheckoutSummary = ({
    cartItems,
    subtotal,
    tax,
    shippingFee,
    discountAmount,
    total,
    discountCode,
    setDiscountCode,
    handleApplyDiscount,
}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div className="checkout-summary">
            <h5 className="mb-4">Sản phẩm:</h5>
            <div>
                {cartItems && cartItems.map((item, index) => (
                    <div key={index} className="d-flex mb-3 align-items-center">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                borderRadius: "5px",
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <p className="mb-1">{item.name}</p>
                            <small className="text-muted">
                                {item.color && `Color: ${item.color}, `}
                                {item.size && `Size: ${item.size}`}
                            </small>
                        </div>
                        <div className="text-end">
                            <p className="mb-0">
                                <strong>{formatCurrency(item.price * item.quantity)}</strong>
                            </p>
                            <small className="text-muted">x{item.quantity}</small>
                        </div>
                    </div>
                ))}
            </div>

            <hr />
            <div className="summary-details">
                <div className="d-flex justify-content-between">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Thuế (VAT):</span>
                    <span>{formatCurrency(tax)}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(shippingFee)}</span>
                </div>
                {discountAmount > 0 && (
                    <div className="d-flex justify-content-between">
                        <span>Giảm giá:</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                )}
                <hr />
                <div className="d-flex justify-content-between">
                    <strong>Tổng cộng:</strong>
                    <strong>{formatCurrency(total)}</strong>
                </div>
            </div>

            <div className="mt-4">
                <p className="mb-2">Bạn có mã phiếu giảm giá?</p>
                <div className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Nhập mã giảm giá..."
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button variant="danger" onClick={handleApplyDiscount} className="ms-2">
                        Áp dụng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary;
