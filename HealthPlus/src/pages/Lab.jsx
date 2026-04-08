import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "./Lab.css";

const Lab = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTests, setSelectedTests] = useState([]);
  const [orderTools, setOrderTools] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const labTests = [
    {
      id: "blood_complete",
      name: t("complete_blood_count"),
      description: t("cbc_description"),
      price: "₹3,375",
      tools: ["Vacutainer Tubes", "Alcohol Prep Pads", "Sterile Bandages", "Collection Instructions"],
      sampleType: t("blood"),
      turnaroundTime: t("24_48_hours"),
      category: t("hematology"),
    },
    {
      id: "urine_analysis",
      name: t("complete_urinalysis"),
      description: t("urinalysis_description"),
      price: "₹1,875",
      tools: ["Sterile Collection Container", "Antiseptic Wipes", "Collection Instructions"],
      sampleType: t("urine"),
      turnaroundTime: t("24_48_hours"),
      category: t("clinical_chemistry"),
    },
    {
      id: "lipid_panel",
      name: t("comprehensive_lipid_panel"),
      description: t("lipid_description"),
      price: "₹4,125",
      tools: ["Serum Separator Tubes", "Alcohol Prep Pads", "Sterile Bandages", "Fasting Guidelines"],
      sampleType: t("blood"),
      turnaroundTime: t("24_48_hours"),
      category: t("cardiology"),
    },
    {
      id: "thyroid_function",
      name: t("thyroid_function_panel"),
      description: t("thyroid_description"),
      price: "₹4,875",
      tools: ["Serum Collection Tubes", "Alcohol Prep Pads", "Sterile Bandages", "Collection Instructions"],
      sampleType: t("blood"),
      turnaroundTime: t("48_72_hours"),
      category: t("endocrinology"),
    },
    {
      id: "diabetes_hba1c",
      name: t("hba1c_diabetes_panel"),
      description: t("diabetes_description"),
      price: "₹3,000",
      tools: ["EDTA Collection Tubes", "Alcohol Prep Pads", "Sterile Bandages", "Collection Instructions"],
      sampleType: t("blood"),
      turnaroundTime: t("24_48_hours"),
      category: t("endocrinology"),
    },
    {
      id: "liver_function",
      name: t("comprehensive_liver_panel"),
      description: t("liver_description"),
      price: "₹3,750",
      tools: ["Serum Separator Tubes", "Alcohol Prep Pads", "Sterile Bandages", "Collection Instructions"],
      sampleType: t("blood"),
      turnaroundTime: t("24_48_hours"),
      category: t("hepatology"),
    },
  ];

  const handleTestSelection = (testId) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((id) => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardInfoChange = (field, value) => {
    let formattedValue = value;
    if (field === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (formattedValue.length > 5) return;
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 4) return;
    }
    setCardInfo((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const getRequiredTools = () => {
    const allTools = new Set();
    selectedTests.forEach((testId) => {
      const test = labTests.find((t) => t.id === testId);
      if (test) test.tools.forEach((tool) => allTools.add(tool));
    });
    return Array.from(allTools);
  };

  const getTotalPrice = () => {
    const testPrice = selectedTests.reduce((total, testId) => {
      const test = labTests.find((t) => t.id === testId);
      return total + (test ? parseInt(test.price.replace(/₹|,/g, "")) : 0);
    }, 0);
    const toolPrice = orderTools ? 1125 : 0;
    return testPrice + toolPrice;
  };

  const formatPrice = (price) => price.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const validatePaymentInfo = () => {
    if (paymentMethod === "card") {
      const { cardNumber, expiryDate, cvv, cardholderName } = cardInfo;
      if (!cardNumber.replace(/\s/g, "") || cardNumber.replace(/\s/g, "").length < 13) { alert(t("enter_valid_card_number")); return false; }
      if (!expiryDate || expiryDate.length !== 5) { alert(t("enter_valid_expiry_date")); return false; }
      if (!cvv || cvv.length < 3) { alert(t("enter_valid_cvv")); return false; }
      if (!cardholderName.trim()) { alert(t("enter_cardholder_name")); return false; }
    } else if (paymentMethod === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) { alert(t("enter_valid_upi_id")); return false; }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (selectedTests.length === 0) { alert(t("select_at_least_one_test")); return; }
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) { alert(t("fill_required_fields")); return; }
    if (!validatePaymentInfo()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/lab-confirmation", { state: { tests: selectedTests, personalInfo, orderTools, totalPrice: getTotalPrice(), paymentMethod, orderNumber: "LAB-" + Date.now().toString().slice(-8) } });
    } catch { alert(t("unable_to_process")); } finally { setIsSubmitting(false); }
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedTests.length === 0) { alert(t("select_at_least_one_test")); return; }
    if (currentStep === 3 && (!personalInfo.name || !personalInfo.email || !personalInfo.phone)) { alert(t("fill_required_fields")); return; }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t("laboratory_test_selection");
      case 2: return t("sample_collection_method");
      case 3: return t("patient_information");
      case 4: return t("payment_method");
      case 5: return t("order_review_confirmation");
      default: return t("laboratory_services");
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-card">
        <div className="lab-header">
          <div className="lab-brand">
            <div className="brand-icon">⚕️</div>
            <div className="brand-text">
              <h1>{t("laboratory_services")}</h1>
              <p className="subtitle">{t("professional_diagnostic")}</p>
            </div>
          </div>
        </div>

        <div className="content-area">
         <div className="section-header">
  <h2>{getStepTitle()}</h2>
  <div className="step-counter">{t("step")} {currentStep} {t("of")} 5</div>
</div>

{/* Step 1: Laboratory Test Selection */}
{currentStep === 1 && (
  <div className="step-content">
    <div className="tests-container">
      {labTests.map((test) => (
        <div
          key={test.id}
          className={`test-card ${selectedTests.includes(test.id) ? 'selected' : ''}`}
          onClick={() => handleTestSelection(test.id)}
        >
          <div className="test-card-header">
            <input
              type="checkbox"
              checked={selectedTests.includes(test.id)}
              onChange={() => handleTestSelection(test.id)}
              className="professional-checkbox"
            />
            <div className="test-main-info">
              <div className="test-title-row">
                <h3>{test.name}</h3>
                <div className="test-price">{test.price}</div>
              </div>
              <div className="test-category">{test.category}</div>
            </div>
          </div>
          <p className="test-description">{test.description}</p>
          <div className="test-metadata">
            <div className="metadata-item">
              <span className="metadata-icon">🧪</span>
              <span className="metadata-text">{t("sample")}: {test.sampleType}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-icon">⏰</span>
              <span className="metadata-text">{t("results")}: {test.turnaroundTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    {selectedTests.length > 0 && (
      <div className="selection-summary">
        <div className="summary-content">
          <div className="summary-text">
            <strong>{selectedTests.length}</strong> {t("tests_selected")}
          </div>
          <div className="summary-price">
            {t("subtotal")}: <strong>{formatPrice(selectedTests.reduce((total, testId) => {
              const test = labTests.find((t) => t.id === testId);
              return total + (test ? parseInt(test.price.replace(/₹|,/g, "")) : 0);
            }, 0))}</strong>
          </div>
        </div>
        <button onClick={nextStep} className="primary-button">
          {t("continue_to_collection")}
          <span className="button-arrow">→</span>
        </button>
      </div>
    )}
  </div>
)}

{/* Step 2: Collection Method */}
{currentStep === 2 && (
  <div className="step-content">
    <div className="collection-options">
      <div className={`collection-option ${orderTools ? 'selected' : ''}`}>
        <input
          type="radio"
          id="home-collection"
          name="collection-method"
          checked={orderTools}
          onChange={() => setOrderTools(true)}
          className="professional-radio"
        />
        <label htmlFor="home-collection">
          <div className="option-content">
            <h3>{t("home_collection_kit")}</h3>
            <p>{t("home_collection_desc")}</p>
          </div>
        </label>
      </div>
      <div className={`collection-option ${!orderTools ? 'selected' : ''}`}>
        <input
          type="radio"
          id="lab-visit"
          name="collection-method"
          checked={!orderTools}
          onChange={() => setOrderTools(false)}
          className="professional-radio"
        />
        <label htmlFor="lab-visit">
          <div className="option-content">
            <h3>{t("laboratory_collection")}</h3>
            <p>{t("lab_visit_desc")}</p>
          </div>
        </label>
      </div>
    </div>
    <div className="step-navigation">
      <button onClick={prevStep} className="secondary-button">
        <span className="button-arrow">←</span> {t("back_to_tests")}
      </button>
      <button onClick={nextStep} className="primary-button">
        {t("continue_to_patient_info")} <span className="button-arrow">→</span>
      </button>
    </div>
  </div>
)}

{/* Step 3: Patient Information */}
{currentStep === 3 && (
  <div className="step-content">
    <div className="form-container">
      <div className="form-section">
        <h3>{t("contact_information")}</h3>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">{t("full_name")} *</label>
            <input
              type="text"
              id="name"
              value={personalInfo.name}
              onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
              placeholder={t("enter_full_name")}
              className="professional-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">{t("email")} *</label>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
              placeholder={t("enter_email")}
              className="professional-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">{t("phone")} *</label>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
              placeholder={t("enter_phone")}
              className="professional-input"
            />
          </div>
        </div>
      </div>
      <div className="form-section">
        <h3>{t("mailing_address")}</h3>
        <div className="form-grid">
          <div className="form-field full-width">
            <label htmlFor="address">{t("street_address")}</label>
            <input
              type="text"
              id="address"
              value={personalInfo.address}
              onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
              placeholder={t("enter_street_address")}
              className="professional-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="city">{t("city")}</label>
            <input
              type="text"
              id="city"
              value={personalInfo.city}
              onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
              placeholder={t("enter_city")}
              className="professional-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="zipCode">{t("pin_code")}</label>
            <input
              type="text"
              id="zipCode"
              value={personalInfo.zipCode}
              onChange={(e) => handlePersonalInfoChange("zipCode", e.target.value)}
              placeholder="400001"
              className="professional-input"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="step-navigation">
      <button onClick={prevStep} className="secondary-button">
        <span className="button-arrow">←</span> {t("back_to_collection")}
      </button>
      <button onClick={nextStep} className="primary-button">
        {t("continue_to_payment")} <span className="button-arrow">→</span>
      </button>
    </div>
  </div>
)}

{/* Step 4: Payment */}
{currentStep === 4 && (
  <div className="step-content">
    <div className="payment-section">
      <div className="order-summary">
        <h3>{t("order_summary")}</h3>
        <div className="summary-item">
          <span>{t("laboratory_tests")} ({selectedTests.length})</span>
          <span>{formatPrice(selectedTests.reduce((total, testId) => {
            const test = labTests.find((t) => t.id === testId);
            return total + (test ? parseInt(test.price.replace(/₹|,/g, "")) : 0);
          }, 0))}</span>
        </div>
        <div className="summary-item">
          <span>{t("collection_kit")}</span>
          <span>{orderTools ? '₹1,125' : t("free")}</span>
        </div>
        <div className="summary-item total">
          <span>{t("total_amount")}</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>
      </div>
      <div className="payment-methods">
        <h3>{t("select_payment_method")}</h3>
        <div className="payment-options">
          <div className="payment-option">
            <input type="radio" id="card-payment" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label htmlFor="card-payment">
              <h4>💳 {t("credit_debit_card")}</h4>
              <p>{t("pay_securely")}</p>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" id="upi-payment" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label htmlFor="upi-payment">
              <h4>📱 {t("upi_payment")}</h4>
              <p>{t("pay_using_upi")}</p>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" id="cod-payment" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label htmlFor="cod-payment">
              <h4>💵 {t("cash_on_delivery")}</h4>
              <p>{t("pay_on_delivery")}</p>
            </label>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-details">
            <h4>{t("card_details")}</h4>
            <div className="card-form">
              <div className="form-field">
                <label htmlFor="cardholderName">{t("cardholder_name")} *</label>
                <input type="text" id="cardholderName" value={cardInfo.cardholderName} onChange={(e) => handleCardInfoChange("cardholderName", e.target.value)} placeholder={t("enter_name_on_card")} className="professional-input" />
              </div>
              <div className="form-field">
                <label htmlFor="cardNumber">{t("card_number")} *</label>
                <input type="text" id="cardNumber" value={cardInfo.cardNumber} onChange={(e) => handleCardInfoChange("cardNumber", e.target.value)} placeholder="1234 5678 9012 3456" className="professional-input" />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="expiryDate">{t("expiry_date")} *</label>
                  <input type="text" id="expiryDate" value={cardInfo.expiryDate} onChange={(e) => handleCardInfoChange("expiryDate", e.target.value)} placeholder="MM/YY" className="professional-input" />
                </div>
                <div className="form-field">
                  <label htmlFor="cvv">{t("cvv")} *</label>
                  <input type="text" id="cvv" value={cardInfo.cvv} onChange={(e) => handleCardInfoChange("cvv", e.target.value)} placeholder="123" className="professional-input" />
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="payment-details">
            <h4>{t("upi_details")}</h4>
            <div className="form-field">
              <label htmlFor="upiId">{t("upi_id")} *</label>
              <input type="text" id="upiId" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@paytm" className="professional-input" />
            </div>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="payment-details">
            <h4>{t("cash_on_delivery")}</h4>
            <p>{t("cod_description")} {formatPrice(getTotalPrice())}</p>
          </div>
        )}
      </div>
    </div>
    <div className="step-navigation">
      <button onClick={prevStep} className="secondary-button">
        <span className="button-arrow">←</span> {t("back_to_info")}
      </button>
      <button onClick={nextStep} className="primary-button">
        {t("review_order")} <span className="button-arrow">→</span>
      </button>
    </div>
  </div>
)}

{/* Step 5: Review & Submit */}
{currentStep === 5 && (
  <div className="step-content">
  {/* Step 5: Review & Submit */}
{currentStep === 5 && (
  <div className="step-content">
    <div className="order-review">
      <div className="review-section">
        <h3>{t("selected_lab_tests")}</h3>
        <div className="tests-review">
          {selectedTests.map(testId => {
            const test = labTests.find(t => t.id === testId);
            return (
              <div key={testId} className="review-test-item">
                <div className="test-info">
                  <div className="test-name">{test.name}</div>
                  <div className="test-category-small">{test.category}</div>
                </div>
                <div className="test-price-review">{test.price}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="review-section">
        <h3>{t("collection_method")}</h3>
        <div className="method-review">
          <div className="method-info">
            <span className="method-icon">{orderTools ? '📦' : '🏥'}</span>
            <div className="method-details">
              <div className="method-name">
                {orderTools ? t("home_collection_kit") : t("lab_collection")}
              </div>
              <div className="method-description">
                {orderTools
                  ? t("home_collection_desc")
                  : t("lab_collection_desc")}
              </div>
            </div>
          </div>
          <div className="method-price">
            {orderTools ? '₹1,125' : t("no_charge")}
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>{t("patient_information")}</h3>
        <div className="patient-review">
          <div className="patient-field">
            <span className="field-label">{t("name")}:</span>
            <span className="field-value">{personalInfo.name}</span>
          </div>
          <div className="patient-field">
            <span className="field-label">{t("email")}:</span>
            <span className="field-value">{personalInfo.email}</span>
          </div>
          <div className="patient-field">
            <span className="field-label">{t("phone")}:</span>
            <span className="field-value">{personalInfo.phone}</span>
          </div>
          {personalInfo.address && (
            <div className="patient-field">
              <span className="field-label">{t("address")}:</span>
              <span className="field-value">
                {personalInfo.address}
                {personalInfo.city && `, ${personalInfo.city}`}
                {personalInfo.zipCode && ` ${personalInfo.zipCode}`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="review-section">
        <h3>{t("payment_method")}</h3>
        <div className="payment-review">
          <span className="payment-method-display">
            {paymentMethod === 'card' && t("credit_debit_card")}
            {paymentMethod === 'upi' && t("upi_payment")}
            {paymentMethod === 'cod' && t("cash_on_delivery")}
          </span>
        </div>
      </div>

      <div className="order-total">
        <div className="total-breakdown">
          <div className="total-line">
            <span>{t("lab_tests")}:</span>
            <span>{formatPrice(selectedTests.reduce((total, testId) => {
              const test = labTests.find(t => t.id === testId);
              return total + (test ? parseInt(test.price.replace(/₹|,/g, '')) : 0);
            }, 0))}</span>
          </div>
          <div className="total-line">
            <span>{t("collection_method")}:</span>
            <span>{orderTools ? '₹1,125' : '₹0'}</span>
          </div>
          <div className="total-final">
            <span>{t("total_amount")}:</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
      </div>

      <div className="final-actions">
        <button onClick={prevStep} className="secondary-button">
          <span className="button-arrow">←</span> {t("edit_payment")}
        </button>
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className={`primary-button submit-button ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner"></div>
              {t("processing_order")}
            </>
          ) : (
            <>
              <span className="submit-icon">⚕️</span>
              {paymentMethod === 'cod'
                ? t("place_order_cod")
                : `${t("pay")} ${formatPrice(getTotalPrice())} & ${t("submit")}`}
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)}

</div>
)}

        </div>
      </div>
    </div>
  );
};

export default Lab;
