import React from "react";
import { useLocation, useNavigate } from "react-router";
import "./AnalysisResults.css";

export default function AnalysisResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, analysisType, fileCount } = location.state || {};

  // If no image
  if (!results) {
    return (
      <div className="results-container">
        <div className="results-card">
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h2>No Analysis Results Found</h2>
            <p>Please go back and upload files for analysis.</p>
            <button onClick={() => navigate('/upload')} className="back-btn">
              Upload Files
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getAnalysisIcon = () => {
    return analysisType === 'prescription' ? '💊' : '🧪';
  };

  const getAnalysisTitle = () => {
    return analysisType === 'prescription' ? 'Prescription Analysis' : 'Lab Report Analysis';
  };

  const handleNewAnalysis = () => {
    navigate('/upload');
  };

  const handleDownloadReport = () => {
    // downloadable report
    const reportContent = `
Medical Analysis Report
Generated: ${new Date().toLocaleString()}
Analysis Type: ${getAnalysisTitle()}
Files Analyzed: ${fileCount}

Analysis Results:
${results.analysis || results.findings || 'Analysis completed successfully'}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-container">
      <div className="results-card">
        {/* Header */}
        <div className="results-header">
          <div className="analysis-info">
            <span className="analysis-icon">{getAnalysisIcon()}</span>
            <div className="analysis-details">
              <h1>{getAnalysisTitle()} Complete</h1>
              <p>{fileCount} file(s) analyzed successfully</p>
            </div>
          </div>
          <div className="completion-badge">
            <span className="success-icon">✅</span>
            <span>Analysis Complete</span>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="analysis-summary">
          <h2>Analysis Summary</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-value">{fileCount}</span>
                <span className="stat-label">Files Processed</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🕐</span>
              <div className="stat-info">
                <span className="stat-value">{new Date().toLocaleTimeString()}</span>
                <span className="stat-label">Completed At</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🔍</span>
              <div className="stat-info">
                <span className="stat-value">AI Powered</span>
                <span className="stat-label">Analysis Type</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Results */}
        <div className="results-content">
          <h2>Detailed Analysis</h2>
          <div className="analysis-text">
            {results.analysis || results.findings || results.content || 'Analysis completed successfully. Please consult with a healthcare professional for detailed interpretation.'}
          </div>
        </div>

        {/* Key Findings */}
        {analysisType === 'prescription' && (
          <div className="key-findings">
            <h3>Key Areas Reviewed:</h3>
            <div className="findings-grid">
              <div className="finding-item">
                <span className="finding-icon">💊</span>
                <span>Medication Identification</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">⚠️</span>
                <span>Drug Interactions</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">📋</span>
                <span>Dosage Verification</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">🕐</span>
                <span>Timing Guidelines</span>
              </div>
            </div>
          </div>
        )}

        {analysisType === 'labReport' && (
          <div className="key-findings">
            <h3>Key Areas Reviewed:</h3>
            <div className="findings-grid">
              <div className="finding-item">
                <span className="finding-icon">📊</span>
                <span>Test Result Interpretation</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">🎯</span>
                <span>Abnormal Values</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">📈</span>
                <span>Trend Analysis</span>
              </div>
              <div className="finding-item">
                <span className="finding-icon">💡</span>
                <span>Health Insights</span>
              </div>
            </div>
          </div>
        )}

        {/* Notice */}
        <div className="medical-disclaimer">
          <div className="disclaimer-header">
            <span className="warning-icon">⚕️</span>
            <h3>Important Medical Disclaimer</h3>
          </div>
          <p>
            This AI analysis is for informational purposes only and should not replace professional medical advice. 
            Always consult with qualified healthcare professionals for medical decisions and treatment plans.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={handleDownloadReport} className="download-btn">
            <span>📥</span>
            Download Report
          </button>
          <button onClick={handleNewAnalysis} className="new-analysis-btn">
            <span>📄</span>
            New Analysis
          </button>
          <button onClick={() => navigate('/Front')} className="home-btn">
            <span>🏠</span>
            Back to Home
          </button>
        </div>

        {/* Footer */}
        <div className="results-footer">
          <div className="security-info">
            <span className="security-badge">🔒 Secure & Confidential</span>
            <span className="privacy-note">Your data is encrypted and will be automatically deleted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
