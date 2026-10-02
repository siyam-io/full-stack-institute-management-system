import React, { useEffect } from "react";
import "../css/Footer.css";
import { apiURL } from "../../Constant";

const Footer = () => {
  // Initialize current year
  useEffect(() => {
    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Social Media Section */}
      <section className="social-section">
        <h2 className="social-title">🔗 Connect with CIB</h2>

        <div className="social-container">
          <a
            href="https://www.facebook.com/cibdhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glass-pill fb"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
              alt="Facebook"
            />
            <span>Facebook</span>
          </a>

          <a
            href="https://instagram.com/cib.dhk"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glass-pill ig"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
            />
            <span>Instagram</span>
          </a>

          <a
            href="https://wa.me/8801338958997"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glass-pill wa"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
              alt="WhatsApp"
            />
            <span>Whatsapp</span>
          </a>

          <a
            href="https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glass-pill in"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
            />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Footer Content Section */}
      <section className="footer-content-section">
        <div className="footer-blur-circle top-blur"></div>
        <div className="footer-blur-circle bottom-blur"></div>

        <div className="footer-content-container">
          {/* Contact Us Card */}
          <div className="glass-footer-card">
            <h4 className="footer-card-title">
              <span className="footer-icon-wrapper">📞</span>Contact Us
            </h4>
            <div className="contact-details">
              <p className="contact-item">
                <span className="contact-icon">🏠</span>
                <span>
                  House-160 (1st Floor), Lake Circus, Kalabagan, Dhanmondi,
                  Dhaka 1205
                </span>
              </p>
              <p className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+8801338958997" className="glass-link">
                  01338-958997 (WhatsApp)
                </a>
              </p>
              <p className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+8801742989255" className="glass-link">
                  01742-989255
                </a>
              </p>
              <p className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:contact@culinaryacademy.com" className="glass-link">
                  contact@culinaryacademy.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="glass-footer-card">
            <h4 className="footer-card-title">
              <span className="footer-icon-wrapper">🔗</span>Quick Links
            </h4>
            <div className="quick-links">
              <a href={`${apiURL.fontend_url}/faq`} target="_blank" rel="noreferrer" className="glass-link-item">
                <span className="link-icon">❓</span> FAQ
              </a>
              <a href={`${apiURL.fontend_url}/gallery`} target="_blank" rel="noreferrer" className="glass-link-item">
                <span className="link-icon">🖼️</span> Gallery
              </a>
              <a
                href={`${apiURL.fontend_url}/verification`}
                target="_blank"
                rel="noreferrer"
                className="glass-link-item"
              >
                <span className="link-icon">✅</span> Certificate Verification
              </a>
              <a
                href="https://maps.app.goo.gl/DrphHWpqJNEYG1YC7"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-link-item"
              >
                <span className="link-icon">🗺️</span> Find Us on Map
              </a>
            </div>
          </div>

          {/* Important Links Card */}
          <div className="glass-footer-card">
            <h4 className="footer-card-title">
              <span className="footer-icon-wrapper">📚</span>Important Links
            </h4>
            <ul className="important-links">
              <li>
                <a
                  href={`${apiURL.fontend_url}/companyprofile`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-link-nav highlight"
                >
                  ★ Company Profile
                </a>
              </li>
              <li>
                <a href={`${apiURL.fontend_url}/about`} target="_blank" rel="noreferrer" className="glass-link-nav">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={`${apiURL.fontend_url}/admission`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-link-nav"
                >
                  Admission
                </a>
              </li>
              <li>
                <a
                  href={`${apiURL.fontend_url}/courses`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-link-nav"
                >
                  Courses
                </a>
              </li>
              <li>
                <a href={`${apiURL.fontend_url}/blog`} target="_blank" rel="noreferrer" className="glass-link-nav">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={`${apiURL.fontend_url}/contact`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-link-nav"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={`${apiURL.fontend_url}/privacy-policy`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-link-nav privacy"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Bottom Section */}
      <footer className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-logo">
            <img
              src="/logo.svg"
              alt="Culinary Academy Logo"
              className="logo-image h-10 w-auto"
            />
          </div>

          <div className="footer-copyright">
            <p className="copyright-text">
              © <span id="currentYear"></span>
              <strong>Culinary Academy</strong>. All rights
              reserved.
            </p>
            <p className="developer-credit">
              Developed by:
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Esthiyak Ahmmed
              </a>
            </p>
          </div>

          <div className="footer-top-btn">
            <button onClick={scrollToTop} className="glass-top-btn">
              <span>↑</span> Back to Top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
