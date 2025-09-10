import { useNavigate } from "react-router";
import { Link } from "react-router";
import "./Front.css";

const Front = () => {
  return (
    <div className="front-container">
      
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <div className="logo">
              <div className="logo-icon-wrapper">
                <span className="logo-icon">⚕️</span>
                <div className="logo-icon-glow"></div>
              </div>
              <div className="logo-content">
                <span className="logo-text">OjasAI</span>
                <span className="logo-tagline">Trusted Medical Care</span>
              </div>
            </div>
          </div>
          
          <div className="nav-center">
            <div className="nav-links">
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <div className="nav-indicator"></div>
            </div>
          </div>

          <div className="nav-actions">
            <div className="search-container">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <button className="nav-btn secondary">
              <span>Sign In</span>
              <div className="btn-glow"></div>
            </button>
            <button className="nav-btn primary">
              <span>Get Started</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12,5 19,12 12,19"></polyline>
              </svg>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </nav>

      
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-icon">✨</div>
            <span>Trusted Healthcare Platform</span>
            <div className="badge-pulse"></div>
          </div>
          <h1 className="hero-title">
            Your Health, <span className="highlight">Our Priority</span>
          </h1>
          <p className="hero-subtitle">
            Connect with certified healthcare professionals, get AI-powered insights, 
            and manage your health journey all in one comprehensive platform.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Patients Served</span>
            </div>
            <div className="stat">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Certified Doctors</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available Support</span>
            </div>
          </div>
        </div>
      </section>

      {/*Services Section */}
      <section className="services-section" id="services">
        <div className="services-background">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          <div className="bg-pattern"></div>
        </div>
        
        <div className="section-header">
          <div className="section-badge">
            <div className="badge-dot"></div>
            <span>Excellence in Healthcare</span>
            <div className="badge-shimmer"></div>
          </div>
          <h2 className="section-title">
            <span className="title-line">Premium Healthcare</span>
            <span className="title-highlight">Services & Solutions</span>
          </h2>
          <p className="section-subtitle">
            Advanced medical solutions designed with cutting-edge technology, 
            personalized care approaches, and unwavering commitment to your wellness journey
          </p>
          <div className="section-divider">
            <div className="divider-line"></div>
            <div className="divider-icon">💎</div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="services-grid">
          {/* Emergency SOS Card */}
          <Link to = '/Sos'>
          <div className="service-card emergency-card">
            <div className="card-glow"></div>
            <div className="service-header">
              <div className="service-icon emergency">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <div className="icon-pulse"></div>
              </div>
              <div className="service-badge emergency-badge">
                <span>🚨 Emergency</span>
                <div className="badge-shine"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Emergency SOS Services</h3>
              <p className="service-description">
                <strong>Critical Situation?</strong> Get immediate emergency medical assistance. 
                Connect with paramedics, request ambulance services, and access emergency care within minutes.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">🚑</span>Instant Ambulance Dispatch</li>
                <li><span className="feature-icon">👨‍⚕️</span>Paramedic Response Team</li>
                <li><span className="feature-icon">📍</span>GPS Location Tracking</li>
                <li><span className="feature-icon">⏰</span>24/7 Emergency Hotline</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Call Emergency Services</span>
              <div className="cta-arrow">→</div>
            </div>
          </div>
          </Link>

          <Link to="/Consult" className="service-card featured">
            <div className="card-glow"></div>
            <div className="service-header">
              <div className="service-icon medical">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <div className="icon-pulse"></div>
              </div>
              <div className="service-badge premium">
                <span>Most Popular</span>
                <div className="badge-shine"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Expert Doctor Consultation</h3>
              <p className="service-description">
                Connect with board-certified healthcare professionals through secure video consultations. 
                Available 24/7 with same-day appointments and comprehensive care.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">✓</span>Board-certified doctors</li>
                <li><span className="feature-icon">✓</span>Same-day appointments</li>
                <li><span className="feature-icon">✓</span>Digital prescriptions</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Start Consultation</span>
              <div className="cta-arrow">→</div>
            </div>
          </Link>

          <button className="service-card ai-powered">
            <div className="card-glow ai-glow"></div>
            <div className="service-header">
              <div className="service-icon ai">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <div className="icon-pulse ai-pulse"></div>
              </div>
              <div className="service-badge ai-badge">
                <span>AI Powered</span>
                <div className="badge-shine"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">AI Health Assistant</h3>
              <p className="service-description">
                Revolutionary AI-powered health insights with preliminary assessments, 
                symptom analysis, and personalized health recommendations.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">✓</span>Instant AI responses</li>
                <li><span className="feature-icon">✓</span>Advanced symptom analysis</li>
                <li><span className="feature-icon">✓</span>Personalized recommendations</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Ask AI Now</span>
              <div className="cta-arrow">→</div>
            </div>
          </button>

          <Link to="/OrderMedicine" className="service-card">
            <div className="card-glow"></div>
            <div className="service-header">
              <div className="service-icon order-medicine">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
                  <path d="M12 5L8 21l4-7 4 7-4-16"/>
                </svg>
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Prescription Medicine Delivery</h3>
              <p className="service-description">
                Seamless prescription upload and medicine ordering with fast delivery 
                from our network of verified, licensed pharmacy partners.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">✓</span>Smart prescription upload</li>
                <li><span className="feature-icon">✓</span>Same-day delivery available</li>
                <li><span className="feature-icon">✓</span>Verified pharmacy network</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Order Medicine</span>
              <div className="cta-arrow">→</div>
            </div>
          </Link>

          <Link to="/Askai" className="service-card">
            <div className="card-glow"></div>
            <div className="service-header">
              <div className="service-icon prescription">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Advanced Prescription Analysis</h3>
              <p className="service-description">
                Comprehensive prescription analysis with drug interaction detection, 
                dosage verification, and detailed side effect information.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">✓</span>Drug interaction detection</li>
                <li><span className="feature-icon">✓</span>Dosage verification system</li>
                <li><span className="feature-icon">✓</span>Comprehensive side effect data</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Analyze Prescription</span>
              <div className="cta-arrow">→</div>
            </div>
          </Link>

          <Link to="/Lab" className="service-card">
            <div className="card-glow"></div>
            <div className="service-header">
              <div className="service-icon lab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2M9 11V9a2 2 0 012-2h0a2 2 0 012 2v2M9 11h6"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Comprehensive Lab Testing</h3>
              <p className="service-description">
                Complete laboratory testing services with home sample collection, 
                rapid results delivery, and expert medical interpretations.
              </p>
              <ul className="service-features">
                <li><span className="feature-icon">✓</span>Home sample collection</li>
                <li><span className="feature-icon">✓</span>Rapid result delivery</li>
                <li><span className="feature-icon">✓</span>Expert medical analysis</li>
              </ul>
            </div>
            <div className="service-footer">
              <span className="service-cta">Book Lab Test</span>
              <div className="cta-arrow">→</div>
            </div>
          </Link>
        </div>
      </section>

     
      <section className="trust-section">
        <div className="trust-content">
          <div className="trust-item">
            <div className="trust-icon">🔒</div>
            <h4>HIPAA Compliant</h4>
            <p>Your data is protected with industry-standard security</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">⭐</div>
            <h4>4.9/5 Rating</h4>
            <p>Rated excellent by thousands of satisfied patients</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🏥</div>
            <h4>Licensed Professionals</h4>
            <p>All doctors are board-certified and verified</p>
          </div>
        </div>  
      </section>

      
      <footer className="footer">
        <div className="footer-background">
          <div className="footer-gradient-1"></div>
          <div className="footer-gradient-2"></div>
        </div>
        
        <div className="footer-container">
          
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon-wrapper">
                  <span className="footer-logo-icon">⚕️</span>
                  <div className="footer-logo-glow"></div>
                </div>
                <div className="footer-logo-content">
                  <span className="footer-logo-text">OjasAi</span>
                  <span className="footer-logo-tagline">Your Health, Our Priority</span>
                </div>
              </div>
              <p className="footer-description">
                Leading healthcare platform providing comprehensive medical services, 
                AI-powered health insights, and personalized care solutions for modern healthcare needs.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link twitter" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-link instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-column-title">Services</h4>
                <ul className="footer-column-links">
                  <li><Link to="/Consult" className="footer-link">Doctor Consultation</Link></li>
                  <li><Link to="/Askai" className="footer-link">AI Health Assistant</Link></li>
                  <li><Link to="/OrderMedicine" className="footer-link">Order Medicine</Link></li>
                  <li><Link to="/Lab" className="footer-link">Lab Reports</Link></li>
                  <li><a href="#emergency" className="footer-link">Emergency Services</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Company</h4>
                <ul className="footer-column-links">
                  <li><a href="#" className="footer-link">About Us</a></li>
                  <li><a href="#" className="footer-link">Our Mission</a></li>
                  <li><a href="#" className="footer-link">Careers</a></li>
                  <li><a href="#" className="footer-link">Press</a></li>
                  <li><a href="#" className="footer-link">Blog</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Support</h4>
                <ul className="footer-column-links">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Contact Us</a></li>
                  <li><a href="#" className="footer-link">Emergency</a></li>
                  <li><a href="#" className="footer-link">Medical Records</a></li>
                  <li><a href="#" className="footer-link">Feedback</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Legal</h4>
                <ul className="footer-column-links">
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Service</a></li>
                  <li><a href="#" className="footer-link">HIPAA Compliance</a></li>
                  <li><a href="#" className="footer-link">Medical Disclaimer</a></li>
                  <li><a href="#" className="footer-link">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-description">
                Get the latest health tips, medical insights, and platform updates delivered to your inbox.
              </p>
              <div className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="newsletter-input"
                  />
                  <svg className="newsletter-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <button className="newsletter-button">
                  <span>Subscribe</span>
                  <svg className="newsletter-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                </button>
              </div>
              <div className="newsletter-badges">
                <div className="newsletter-badge">
                  <span className="badge-icon">🔒</span>
                  <span>Secure & Private</span>
                </div>
                <div className="newsletter-badge">
                  <span className="badge-icon">📧</span>
                  <span>Weekly Updates</span>
                </div>
              </div>
            </div>
          </div>

         
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p className="footer-copyright">
                © 2025 OjasAi. All rights reserved. 
                <span className="footer-heart">Made with ❤️ for better healthcare</span>
              </p>
            </div>
            <div className="footer-bottom-right">
              <div className="footer-certifications">
                <div className="certification-badge">
                  <span className="cert-icon">🏥</span>
                  <span>FDA Approved</span>
                </div>
                <div className="certification-badge">
                  <span className="cert-icon">🔐</span>
                  <span>HIPAA Certified</span>
                </div>
                <div className="certification-badge">
                  <span className="cert-icon">⭐</span>
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Front;
