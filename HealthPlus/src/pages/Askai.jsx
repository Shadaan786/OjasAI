import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "./Askai.css";

export default function Askai() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisType, setAnalysisType] = useState("prescription");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const acceptedFileTypes = {
    prescription: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    labReport: ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (files) => {
    setErrorMsg("");
    const fileArray = Array.from(files);
    const validFiles = [];
    
    fileArray.forEach((file) => {
      if (file.size > maxFileSize) {
        setErrorMsg(t("fileTooLarge", { name: file.name }));
        return;
      }
      
      if (!acceptedFileTypes[analysisType].includes(file.type)) {
        setErrorMsg(t("fileNotSupported", { name: file.name }));
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
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setErrorMsg("");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) {
      setErrorMsg(t("pleaseUploadFile"));
      return;
    }
  
    setIsAnalyzing(true);
    setErrorMsg("");
  
    const formData = new FormData();
    formData.append('analysisType', analysisType);
  
    uploadedFiles.forEach((fileData) => {
      formData.append('image', fileData.file); 
    });

    try {
      const response = await fetch(`${API_URL}/analyze-image`, {  
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(t("serverError", { status: response.statusText }));
      }

      const resultData = await response.json();

      navigate('/analysis-results', { 
        state: { 
          results: resultData,
          analysisType: analysisType,
          fileCount: uploadedFiles.length
        } 
      });
    } catch (error) {
      console.error('Analysis error:', error);
      setErrorMsg(error.message || t("analysisFailed"));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        {/* Header */}
        <div className="upload-header">
          <h1>{t("medicalDocumentAnalysis")}</h1>
          <p>{t("uploadDocsForAnalysis")}</p>
        </div>

        {/* Analysis Type Selection */}
        <div className="analysis-type-section">
          <h3>{t("selectAnalysisType")}</h3>
          <div className="type-options">
            <button
              className={`type-option ${analysisType === 'prescription' ? 'active' : ''}`}
              onClick={() => setAnalysisType('prescription')}
            >
              <span className="type-icon">💊</span>
              <div className="type-info">
                <h4>{t("prescriptionAnalysis")}</h4>
                <p>{t("prescriptionDescription")}</p>
              </div>
            </button>
            <button
              className={`type-option ${analysisType === 'labReport' ? 'active' : ''}`}
              onClick={() => setAnalysisType('labReport')}
            >
              <span className="type-icon">🧪</span>
              <div className="type-info">
                <h4>{t("labReportAnalysis")}</h4>
                <p>{t("labReportDescription")}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* File Upload Area */}
        <div className="upload-section">
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-content">
              <div className="upload-icon">📄</div>
              <h3>{t("dropOrBrowse")}</h3>
              <p>
                {analysisType === 'prescription'
                  ? t("supportedFormatsPrescription")
                  : t("supportedFormatsLabReport")}
              </p>
              <p className="size-limit">{t("maxFileSize")}</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes[analysisType].join(',')}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="file-input"
          />
        </div>

        {/* File Preview */}
        {uploadedFiles.length > 0 && (
          <div className="files-section">
            <h3>{t("uploadedFiles", { count: uploadedFiles.length })}</h3>
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
                    {t("remove")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Info */}
        <div className="analysis-info">
          <h3>{t("whatAnalysisIncludes")}</h3>
          <div className="features-grid">
            {analysisType === 'prescription' ? (
              <>
                <div className="feature-item">
                  <span className="feature-icon">💊</span>
                  <span>{t("medicationIdentification")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚠️</span>
                  <span>{t("drugInteractionWarnings")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📋</span>
                  <span>{t("dosageVerification")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🕐</span>
                  <span>{t("timingRecommendations")}</span>
                </div>
              </>
            ) : (
              <>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>{t("testResultInterpretation")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>{t("abnormalValueIdentification")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📈</span>
                  <span>{t("trendAnalysis")}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💡</span>
                  <span>{t("healthInsights")}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Processing Status */}
        {isAnalyzing && (
          <div className="processing-status">
            <div className="processing-steps">
              <div className="step active">{t("uploadingFiles")}</div>
              <div className="step active">{t("sendingToAI")}</div>
              <div className="step active">{t("processingResults")}</div>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <button
          className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
          onClick={handleAnalyze}
          disabled={isAnalyzing || uploadedFiles.length === 0}
        >
          {isAnalyzing ? (
            <>
              <div className="spinner"></div>
              {t("analyzingWithAI")}
            </>
          ) : (
            <>
              <span>🔍</span>
              {t("startAIAnalysis")}
            </>
          )}
        </button>

        {/* Footer */}
        <div className="upload-footer">
          <div className="security-info">
            <span className="security-badge">{t("hipaaCompliant")}</span>
            <span className="privacy-note">{t("privacyNote")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
