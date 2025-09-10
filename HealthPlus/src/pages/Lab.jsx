import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Lab.css";

const Lab = () => {
  alert("For volunteers and mentors\n Please do not add card details or bank details as this project is in development phase")
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [orderTools, setOrderTools] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [upiId, setUpiId] = useState('');

  const labTests = [
    {
      id: 'blood_complete',
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive analysis of blood components including red cells, white cells, platelets, and hemoglobin levels',
      price: '₹3,375', // $45 * 75 (approx conversion rate)
      tools: ['Vacutainer Tubes', 'Alcohol Prep Pads', 'Sterile Bandages', 'Collection Instructions'],
      sampleType: 'Blood',
      turnaroundTime: '24-48 hours',
      category: 'Hematology'
    },
    {
      id: 'urine_analysis',
      name: 'Complete Urinalysis',
      description: 'Comprehensive urine examination for infections, kidney function, metabolic disorders, and urinary tract health',
      price: '₹1,875', // $25 * 75
      tools: ['Sterile Collection Container', 'Antiseptic Wipes', 'Collection Instructions'],
      sampleType: 'Urine',
      turnaroundTime: '24-48 hours',
      category: 'Clinical Chemistry'
    },
    {
      id: 'lipid_panel',
      name: 'Comprehensive Lipid Panel',
      description: 'Complete cholesterol profile including HDL, LDL, triglycerides, and cardiovascular risk assessment',
      price: '₹4,125', // $55 * 75
      tools: ['Serum Separator Tubes', 'Alcohol Prep Pads', 'Sterile Bandages', 'Fasting Guidelines'],
      sampleType: 'Blood',
      turnaroundTime: '24-48 hours',
      category: 'Cardiology'
    },
    {
      id: 'thyroid_function',
      name: 'Thyroid Function Panel',
      description: 'Complete thyroid assessment including TSH, Free T4, Free T3, and thyroid antibodies',
      price: '₹4,875', // $65 * 75
      tools: ['Serum Collection Tubes', 'Alcohol Prep Pads', 'Sterile Bandages', 'Collection Instructions'],
      sampleType: 'Blood',
      turnaroundTime: '48-72 hours',
      category: 'Endocrinology'
    },
    {
      id: 'diabetes_hba1c',
      name: 'HbA1c Diabetes Panel',
      description: 'Long-term blood glucose control assessment over the previous 2-3 months for diabetes management',
      price: '₹3,000', // $40 * 75
      tools: ['EDTA Collection Tubes', 'Alcohol Prep Pads', 'Sterile Bandages', 'Collection Instructions'],
      sampleType: 'Blood',
      turnaroundTime: '24-48 hours',
      category: 'Endocrinology'
    },
    {
      id: 'liver_function',
      name: 'Comprehensive Liver Panel',
      description: 'Complete liver function assessment including ALT, AST, bilirubin, alkaline phosphatase, and protein levels',
      price: '₹3,750', // $50 * 75
      tools: ['Serum Separator Tubes', 'Alcohol Prep Pads', 'Sterile Bandages', 'Collection Instructions'],
      sampleType: 'Blood',
      turnaroundTime: '24-48 hours',
      category: 'Hepatology'
    }
  ];

  const handleTestSelection = (testId) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(id => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCardInfoChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardInfo(prev => ({ ...prev, [field]: formattedValue }));
  };

  const getRequiredTools = () => {
    const allTools = new Set();
    selectedTests.forEach(testId => {
      const test = labTests.find(t => t.id === testId);
      if (test) {
        test.tools.forEach(tool => allTools.add(tool));
      }
    });
    return Array.from(allTools);
  };

  const getTotalPrice = () => {
    const testPrice = selectedTests.reduce((total, testId) => {
      const test = labTests.find(t => t.id === testId);
      return total + (test ? parseInt(test.price.replace(/₹|,/g, '')) : 0);
    }, 0);
    const toolPrice = orderTools ? 1125 : 0; // $15 * 75 = ₹1,125
    return testPrice + toolPrice;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv, cardholderName } = cardInfo;
      if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 13) {
        alert('Please enter a valid card number');
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!cvv || cvv.length < 3) {
        alert('Please enter a valid CVV');
        return false;
      }
      if (!cardholderName.trim()) {
        alert('Please enter the cardholder name');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        alert('Please enter a valid UPI ID');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one laboratory test.');
      return;
    }

    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      alert('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    if (!validatePaymentInfo()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/lab-confirmation', {
        state: {
          tests: selectedTests,
          personalInfo,
          orderTools,
          totalPrice: getTotalPrice(),
          paymentMethod,
          orderNumber: 'LAB-' + Date.now().toString().slice(-8)
        }
      });
    } catch (error) {
      alert('Unable to process your request. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedTests.length === 0) {
      alert('Please select at least one laboratory test to continue.');
      return;
    }
    if (currentStep === 3 && (!personalInfo.name || !personalInfo.email || !personalInfo.phone)) {
      alert('Please complete all required fields to continue.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return 'Laboratory Test Selection';
      case 2: return 'Sample Collection Method';
      case 3: return 'Patient Information';
      case 4: return 'Payment Method';
      case 5: return 'Order Review & Confirmation';
      default: return 'Laboratory Services';
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-card">
        {/* Professional Header */}
        <div className="lab-header">
          <div className="lab-brand">
            <div className="brand-icon">⚕️</div>
            <div className="brand-text">
              <h1>Laboratory Services</h1>
              <p className="subtitle">Professional Diagnostic Testing & Analysis</p>
            </div>
          </div>
          
          {/* Enhanced Progress Indicator */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
            <div className="step-indicators">
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className={`step-indicator ${currentStep >= step ? 'completed' : ''} ${currentStep === step ? 'active' : ''}`}>
                  <div className="step-circle">
                    {currentStep > step ? '✓' : step}
                  </div>
                  <span className="step-title">
                    {step === 1 && 'Tests'}
                    {step === 2 && 'Collection'}
                    {step === 3 && 'Information'}
                    {step === 4 && 'Payment'}
                    {step === 5 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="content-area">
          <div className="section-header">
            <h2>{getStepTitle()}</h2>
            <div className="step-counter">Step {currentStep} of 5</div>
          </div>

          {/* Step 1: Enhanced Test Selection */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="tests-container">
                {labTests.map(test => (
                  <div 
                    key={test.id} 
                    className={`test-card ${selectedTests.includes(test.id) ? 'selected' : ''}`}
                    onClick={() => handleTestSelection(test.id)}
                  >
                    <div className="test-card-header">
                      <div className="test-checkbox-container">
                        <input
                          type="checkbox"
                          checked={selectedTests.includes(test.id)}
                          onChange={() => handleTestSelection(test.id)}
                          className="professional-checkbox"
                        />
                      </div>
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
                        <span className="metadata-text">Sample: {test.sampleType}</span>
                      </div>
                      <div className="metadata-item">
                        <span className="metadata-icon">⏰</span>
                        <span className="metadata-text">Results: {test.turnaroundTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTests.length > 0 && (
                <div className="selection-summary">
                  <div className="summary-content">
                    <div className="summary-text">
                      <strong>{selectedTests.length}</strong> test{selectedTests.length !== 1 ? 's' : ''} selected
                    </div>
                    <div className="summary-price">
                      Subtotal: <strong>{formatPrice(selectedTests.reduce((total, testId) => {
                        const test = labTests.find(t => t.id === testId);
                        return total + (test ? parseInt(test.price.replace(/₹|,/g, '')) : 0);
                      }, 0))}</strong>
                    </div>
                  </div>
                  <button onClick={nextStep} className="primary-button">
                    Continue to Collection Method
                    <span className="button-arrow">→</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <div className="collection-options">
                <div className={`collection-option ${orderTools ? 'selected' : ''}`}>
                  <div className="option-header">
                    <input
                      type="radio"
                      id="home-collection"
                      name="collection-method"
                      checked={orderTools}
                      onChange={() => setOrderTools(true)}
                      className="professional-radio"
                    />
                    <label htmlFor="home-collection" className="option-label">
                      <div className="option-icon">📦</div>
                      <div className="option-content">
                        <h3>Home Collection Kit</h3>
                        <p>Professional-grade collection materials delivered to your location</p>
                      </div>
                      <div className="option-badge">Recommended</div>
                    </label>
                  </div>
                  
                  {orderTools && (
                    <div className="option-details">
                      <div className="kit-contents">
                        <h4>Kit Includes:</h4>
                        <div className="tools-grid">
                          {getRequiredTools().map(tool => (
                            <div key={tool} className="tool-item">
                              <span className="tool-checkmark">✓</span>
                              <span>{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="shipping-details">
                        <div className="shipping-item">
                          <span className="shipping-icon">🚚</span>
                          <span>Free expedited shipping (2-3 business days)</span>
                        </div>
                        <div className="shipping-item">
                          <span className="shipping-icon">📋</span>
                          <span>Detailed collection instructions included</span>
                        </div>
                        <div className="shipping-item">
                          <span className="shipping-icon">🏥</span>
                          <span>Laboratory-certified collection materials</span>
                        </div>
                        <div className="shipping-item">
                          <span className="shipping-icon">📞</span>
                          <span>24/7 technical support available</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`collection-option ${!orderTools ? 'selected' : ''}`}>
                  <div className="option-header">
                    <input
                      type="radio"
                      id="lab-visit"
                      name="collection-method"
                      checked={!orderTools}
                      onChange={() => setOrderTools(false)}
                      className="professional-radio"
                    />
                    <label htmlFor="lab-visit" className="option-label">
                      <div className="option-icon">🏥</div>
                      <div className="option-content">
                        <h3>Laboratory Collection</h3>
                        <p>Visit our certified partner laboratory locations</p>
                      </div>
                    </label>
                  </div>
                  
                  {!orderTools && (
                    <div className="option-details">
                      <div className="lab-benefits">
                        <div className="benefit-item">
                          <span className="benefit-icon">🎯</span>
                          <span>Professional phlebotomist collection</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">⚡</span>
                          <span>Immediate sample processing</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">📍</span>
                          <span>Convenient locations nationwide</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">💰</span>
                          <span>No additional collection fees</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="step-navigation">
                <button onClick={prevStep} className="secondary-button">
                  <span className="button-arrow">←</span>
                  Back to Test Selection
                </button>
                <button onClick={nextStep} className="primary-button">
                  Continue to Patient Information
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          )}

          
          {currentStep === 3 && (
            <div className="step-content">
              <div className="form-container">
                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="name">Full Legal Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        placeholder="Enter your complete legal name"
                        className="professional-input"
                        required
                      />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        placeholder="your.email@domain.com"
                        className="professional-input"
                        required
                      />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="professional-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Mailing Address</h3>
                  <div className="form-grid">
                    <div className="form-field full-width">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        value={personalInfo.address}
                        onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                        placeholder="123 Main Street, Flat 4B"
                        className="professional-input"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={personalInfo.city}
                        onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                        placeholder="City name"
                        className="professional-input"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="zipCode">PIN Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        value={personalInfo.zipCode}
                        onChange={(e) => handlePersonalInfoChange('zipCode', e.target.value)}
                        placeholder="400001"
                        className="professional-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="step-navigation">
                <button onClick={prevStep} className="secondary-button">
                  <span className="button-arrow">←</span>
                  Back to Collection Method
                </button>
                <button onClick={nextStep} className="primary-button">
                  Continue to Payment
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          )}

          
          {currentStep === 4 && (
            <div className="step-content">
              <div className="payment-section">
                {/* Order Summary */}
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-item">
                    <span>Laboratory Tests ({selectedTests.length})</span>
                    <span>{formatPrice(selectedTests.reduce((total, testId) => {
                      const test = labTests.find(t => t.id === testId);
                      return total + (test ? parseInt(test.price.replace(/₹|,/g, '')) : 0);
                    }, 0))}</span>
                  </div>
                  <div className="summary-item">
                    <span>Collection Kit</span>
                    <span>{orderTools ? '₹1,125' : 'Free'}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

               
                <div className="payment-methods">
                  <h3>Select Payment Method</h3>
                  <div className="payment-options">
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="card-payment"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="card-payment">
                        <div className="payment-content">
                          <h4>💳 Credit/Debit Card</h4>
                          <p>Pay securely with your card</p>
                        </div>
                      </label>
                    </div>
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="upi-payment"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="upi-payment">
                        <div className="payment-content">
                          <h4>📱 UPI Payment</h4>
                          <p>Pay using UPI ID</p>
                        </div>
                      </label>
                    </div>
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="cod-payment"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="cod-payment">
                        <div className="payment-content">
                          <h4>💵 Cash on Delivery</h4>
                          <p>Pay when collection kit arrives</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="payment-details">
                      <h4>Card Details</h4>
                      <div className="card-form">
                        <div className="form-field">
                          <label htmlFor="cardholderName">Cardholder Name *</label>
                          <input
                            type="text"
                            id="cardholderName"
                            value={cardInfo.cardholderName}
                            onChange={(e) => handleCardInfoChange('cardholderName', e.target.value)}
                            placeholder="Enter name on card"
                            className="professional-input"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="cardNumber">Card Number *</label>
                          <input
                            type="text"
                            id="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={(e) => handleCardInfoChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="professional-input"
                            required
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-field">
                            <label htmlFor="expiryDate">Expiry Date *</label>
                            <input
                              type="text"
                              id="expiryDate"
                              value={cardInfo.expiryDate}
                              onChange={(e) => handleCardInfoChange('expiryDate', e.target.value)}
                              placeholder="MM/YY"
                              className="professional-input"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="cvv">CVV *</label>
                            <input
                              type="text"
                              id="cvv"
                              value={cardInfo.cvv}
                              onChange={(e) => handleCardInfoChange('cvv', e.target.value)}
                              placeholder="123"
                              className="professional-input"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="payment-details">
                      <h4>UPI Details</h4>
                      <div className="form-field">
                        <label htmlFor="upiId">UPI ID *</label>
                        <input
                          type="text"
                          id="upiId"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@paytm"
                          className="professional-input"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="payment-details">
                      <div className="cod-info">
                        <h4>Cash on Delivery</h4>
                        <p>You will pay {formatPrice(getTotalPrice())} in cash when your collection kit is delivered.</p>
                        <div className="cod-note">
                          <span className="note-icon">ℹ️</span>
                          <span>Please keep exact change ready for faster delivery.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="step-navigation">
                <button onClick={prevStep} className="secondary-button">
                  <span className="button-arrow">←</span>
                  Back to Information
                </button>
                <button onClick={nextStep} className="primary-button">
                  Review Order
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          )}

          {/*  Order Review */}
          {currentStep === 5 && (
            <div className="step-content">
              <div className="order-review">
                <div className="review-section">
                  <h3>Selected Laboratory Tests</h3>
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
                  <h3>Collection Method</h3>
                  <div className="method-review">
                    <div className="method-info">
                      <span className="method-icon">{orderTools ? '📦' : '🏥'}</span>
                      <div className="method-details">
                        <div className="method-name">
                          {orderTools ? 'Home Collection Kit' : 'Laboratory Collection'}
                        </div>
                        <div className="method-description">
                          {orderTools 
                            ? 'Professional collection materials shipped to your address' 
                            : 'Visit certified partner laboratory location'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="method-price">
                      {orderTools ? '₹1,125' : 'No charge'}
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Patient Information</h3>
                  <div className="patient-review">
                    <div className="patient-field">
                      <span className="field-label">Name:</span>
                      <span className="field-value">{personalInfo.name}</span>
                    </div>
                    <div className="patient-field">
                      <span className="field-label">Email:</span>
                      <span className="field-value">{personalInfo.email}</span>
                    </div>
                    <div className="patient-field">
                      <span className="field-label">Phone:</span>
                      <span className="field-value">{personalInfo.phone}</span>
                    </div>
                    {personalInfo.address && (
                      <div className="patient-field">
                        <span className="field-label">Address:</span>
                        <span className="field-value">
                          {personalInfo.address}{personalInfo.city && `, ${personalInfo.city}`}{personalInfo.zipCode && ` ${personalInfo.zipCode}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="payment-review">
                    <span className="payment-method-display">
                      {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                      {paymentMethod === 'upi' && '📱 UPI Payment'}
                      {paymentMethod === 'cod' && '💵 Cash on Delivery'}
                    </span>
                  </div>
                </div>

                <div className="order-total">
                  <div className="total-breakdown">
                    <div className="total-line">
                      <span>Laboratory Tests:</span>
                      <span>{formatPrice(selectedTests.reduce((total, testId) => {
                        const test = labTests.find(t => t.id === testId);
                        return total + (test ? parseInt(test.price.replace(/₹|,/g, '')) : 0);
                      }, 0))}</span>
                    </div>
                    <div className="total-line">
                      <span>Collection Method:</span>
                      <span>{orderTools ? '₹1,125' : '₹0'}</span>
                    </div>
                    <div className="total-final">
                      <span>Total Amount:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="final-actions">
                <button onClick={prevStep} className="secondary-button">
                  <span className="button-arrow">←</span>
                  Edit Payment
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className={`primary-button submit-button ${isSubmitting ? 'submitting' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <span className="submit-icon">⚕️</span>
                      {paymentMethod === 'cod' ? 'Place Order (COD)' : `Pay ${formatPrice(getTotalPrice())} & Submit`}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/*  Footer */}
        <div className="lab-footer">
          <div className="footer-content">
            <div className="security-badges">
              <div className="badge hipaa">
                <span className="badge-icon">🔒</span>
                <span className="badge-text">HIPAA Compliant</span>
              </div>
              <div className="badge clia">
                <span className="badge-icon">🏆</span>
                <span className="badge-text">CLIA Certified</span>
              </div>
              <div className="badge secure">
                <span className="badge-icon">🛡️</span>
                <span className="badge-text">SSL Secured</span>
              </div>
            </div>
            
            <div className="footer-info">
              <p className="privacy-statement">
                Your protected health information is encrypted and securely transmitted in compliance with federal regulations.
              </p>
              <div className="support-contact">
                <span className="support-icon">📞</span>
                <span>Medical Support: 1800-522-435 (1800-522-4357)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
