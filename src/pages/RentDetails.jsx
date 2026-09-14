import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./RentDetails.css";

import { getProduct } from "../services/productService";
import AvailabilityRequestModal from "../components/AvailabilityRequest/AvailabilityRequestModal";

/* =====================================================
   API / IMAGE BASE URL
===================================================== */

const API_URL = import.meta.env.VITE_API_URL || "";
const BASE_URL = API_URL.replace(/\/api\/?$/, "");
const RENTAL_API = `${API_URL}/rentals`;

/* =====================================================
   IMAGE URL HELPER
===================================================== */

const getImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${BASE_URL}${cleanPath}`;
};

/* =====================================================
   LABEL HELPER (LAPTOP -> Laptop, CHARGING_ADAPTER -> Charging Adapter)
===================================================== */

const formatItemLabel = (item) => {
  if (typeof item !== "string") return "";
  return item
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/* =====================================================
   COMPONENT
===================================================== */

const RentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [rentalProduct, setRentalProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  /* ===================================================
     LOAD PRODUCT + RENTAL CONFIG
  =================================================== */

  useEffect(() => {
    if (!id) return;
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const [productResponse, rentalResponse] = await Promise.allSettled([
        getProduct(id),
        axios.get(`${RENTAL_API}/product/${id}`),
      ]);

      /* ---- Base product ---- */
      if (productResponse.status === "fulfilled") {
        const productData =
          productResponse.value?.data?.data ||
          productResponse.value?.data?.product ||
          productResponse.value?.data;

        if (!productData) {
          setProduct(null);
        } else {
          const images = Array.isArray(productData.images) ? productData.images : [];

          if (images.length > 0) {
            const firstImage = images[0];
            const firstImagePath =
              typeof firstImage === "string"
                ? firstImage
                : firstImage?.url || firstImage?.path || firstImage?.image;

            const firstImageUrl = getImageUrl(firstImagePath);
            if (firstImageUrl) setSelectedImage(firstImageUrl);
          }

          setProduct(productData);
        }
      } else {
        console.error("GET PRODUCT ERROR:", productResponse.reason);
        setProduct(null);
      }

      /* ---- Rental config ---- */
      if (rentalResponse.status === "fulfilled") {
        const rentalData =
          rentalResponse.value?.data?.data || rentalResponse.value?.data;

        setRentalProduct(rentalData || null);
      } else {
        console.error("GET RENTAL CONFIG ERROR:", rentalResponse.reason);
        setRentalProduct(null);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <div className="rental-details-loading3">
        <div className="rental-spinner3" />
        <p>Loading Product...</p>
      </div>
    );
  }

  /* ===================================================
     NOT FOUND
  =================================================== */

  if (!product) {
    return (
      <div className="rental-details-not-found3">
        <div className="not-found-icon3">📦</div>
        <h2>Product Not Found</h2>
        <p>The rental laptop you are looking for is not available.</p>
        <button type="button" onClick={() => navigate("/rent")}>
          Back To Rentals
        </button>
      </div>
    );
  }

  /* ===================================================
     VALUES
  =================================================== */

  // Rental price takes priority over base product price for a rental page
  const monthlyRent =
    rentalProduct?.monthlyRent ??
    product?.pricing?.sellingPrice ??
    product?.finalPrice ??
    0;
  const securityDeposit = rentalProduct?.securityDeposit ?? 0;
  const minimumRentalMonths = rentalProduct?.minimumRentalMonths ?? null;
  const includedItems = Array.isArray(rentalProduct?.includedItems)
    ? rentalProduct.includedItems
    : [];
  const basicSoftwareInstalled = rentalProduct?.basicSoftwareInstalled ?? false;
  const availableQuantity = rentalProduct?.availableQuantity ?? null;
  const rentalNotes = rentalProduct?.notes || "";
  const isAvailableForRent =
    rentalProduct?.isAvailableForRent ?? product?.rental?.isAvailableForRent ?? false;

  const productImages = Array.isArray(product.images) ? product.images : [];

  const categoryName =
    product.category?.name ||
    product.categoryName ||
    (typeof product.category === "string" ? product.category : "") ||
    "N/A";

  const brandName =
    product.brand?.name ||
    product.brandName ||
    (typeof product.brand === "string" ? product.brand : "") ||
    "N/A";

  /* ===================================================
     RETURN
  =================================================== */

  return (
    <div className="rental-details-page3">

      {/* =============================================
          BREADCRUMB
      ============================================== */}

      <div className="breadcrumb-wrapper3">
        <div className="breadcrumb3">
          <span className="breadcrumb-current3">{product.name}</span>
        </div>
      </div>

      {/* =============================================
          MAIN
      ============================================== */}

      <main className="details-container3">

        {/* ===========================================
            LEFT IMAGE
        ============================================ */}

        <section className="left-side3">

          <div className="main-image-box3">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="main-image3"
              />
            ) : (
              <div className="no-image3">
                <span>📦</span>
                <p>No Image Available</p>
              </div>
            )}
          </div>

          {productImages.length > 0 && (
            <div className="thumbnail-list3">
              {productImages.map((image, index) => {
                const imagePath =
                  typeof image === "string"
                    ? image
                    : image?.url || image?.path || image?.image;

                const imageUrl = getImageUrl(imagePath);

                if (!imageUrl) {
                  return null;
                }

                return (
                  <button
                    type="button"
                    key={`${imageUrl}-${index}`}
                    className={`thumbnail-button3 ${
                      selectedImage === imageUrl ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="thumbnail3"
                    />
                  </button>
                );
              })}
            </div>
          )}

        </section>

        {/* ===========================================
            RIGHT SIDE
        ============================================ */}

        <section className="right-side3">

          <div className="category-label3">{categoryName}</div>

          <h1 className="product-title3">{product.name}</h1>

          <div className="product-meta3">
            <span>
              <strong>Brand:</strong> {brandName}
            </span>

            {product.sku && (
              <span>
                <strong>SKU:</strong> {product.sku}
              </span>
            )}
          </div>

          {/* PRICE — sourced from rental config, falls back to product price */}

          <div className="price-box3">
            <span className="price3">
              ₹
              {Number(monthlyRent).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="price-unit3">/month</span>
            </span>
          </div>

          {/* RENTAL QUICK FACTS */}

          {rentalProduct && (
            <div className="rrf-quick-facts">
              {minimumRentalMonths !== null && (
                <span>
                  <strong>Minimum Rental:</strong> {minimumRentalMonths} month
                  {minimumRentalMonths > 1 ? "s" : ""}
                </span>
              )}

              <span>
                <strong>Security Deposit:</strong> ₹
                {Number(securityDeposit).toLocaleString("en-IN")}
              </span>

              {availableQuantity !== null && (
                <span>
                  <strong>Available Units:</strong> {availableQuantity}
                </span>
              )}

              <span
                className={`rrf-stock-badge ${
                  isAvailableForRent ? "rrf-in-stock" : "rrf-out-of-stock"
                }`}
              >
                {isAvailableForRent ? "Available for Rent" : "Currently Unavailable"}
              </span>
            </div>
          )}

          {/* DESCRIPTION */}

          {product.shortDescription && (
            <p className="short-desc3">{product.shortDescription}</p>
          )}

          {/* =========================================
              ACTION BUTTON
          ========================================== */}

          <div className="action-buttons3">
            <button
              type="button"
              className="quote-btn3"
              onClick={() => setShowEnquiryModal(true)}
              disabled={!isAvailableForRent}
            >
              Request a Quote
            </button>
          </div>

          {/* =========================================
              INFO CARDS
          ========================================== */}

          <div className="product-info-cards3">
            <div className="info-card3">
              <span className="info-icon3">🚚</span>
              <div>
                <strong>Fast Delivery</strong>
                <p>Reliable delivery to your address</p>
              </div>
            </div>

            <div className="info-card3">
              <span className="info-icon3">🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <p>Safe and secure checkout</p>
              </div>
            </div>

            <div className="info-card3">
              <span className="info-icon3">↩️</span>
              <div>
                <strong>Easy Support</strong>
                <p>Customer support available</p>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* =============================================
          DESCRIPTION + SPECIFICATIONS
      ============================================== */}

      <section className="content-section3">

        <div className="content-card3">
          <h2>Product Description</h2>

          <div className="description-content3">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p className="empty-content3">No description available.</p>
            )}
          </div>
        </div>

        <div className="content-card3">
          <h2>Specifications</h2>

          {Array.isArray(product.specifications) &&
          product.specifications.length > 0 ? (
            <div className="specification-table-wrapper3">
              <table className="specification-table3">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Value</th>
                  </tr>
                </thead>

                <tbody>
                  {product.specifications.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.key || item?.name || "N/A"}</td>
                      <td>{item?.value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-content3">No specifications available.</p>
          )}
        </div>

        {/* WHAT'S INCLUDED */}

        {includedItems.length > 0 && (
          <div className="content-card3">
            <h2>What's Included</h2>
            <ul className="rrf-included-list">
              {includedItems.map((item, index) => (
                <li key={index}>{formatItemLabel(item)}</li>
              ))}
              {basicSoftwareInstalled && <li>Basic Software Installed</li>}
            </ul>
          </div>
        )}

        {/* RENTAL NOTES */}

        {rentalNotes && (
          <div className="content-card3 rrf-rental-notes">
            <h2>Rental Notes</h2>
            <p>{rentalNotes}</p>
          </div>
        )}

      </section>

      {/* =============================================
          ENQUIRY MODAL
      ============================================== */}

      {showEnquiryModal && (
        <AvailabilityRequestModal
          product={product}
          onClose={() => setShowEnquiryModal(false)}
          onSuccess={() => {
            setShowEnquiryModal(false);
            toast.success("Your enquiry has been submitted successfully.");
          }}
        />
      )}

    </div>
  );
};

export default RentDetails;
