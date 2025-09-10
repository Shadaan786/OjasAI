import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "./OrderMedicine.css";

const OrderMedicine = () => {
  alert("For volunteers and mentors pls don't add you card or account details as this is in developing phase");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [deliveryOption, setDeliveryOption] = useState('home');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [upiId, setUpiId] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(150); // Default estimated total

  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    
    fileArray.forEach((file) => {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }
      
      if (!acceptedFileTypes.includes(file.type)) {
        alert(`File "${file.name}" is not a supported format. Use JPG, PNG, or PDF.`);
        return;
      }
      
      validFiles.push({
        file,
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      });
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    // Update estimated total based on number of prescriptions
    setEstimatedTotal(150 + (validFiles.length * 50));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter(file => file.id !== fileId);
      // Update estimated total
      setEstimatedTotal(150 + (newFiles.length * 50));
      return newFiles;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCardInfoChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiryDate') {
      // Format expiry date as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow digits and max 4 characters
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardInfo(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleCameraCapture = () => {
    const cameraInput = document.createElement('input');
    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'camera';
    cameraInput.onchange = (e) => handleFileSelect(e.target.files);
    cameraInput.click();
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
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one prescription image or PDF.");
      return;
    }

    if (!personalInfo.name || !personalInfo.phone || !personalInfo.address) {
      alert("Please fill in all required personal information.");
      return;
    }

    if (!validatePaymentInfo()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('deliveryOption', deliveryOption);
      formData.append('personalInfo', JSON.stringify(personalInfo));
      formData.append('paymentMethod', paymentMethod);
      formData.append('paymentInfo', JSON.stringify(paymentMethod === 'card' ? cardInfo : { upiId }));
      formData.append('estimatedTotal', estimatedTotal);
      
      uploadedFiles.forEach((fileData) => {
        formData.append('prescriptions', fileData.file);
      });

      const response = await fetch('/api/order-medicine', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: result.orderNumber,
          estimatedDelivery: result.estimatedDelivery,
          totalAmount: estimatedTotal,
          paymentMethod: paymentMethod
        } 
      });
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDeliveryFee = () => {
    return deliveryOption === 'home' ? 25 : 0;
  };

  const getTotalAmount = () => {
    return estimatedTotal + getDeliveryFee();
  };

  return (
    <div className="order-medicine-container">
      <div className="order-medicine-card">
        {/* Header */}
        <div className="order-header">
          <h1>Order Medicine</h1>
          <p>Upload your prescription and get medicines delivered to your doorstep</p>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <h2>Upload Prescription</h2>
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-content">
              <div className="upload-icon">📄</div>
              <h3>Drop prescription files here or click to browse</h3>
              <p>Supported formats: JPG, PNG, PDF</p>
              <p className="size-limit">Maximum file size: 10MB per file</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes.join(',')}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="file-input"
          />

          <div className="camera-section">
            <button onClick={handleCameraCapture} className="camera-btn">
              <span>📷</span>
              Take Photo with Camera
            </button>
          </div>
        </div>

        {/* File Preview */}
        {uploadedFiles.length > 0 && (
          <div className="files-section">
            <h3>Uploaded Prescriptions ({uploadedFiles.length})</h3>
            <div className="files-list">
              {uploadedFiles.map((fileObj) => (
                <div key={fileObj.id} className="file-item">
                  <div className="file-preview">
                    {fileObj.preview ? (
                      <img src={fileObj.preview} alt="Preview" className="preview-image" />
                    ) : (
                      <div className="file-type-icon">
                        {fileObj.type === 'application/pdf' ? '📄' : '📎'}
                      </div>
                    )}
                  </div>
                  <div className="file-details">
                    <span className="file-name">{fileObj.name}</span>
                    <span className="file-size">{formatFileSize(fileObj.size)}</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFile(fileObj.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="personal-info-section">
          <h2>Delivery Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                value={personalInfo.name}
                onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Delivery Address *</label>
              <input
                type="text"
                id="address"
                value={personalInfo.address}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                placeholder="Enter your complete address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={personalInfo.city}
                onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                placeholder="Enter your city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                value={personalInfo.zipCode}
                onChange={(e) => handlePersonalInfoChange('zipCode', e.target.value)}
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="delivery-section">
          <h2>Delivery Options</h2>
          <div className="delivery-options">
            <div className="delivery-option">
              <input
                type="radio"
                id="home-delivery"
                name="delivery"
                value="home"
                checked={deliveryOption === 'home'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label htmlFor="home-delivery">
                <div className="option-content">
                  <h4>🏠 Home Delivery</h4>
                  <p>Get medicines delivered to your doorstep</p>
                  <span className="delivery-time">Delivery in 2-4 hours</span>
                  <span className="delivery-fee">+ ₹25 delivery fee</span>
                </div>
              </label>
            </div>
            <div className="delivery-option">
              <input
                type="radio"
                id="store-pickup"
                name="delivery"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label htmlFor="store-pickup">
                <div className="option-content">
                  <h4>🏪 Store Pickup</h4>
                  <p>Collect from nearest pharmacy</p>
                  <span className="delivery-time">Ready in 30 minutes</span>
                  <span className="delivery-fee">No delivery fee</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <h2>Payment Method</h2>
          
          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-item">
              <span>Medicine Cost (Estimated)</span>
              <span>₹{estimatedTotal}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee</span>
              <span>{deliveryOption === 'home' ? '₹25' : 'Free'}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount</span>
              <span>₹{getTotalAmount()}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-methods">
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
                  <p>Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Details */}
          console.alert("dhqwiehq");
          {paymentMethod === 'card' && (
            <div className="payment-details">
              <h3>Card Details</h3>
              <div className="card-form">
                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardInfo.cardholderName}
                    onChange={(e) => handleCardInfoChange('cardholderName', e.target.value)}
                    placeholder="Enter name on card"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={(e) => handleCardInfoChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={cardInfo.expiryDate}
                      onChange={(e) => handleCardInfoChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      value={cardInfo.cvv}
                      onChange={(e) => handleCardInfoChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="payment-details">
              <h3>UPI Details</h3>
              <div className="form-group">
                <label htmlFor="upiId">UPI ID *</label>
                <input
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@paytm"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="payment-details">
              <div className="cod-info">
                <h3>Cash on Delivery</h3>
                <p>You will pay ₹{getTotalAmount()} in cash when your order is delivered.</p>
                <div className="cod-note">
                  <span className="note-icon">ℹ️</span>
                  <span>Please keep exact change ready for faster delivery.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting || uploadedFiles.length === 0}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              Processing Order...
            </>
          ) : (
            <>
              <span>🛒</span>
              {paymentMethod === 'cod' ? 'Place Order (COD)' : `Pay ₹${getTotalAmount()} & Place Order`}
            </>
          )}
        </button>

        {/* Footer */}
        <div className="order-footer">
          <div className="security-info">
            <span className="security-badge">🔒 Secure & Confidential</span>
            <span className="privacy-note">Your prescription data is encrypted and HIPAA compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMedicine;
