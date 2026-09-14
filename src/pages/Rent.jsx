import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Rent.css";

const Rental = () => {
  const navigate = useNavigate();
  const [rentalLaptopList, setRentalLaptopList] = useState([]);

  useEffect(() => {
    loadRentalLaptops();
  }, []);

  const loadRentalLaptops = async () => {
    try {
      const [productsRes, rentalConfigRes] = await Promise.allSettled([
        fetch("http://localhost:5000/api/products/shop").then((res) =>
          res.json()
        ),
        fetch("http://localhost:5000/api/rentals/products").then((res) =>
          res.json()
        ),
      ]);

      /* ---- Base products (name, images, brand) ---- */
      const productList =
        productsRes.status === "fulfilled"
          ? productsRes.value?.data || []
          : [];

      /* ---- Rental config list (monthlyRent, deposit, etc.) ---- */
      const rentalConfigList =
        rentalConfigRes.status === "fulfilled"
          ? rentalConfigRes.value?.data || []
          : [];

      // Build a lookup: productId -> rental config
      const rentalConfigMap = {};

      rentalConfigList.forEach((config) => {
        const pid = config?.productId?._id || config?.productId;

        if (pid) {
          rentalConfigMap[pid] = config;
        }
      });

      const availableForRent = productList.filter(
        (product) => product?.rental?.isAvailableForRent === true
      );

      // Merge each product with its rental config (if found)
      const merged = availableForRent.map((product) => ({
        ...product,
        rentalConfig: rentalConfigMap[product._id] || null,
      }));

      setRentalLaptopList(merged);
    } catch (error) {
      console.log("Error loading rental laptops:", error);
    }
  };

  const rentalBranches = [
    {
      title: "ZAID INFOTECH - Corporate Office & Main Branch",
      address: "232, 1st Floor, M.K.N Road, Alandur, Chennai - 600016",
      phones: ["+91 90925 90725"],
    },
    {
      title: "ZAID EXCLUSIVE STORE",
      address: "229, 1st Floor, M.K.N Road, Alandur, Chennai - 600016",
      phones: ["+91 97871 93871"],
    },
    {
      title: "ZAID INFOTECH Warehouse & Service Centre",
      address:
        "New No. 36, Old No. 44, Ponni Amman Koil Street, Alandur, Chennai - 600016",
      phones: ["+91 99626 20202", "+91 7010627010"],
    },
    {
      title: "ZAID INFOTECH SERVICE CENTRE - MOUNT ROAD",
      address:
        "Old No. 20, New No. 41, R.A. Complex, 2nd Floor, Meeran Sahib Street, Mount Road, Chennai - 600002",
      phones: ["+91 8428058428", "+91 8428158428"],
    },
  ];

  return (
    <div className="rental-page">
      <main className="rental-main">
        {/* =========================================================
            HERO SECTION
        ========================================================== */}
        <section className="rental-hero">
          <div className="rental-hero-content">
            <div className="rental-hero-left">
              <span className="rental-hero-eyebrow">ZAID INFOTECH</span>

              <h1 className="rental-hero-title">
                LAPTOP
                <span>RENTAL</span>
              </h1>

              <p className="rental-hero-description">
                Reliable laptops for work, learning, business and temporary
                requirements. Choose the right configuration and rent with
                confidence.
              </p>

              <div className="rental-hero-points">
                <span>FLEXIBLE</span>
                <i>•</i>
                <span>RELIABLE</span>
                <i>•</i>
                <span>PREPAID PLANS</span>
              </div>

              <div className="rental-hero-price">
                <span className="rental-price-label">RENTAL PLANS START FROM</span>
                <div className="rental-price-value">
                  ₹1,500 <span>/ MONTH</span>
                </div>
                <p>Rental charges may vary based on laptop configuration.</p>
              </div>
            </div>

            <div className="rental-hero-right">
              <div className="rental-hero-image-wrap">
                <div className="rental-hero-image-accent" />
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"
                  alt="Laptop available for rental"
                  className="rental-hero-image"
                />
                <div className="rental-hero-image-card">
                  <strong>WORK • LEARN • GROW</strong>
                  <span>WITH THE RIGHT TECHNOLOGY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURES
        ========================================================== */}
        <section className="rental-features">
          <div className="rental-feature">
            <div className="rental-feature-icon">⚙</div>
            <div>
              <strong>LATEST CONFIGURATIONS</strong>
              <span>Modern laptops for different requirements</span>
            </div>
          </div>

          <div className="rental-feature">
            <div className="rental-feature-icon">₹</div>
            <div>
              <strong>COST EFFECTIVE</strong>
              <span>Flexible rental options for your budget</span>
            </div>
          </div>

          <div className="rental-feature">
            <div className="rental-feature-icon">▣</div>
            <div>
              <strong>FLEXIBLE PLANS</strong>
              <span>Choose a rental period that works for you</span>
            </div>
          </div>

          <div className="rental-feature">
            <div className="rental-feature-icon">✓</div>
            <div>
              <strong>SECURE & HASSLE-FREE</strong>
              <span>Simple and transparent rental process</span>
            </div>
          </div>

          <div className="rental-feature">
            <div className="rental-feature-icon">☎</div>
            <div>
              <strong>SUPPORT WHEN YOU NEED</strong>
              <span>Help from the Zaid Infotech team</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            AVAILABLE LAPTOPS
        ========================================================== */}
        <section className="rental-products-section">
          <div className="rental-section-heading">
            <div className="rental-section-heading-icon">▣</div>
            <div>
              <span>EXPLORE OUR COLLECTION</span>
              <h2>AVAILABLE LAPTOPS FOR RENT</h2>
            </div>
          </div>

          <div className="rental-products-container">
            {rentalLaptopList.length === 0 ? (
              <div className="rental-empty-state">
                <div className="rental-empty-icon">💻</div>
                <h3>No laptops currently available for rent</h3>
                <p>
                  Please check again shortly or contact our rental support
                  team for availability.
                </p>
              </div>
            ) : (
              <div className="rental-products-grid">
                {rentalLaptopList.map((product) => {
                  const rentalConfig = product.rentalConfig;

                  // Rental price takes priority over base product price
                  const monthlyRent =
                    rentalConfig?.monthlyRent ??
                    product.pricing?.sellingPrice ??
                    product.finalPrice ??
                    0;

                  const securityDeposit =
                    rentalConfig?.securityDeposit ?? null;

                  const availableQuantity =
                    rentalConfig?.availableQuantity ?? null;

                  const isInStock =
                    availableQuantity === null || availableQuantity > 0;

                  return (
                    <article
                      className="rental-product-card"
                      key={product._id}
                    >
                      <div className="rental-product-image-box">
                        <img
                          src={`http://localhost:5000${product.images?.[0]?.url}`}
                          alt={
                            product.images?.[0]?.alt ||
                            product.name ||
                            "Rental laptop"
                          }
                          className="rental-product-image"
                        />

                        <span
                          className={`rental-stock-badge ${
                            isInStock
                              ? "rental-stock-available"
                              : "rental-stock-unavailable"
                          }`}
                        >
                          {isInStock ? "Available" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="rental-product-body">
                        <div className="rental-product-top">
                          {product.brand?.name && (
                            <span className="rental-product-brand">
                              {product.brand.name}
                            </span>
                          )}

                          <h3 className="rental-product-title">
                            {product.name}
                          </h3>

                          {product.shortDescription && (
                            <p className="rental-product-description">
                              {product.shortDescription}
                            </p>
                          )}
                        </div>

                        <div className="rental-product-price-row">
                          <div>
                            <span className="rental-product-price">
                              ₹{Number(monthlyRent).toLocaleString("en-IN")}
                            </span>
                            <span className="rental-product-price-unit">
                              /month
                            </span>
                          </div>

                          {securityDeposit !== null && (
                            <span className="rental-product-deposit">
                              ₹
                              {Number(securityDeposit).toLocaleString("en-IN")}{" "}
                              deposit
                            </span>
                          )}
                        </div>

                        <button
                          className="rental-product-button"
                          onClick={() =>
                            navigate(`/rental/${product._id}`)
                          }
                          disabled={!isInStock}
                        >
                          {isInStock ? "View Details" : "Unavailable"}
                          {isInStock && <span>→</span>}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            RENTAL TERMS
        ========================================================== */}
        <section className="rental-terms-section">
          <div className="rental-section-heading">
            <div className="rental-section-heading-icon">▤</div>
            <div>
              <span>BEFORE YOU RENT</span>
              <h2>RENTAL TERMS & PLANS</h2>
            </div>
          </div>

          <div className="rental-terms-grid">
            <div className="rental-term-card">
              <div className="rental-term-icon">✓</div>
              <div>
                <h3>Refundable Security Deposit</h3>
                <p>
                  Mandatory at the time of booking. The deposit amount depends
                  on the selected configuration and will be refunded upon
                  return of the laptop, subject to verification.
                </p>
              </div>
            </div>

            <div className="rental-term-card">
              <div className="rental-term-icon">▣</div>
              <div>
                <h3>Minimum Rental Period</h3>
                <p>3 months (mandatory).</p>
              </div>
            </div>

            <div className="rental-term-card">
              <div className="rental-term-icon">↻</div>
              <div>
                <h3>Rental Plans</h3>
                <p>
                  Both short-term and long-term rental plans are available.
                </p>
              </div>
            </div>

            <div className="rental-term-card">
              <div className="rental-term-icon">▣</div>
              <div>
                <h3>Software</h3>
                <p>All laptops come pre-installed with basic software.</p>
              </div>
            </div>

            <div className="rental-term-card">
              <div className="rental-term-icon">□</div>
              <div>
                <h3>Included</h3>
                <p>Each rental includes Laptop and Charging Adapter.</p>
              </div>
            </div>

            <div className="rental-term-card">
              <div className="rental-term-icon">₹</div>
              <div>
                <h3>Payment Terms</h3>
                <p>
                  All rentals are prepaid. Rental amount must be paid in
                  advance.
                </p>
              </div>
            </div>

            <div className="rental-term-card rental-term-highlight">
              <div className="rental-term-icon">5</div>
              <div>
                <h3>Monthly Payment Due Date</h3>
                <p>
                  Monthly rent must be paid on or before the <strong>5th</strong>{" "}
                  of every month without fail.
                </p>
              </div>
            </div>

            <div className="rental-term-card rental-term-warning">
              <div className="rental-term-icon">!</div>
              <div>
                <h3>Late Payment Fee</h3>
                <p>
                  If the date exceeds 5th, <strong>₹50 + GST per day</strong>,
                  per laptop will be charged as late fee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            DOCUMENTS
        ========================================================== */}
        <section className="rental-documents-section">
          <div className="rental-section-heading rental-section-heading-green">
            <div className="rental-section-heading-icon">▤</div>
            <div>
              <span>QUICK & SIMPLE PROCESS</span>
              <h2>DOCUMENTS REQUIRED</h2>
            </div>
          </div>

          <p className="rental-documents-intro">
            To process your laptop rental request, kindly provide the following
            documents:
          </p>

          <div className="rental-documents-grid">
            <div className="rental-document-card">
              <div className="rental-document-title">
                <span className="rental-document-icon">●</span>
                <h3>FOR INDIVIDUAL / PERSONAL USE</h3>
              </div>

              <ul>
                <li>Passport size photograph</li>
                <li>PAN Card</li>
                <li>Aadhaar Card</li>
                <li>House Rental Agreement</li>
                <li>College ID / Office ID</li>
              </ul>
            </div>

            <div className="rental-document-card">
              <div className="rental-document-title">
                <span className="rental-document-icon">▥</span>
                <h3>FOR COMPANY / BUSINESS USE</h3>
              </div>

              <ul>
                <li>PAN Card</li>
                <li>Aadhaar Card (Authorized Person)</li>
                <li>GST Registration Copy</li>
                <li>Office ID / Authorization Letter</li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================
            BRANCHES & CONTACT
        ========================================================== */}
        <section className="rental-contact-section">
          <div className="rental-section-heading">
            <div className="rental-section-heading-icon">☎</div>
            <div>
              <span>VISIT OR CONTACT US</span>
              <h2>ZAID INFOTECH BRANCHES</h2>
            </div>
          </div>

          <div className="rental-branches-grid">
            {rentalBranches.map((branch) => (
              <article className="rental-branch-card" key={branch.title}>
                <div className="rental-branch-number">
                  <span>ZAID INFOTECH</span>
                </div>

                <h3>{branch.title}</h3>

                <p className="rental-branch-address">
                  <span>⌖</span>
                  {branch.address}
                </p>

                <div className="rental-branch-phone-list">
                  {branch.phones.map((phone) => (
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      key={phone}
                    >
                      <span>☎</span>
                      {phone}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="rental-support-card">
            <div className="rental-support-title">
              <span className="rental-support-icon">☎</span>
              <div>
                <span>CUSTOMER SUPPORT</span>
                <h3>We're here to help</h3>
              </div>
            </div>

            <div className="rental-support-contacts">
              <div>
                <span>Service & Warranty</span>
                <a href="tel:+917010627010">+91 70106 27010</a>
              </div>

              <div>
                <span>Laptop Rentals & Bulk Orders</span>
                <a href="tel:+919787192871">+91 97871 92871</a>
                <a href="tel:+919787193871">+91 97871 93871</a>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
};

export default Rental;
