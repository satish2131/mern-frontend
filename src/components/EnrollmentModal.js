import React, { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaShieldAlt, FaCreditCard, FaTag, FaCheckCircle, FaBookOpen, FaClock, FaStar, FaSpinner, FaBolt } from "react-icons/fa";
import "./EnrollmentModal.css";

const Confetti = lazy(() => import("react-confetti"));

export default function EnrollmentModal({ show, course, onClose, fromHome = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!show || !course) return null;

  const basePrice = course.price || 49.99;
  const discountAmount = discountApplied ? basePrice * 0.5 : basePrice * 0.2;
  const finalPrice = Math.max(0, basePrice - discountAmount).toFixed(2);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "LEARNX50" || promoCode.trim().toUpperCase() === "PROMO50") {
      setDiscountApplied(true);
    } else {
      alert("Invalid code. Try LEARNX50 for 50% off!");
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim();

    if (!emailTrimmed) {
      alert("Please enter an email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 4000);
    }, 1800);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
    navigate("/courses");
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {showConfetti && (
          <Suspense fallback={null}>
            <Confetti numberOfPieces={200} recycle={false} />
          </Suspense>
        )}

        <button className="checkout-close" onClick={onClose} aria-label="Close modal">
          <FaTimes size={16} />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="checkout-header">
              <div className="checkout-badge">Instant Enrollment</div>
              <h2>Checkout Order</h2>
              <p>Complete payment to get lifetime access & certificate.</p>
            </div>

            {/* Course Summary Box */}
            <div className="course-summary-box">
              <div className="summary-thumb">
                <FaBookOpen size={24} />
              </div>
              <div className="summary-info">
                <h4>{course.title}</h4>
                <div className="summary-meta">
                  <span><FaClock size={12} /> {course.duration || "Self-Paced"}</span>
                  <span><FaStar size={12} color="#fbbf24" /> 4.9 (1.2k reviews)</span>
                </div>
              </div>
              <div className="summary-price">${basePrice}</div>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
              {/* Email Address */}
              <div className="checkout-field">
                <label>Access Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Promo Code Input */}
              <div className="checkout-field">
                <label>Discount Code</label>
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter LEARNX50"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="button" className="btn-promo" onClick={applyPromo}>
                    <FaTag size={12} /> Apply
                  </button>
                </div>
                {discountApplied && (
                  <div className="promo-success">
                    <FaCheckCircle color="#10b981" /> 50% Special Discount Applied!
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="checkout-field">
                <label>Select Payment Method</label>
                <div className="payment-options">
                  <button
                    type="button"
                    className={`pay-opt ${paymentMethod === "card" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <FaCreditCard /> Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    className={`pay-opt ${paymentMethod === "upi" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <FaBolt color="#f59e0b" /> Instant UPI / Apple Pay
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Course Price</span>
                  <span>${basePrice}</span>
                </div>
                <div className="price-row discount-row">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="price-row total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">${finalPrice}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-checkout-submit" disabled={isProcessing}>
                {isProcessing ? (
                  <span className="loading-spinner"><FaSpinner className="spin" /> Processing Order...</span>
                ) : (
                  `Pay $${finalPrice} & Enroll`
                )}
              </button>

              <div className="checkout-security-note">
                <FaShieldAlt color="#10b981" /> 256-Bit SSL Encrypted | 30-Day Money-Back Guarantee
              </div>
            </form>
          </>
        ) : (
          /* Order Success Receipts */
          <div className="order-success-box text-center animate-fade-in">
            <div className="success-icon-badge">
              <FaCheckCircle size={44} color="#10b981" />
            </div>
            <h3>Enrollment Successful!</h3>
            <p className="success-subtitle">
              Congratulations! Access link and enrollment credentials have been dispatched to <strong>{email}</strong>.
            </p>

            <div className="receipt-card">
              <div className="receipt-row">
                <span>Course:</span>
                <strong>{course.title}</strong>
              </div>
              <div className="receipt-row">
                <span>Access Type:</span>
                <span className="badge badge-success">Lifetime Unlimited</span>
              </div>
              <div className="receipt-row">
                <span>Total Paid:</span>
                <strong>${finalPrice}</strong>
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={handleFinish}>
              Start Learning Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
