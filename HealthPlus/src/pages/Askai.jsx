import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "./Askai.css";

export default function Askai() {
  const API_URL = import.meta.env.VITE_API_URL;

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
        setErrorMsg(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }
      
      if (!acceptedFileTypes[analysisType].includes(file.type)) {
        setErrorMsg(`File "${file.name}" is not a supported format.`);
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
    setErrorMsg("Please upload at least one file for analysis.");
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
      throw new Error(`Server error: ${response.statusText}`);
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
    setErrorMsg(error.message || 'Analysis failed. Please check your connection and try again.');
  } finally {
    setIsAnalyzing(false);
  }
};


  return (
    <div className="upload-container">
      <div className="upload-card">
        {/* Header */}
        <div className="upload-header">
          <h1>Medical Document Analysis</h1>
          <p>Upload your prescriptions or lab reports for AI-powered analysis</p>
        </div>

        {/* Analysis Type Selection */}
        <div className="analysis-type-section">
          <h3>Select Analysis Type</h3>
          <div className="type-options">
            <button
              className={`type-option ${analysisType === 'prescription' ? 'active' : ''}`}
              onClick={() => setAnalysisType('prescription')}
            >
              <span className="type-icon">💊</span>
              <div className="type-info">
                <h4>Prescription Analysis</h4>
                <p>Analyze medication details, dosages, and interactions</p>
              </div>
            </button>
            <button
              className={`type-option ${analysisType === 'labReport' ? 'active' : ''}`}
              onClick={() => setAnalysisType('labReport')}
            >
              <span className="type-icon">🧪</span>
              <div className="type-info">
                <h4>Lab Report Analysis</h4>
                <p>Interpret test results and identify key findings</p>
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
              <h3>Drop files here or click to browse</h3>
              <p>
                Supported formats: {analysisType === 'prescription' ? 'JPG, PNG, PDF' : 'PDF, JPG, PNG'}
              </p>
              <p className="size-limit">Maximum file size: 10MB per file</p>
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
            <h3>Uploaded Files ({uploadedFiles.length})</h3>
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

        {/* Analysis Info */}
        <div className="analysis-info">
          <h3>What Our AI Analysis Includes:</h3>
          <div className="features-grid">
            {analysisType === 'prescription' ? (
              <>
                <div className="feature-item">
                  <span className="feature-icon">💊</span>
                  <span>Medication identification</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚠️</span>
                  <span>Drug interaction warnings</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📋</span>
                  <span>Dosage verification</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🕐</span>
                  <span>Timing recommendations</span>
                </div>
              </>
            ) : (
              <>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Test result interpretation</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Abnormal value identification</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📈</span>
                  <span>Trend analysis</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💡</span>
                  <span>Health insights</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Processing Status */}
        {isAnalyzing && (
          <div className="processing-status">
            <div className="processing-steps">
              <div className="step active">📤 Uploading files to server...</div>
              <div className="step active">🤖 Sending to AI analysis...</div>
              <div className="step active">⚡ Processing results...</div>
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
              Analyzing with AI...
            </>
          ) : (
            <>
              <span>🔍</span>
              Start AI Analysis
            </>
          )}
        </button>

        {/* Footer */}
        <div className="upload-footer">
          <div className="security-info">
            <span className="security-badge">🔒 HIPAA Compliant</span>
            <span className="privacy-note">Your files are encrypted and automatically deleted after analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
