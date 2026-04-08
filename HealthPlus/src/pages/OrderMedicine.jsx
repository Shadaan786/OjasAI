import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "./OrderMedicine.css";
import { useTranslation } from "react-i18next";

const OrderMedicine = () => {
  const { t } = useTranslation();
  // alert(t("volunteerAlert"));

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [deliveryOption, setDeliveryOption] = useState("home");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [upiId, setUpiId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(150);

  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
  const maxFileSize = 10 * 1024 * 1024;

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];

    fileArray.forEach((file) => {
      if (file.size > maxFileSize) {
        alert(t("fileTooLarge", { name: file.name }));
        return;
      }
      if (!acceptedFileTypes.includes(file.type)) {
        alert(t("unsupportedFormat", { name: file.name }));
        return;
      }
      validFiles.push({
        file,
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
      });
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    setEstimatedTotal(150 + validFiles.length * 50);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
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
      setEstimatedTotal(150 + newFiles.length * 50);
      return newFiles;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
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

    setCardInfo(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleCameraCapture = () => {
    const cameraInput = document.createElement("input");
    cameraInput.type = "file";
    cameraInput.accept = "image/*";
    cameraInput.capture = "camera";
    cameraInput.onchange = (e) => handleFileSelect(e.target.files);
    cameraInput.click();
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === "card") {
      const { cardNumber, expiryDate, cvv, cardholderName } = cardInfo;
      if (!cardNumber.replace(/\s/g, "") || cardNumber.replace(/\s/g, "").length < 13) {
        alert(t("invalidCardNumber"));
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        alert(t("invalidExpiryDate"));
        return false;
      }
      if (!cvv || cvv.length < 3) {
        alert(t("invalidCVV"));
        return false;
      }
      if (!cardholderName.trim()) {
        alert(t("enterCardholderName"));
        return false;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) {
        alert(t("invalidUPI"));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert(t("uploadAtLeastOne"));
      return;
    }
    if (!personalInfo.name || !personalInfo.phone || !personalInfo.address) {
      alert(t("fillPersonalInfo"));
      return;
    }
    if (!validatePaymentInfo()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("deliveryOption", deliveryOption);
      formData.append("personalInfo", JSON.stringify(personalInfo));
      formData.append("paymentMethod", paymentMethod);
      formData.append(
        "paymentInfo",
        JSON.stringify(paymentMethod === "card" ? cardInfo : { upiId })
      );
      formData.append("estimatedTotal", estimatedTotal);

      uploadedFiles.forEach((fileData) => formData.append("prescriptions", fileData.file));

      const response = await fetch("/api/order-medicine", { method: "POST", body: formData });
      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
      const result = await response.json();

      navigate("/order-confirmation", {
        state: {
          orderNumber: result.orderNumber,
          estimatedDelivery: result.estimatedDelivery,
          totalAmount: estimatedTotal,
          paymentMethod
        }
      });
    } catch (error) {
      console.error(error);
      alert(t("orderFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDeliveryFee = () => (deliveryOption === "home" ? 25 : 0);
  const getTotalAmount = () => estimatedTotal + getDeliveryFee();

  return (
    <div className="order-medicine-container">
      <div className="order-medicine-card">
        <div className="order-header">
          <h1>{t("orderMedicine")}</h1>
          <p>{t("uploadPrescriptionInfo")}</p>
        </div>

        <div className="upload-section">
          <h2>{t("uploadPrescription")}</h2>
          <div
            className={`drop-zone ${isDragging ? "dragging" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-content">
              <div className="upload-icon">📄</div>
              <h3>{t("dropOrBrowse")}</h3>
              <p>{t("supportedFormats")}</p>
              <p className="size-limit">{t("maxFileSize")}</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes.join(",")}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="file-input"
          />

          <div className="camera-section">
            <button onClick={handleCameraCapture} className="camera-btn">
              <span>📷</span>
              {t("takePhotoCamera")}
            </button>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="files-section">
            <h3>{t("uploadedFiles", { count: uploadedFiles.length })}</h3>
            <div className="files-list">
              {uploadedFiles.map((fileObj) => (
                <div key={fileObj.id} className="file-item">
                  <div className="file-preview">
                    {fileObj.preview ? (
                      <img src={fileObj.preview} alt={fileObj.name} className="preview-image" />
                    ) : (
                      <div className="file-type-icon">
                        {fileObj.type === "application/pdf" ? "📄" : "📎"}
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

        <div className="personal-info-section">
          <h2>{t("deliveryInformation")}</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">{t("fullName")} *</label>
              <input
                type="text"
                id="name"
                value={personalInfo.name}
                onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                placeholder={t("enterFullName")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t("phoneNumber")} *</label>
              <input
                type="tel"
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                placeholder={t("enterPhone")}
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">{t("deliveryAddress")} *</label>
              <input
                type="text"
                id="address"
                value={personalInfo.address}
                onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                placeholder={t("enterAddress")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">{t("city")}</label>
              <input
                type="text"
                id="city"
                value={personalInfo.city}
                onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                placeholder={t("enterCity")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">{t("zipCode")}</label>
              <input
                type="text"
                id="zipCode"
                value={personalInfo.zipCode}
                onChange={(e) => handlePersonalInfoChange("zipCode", e.target.value)}
                placeholder={t("enterZipCode")}
              />
            </div>
          </div>
        </div>

        <div className="delivery-section">
          <h2>{t("deliveryOptions")}</h2>
          <div className="delivery-options">
            <div className="delivery-option">
              <input
                type="radio"
                id="home-delivery"
                name="delivery"
                value="home"
                checked={deliveryOption === "home"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label htmlFor="home-delivery">
                <div className="option-content">
                  <h4>🏠 {t("homeDelivery")}</h4>
                  <p>{t("homeDeliveryDesc")}</p>
                  <span className="delivery-time">{t("homeDeliveryTime")}</span>
                  <span className="delivery-fee">+ ₹25 {t("deliveryFee")}</span>
                </div>
              </label>
            </div>
            <div className="delivery-option">
              <input
                type="radio"
                id="store-pickup"
                name="delivery"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label htmlFor="store-pickup">
                <div className="option-content">
                  <h4>🏪 {t("storePickup")}</h4>
                  <p>{t("storePickupDesc")}</p>
                  <span className="delivery-time">{t("storePickupTime")}</span>
                  <span className="delivery-fee">{t("storePickupFee")}</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2>{t("paymentMethod")}</h2>

          <div className="order-summary">
            <div className="summary-item">
              <span>{t("medicineCost")}</span>
              <span>₹{estimatedTotal}</span>
            </div>
            <div className="summary-item">
              <span>{t("deliveryFeeLabel")}</span>
              <span>{deliveryOption === "home" ? "₹25" : t("free")}</span>
            </div>
            <div className="summary-item total">
              <span>{t("totalAmount")}</span>
              <span>₹{getTotalAmount()}</span>
            </div>
          </div>

          <div className="payment-methods">
            <div className="payment-option">
              <input
                type="radio"
                id="card-payment"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="card-payment">
                <div className="payment-content">
                  <h4>💳 {t("creditDebitCard")}</h4>
                  <p>{t("paySecurely")}</p>
                </div>
              </label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="upi-payment"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="upi-payment">
                <div className="payment-content">
                  <h4>📱 {t("upiPayment")}</h4>
                  <p>{t("payUsingUPI")}</p>
                </div>
              </label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="cod-payment"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cod-payment">
                <div className="payment-content">
                  <h4>💵 {t("cashOnDelivery")}</h4>
                  <p>{t("payOnDelivery")}</p>
                </div>
              </label>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="payment-details">
              <h3>{t("cardDetails")}</h3>
              <div className="card-form">
                <div className="form-group">
                  <label htmlFor="cardholderName">{t("cardholderName")} *</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardInfo.cardholderName}
                    onChange={(e) => handleCardInfoChange("cardholderName", e.target.value)}
                    placeholder={t("enterCardholderName")}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">{t("cardNumber")} *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={(e) => handleCardInfoChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">{t("expiryDate")} *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={cardInfo.expiryDate}
                      onChange={(e) => handleCardInfoChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">{t("cvv")} *</label>
                    <input
                      type="text"
                      id="cvv"
                      value={cardInfo.cvv}
                      onChange={(e) => handleCardInfoChange("cvv", e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="payment-details">
              <h3>{t("upiDetails")}</h3>
              <div className="form-group">
                <label htmlFor="upiId">{t("upiId")} *</label>
                <input
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder={t("enterUpiId")}
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="payment-details">
              <div className="cod-info">
                <h3>{t("cashOnDelivery")}</h3>
                <p>{t("codNote", { amount: getTotalAmount() })}</p>
                <div className="cod-note">
                  <span className="note-icon">ℹ️</span>
                  <span>{t("keepExactChange")}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
          onClick={handleSubmit}
          disabled={isSubmitting || uploadedFiles.length === 0}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              {t("processingOrder")}
            </>
          ) : (
            <>
              <span>🛒</span>
              {paymentMethod === "cod"
                ? t("placeOrderCOD")
                : t("payAndPlaceOrder", { amount: getTotalAmount() })}
            </>
          )}
        </button>

        <div className="order-footer">
          <div className="security-info">
            <span className="security-badge">🔒 {t("secureConfidential")}</span>
            <span className="privacy-note">{t("dataEncrypted")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMedicine;
