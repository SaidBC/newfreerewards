"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";
import { getPlatformActiveRewards, postToPinterest } from "./actions";

/* ── Tiny inline SVG icons (no emoji, no extra deps) ── */
function GlobeIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function KeyIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2l-9.6 9.6" />
      <path d="M15.5 7.5l3 3L22 7l-3-3" />
    </svg>
  );
}
function QrCodeIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <line x1="21" y1="14" x2="21" y2="14" />
      <line x1="21" y1="21" x2="21" y2="21" />
      <line x1="17" y1="21" x2="17" y2="21" />
    </svg>
  );
}
function CheckIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function LinkIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

type Tab = "new-reward" | "monthly";

interface PlatformInfo {
  id: string;
  name: string;
  slug: string;
}

interface NewRewardData {
  rewardName: string;
  gameName: string;
  platform: string;
  isExclusive: boolean;
  image?: string | null;
  description?: string | null;
  redemptionUrl?: string;
  redemptionCode?: string;
  qrInput?: string; // raw input used to generate QR
  qrDataUrl?: string; // generated QR image data URL
}

interface RewardItem {
  id?: string;
  name: string;
  image?: string | null;
  description?: string | null;
}

interface MonthlyData {
  gameName: string;
  month: string;
  rewards: RewardItem[];
}

const SAMPLE_REWARDS: RewardItem[] = [
  { name: "Valkyrie Emote" },
  { name: "Gold Shield" },
  { name: "Crown Pack" },
  { name: "Epic Chest" },
  { name: "Season Badge" },
  { name: "Rare Card" },
];

function NewRewardCard({ data }: { data: NewRewardData }) {
  const hasUrl = !!data.redemptionUrl;
  const hasCode = !!data.redemptionCode;
  const hasQr = !!data.qrDataUrl;
  const hasExtras = hasUrl || hasCode || hasQr;

  // Dynamic sizing based on what's shown
  const imgSize = hasExtras ? 140 : 190;
  const titleSize = hasExtras ? 26 : 34;

  // Determine layout mode
  const qrOnly = hasQr && !hasUrl && !hasCode;
  const codeOnly = hasCode && !hasQr && !hasUrl;
  const urlOnly = hasUrl && !hasQr && !hasCode;
  const qrAndCode = hasQr && hasCode && !hasUrl;
  const qrAndUrl = hasQr && hasUrl && !hasCode;
  const codeAndUrl = hasCode && hasUrl && !hasQr;
  const allThree = hasQr && hasCode && hasUrl;

  return (
    <div
      style={{
        width: 540,
        height: 540,
        backgroundColor: "#111111",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top-right color stripe accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 6,
          background: "linear-gradient(90deg, #f5c518, #4a90e2, #2ecc71)",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 0",
        }}
      >
        <img
          src="/images/card-studio/nfr-logo.jpg"
          alt="NFR"
          style={{ width: 48, height: 48, borderRadius: 8 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {data.isExclusive && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.12em",
                color: "#111",
                backgroundColor: "#f5c518",
                padding: "3px 10px",
                borderRadius: 3,
              }}
            >
              EXCLUSIVE
            </span>
          )}
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.12em",
              color: "#2ecc71",
              border: "1.5px solid #2ecc71",
              padding: "3px 10px",
              borderRadius: 3,
            }}
          >
            NEW
          </span>
        </div>
      </div>

      {/* Reward image */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          marginTop: hasExtras ? (qrOnly || codeOnly || urlOnly ? 14 : 6) : 20,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: hasExtras
              ? qrOnly || codeOnly || urlOnly
                ? 190
                : 160
              : 210,
            height: hasExtras
              ? qrOnly || codeOnly || urlOnly
                ? 190
                : 160
              : 210,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,144,226,0.25) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <img
          src={data.image || "/images/card-studio/valkyrie-emote.png"}
          alt={data.rewardName}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/card-studio/valkyrie-emote.png";
          }}
          style={{
            width: imgSize,
            height: imgSize,
            objectFit: "contain",
            position: "relative",
            filter: "drop-shadow(0 0 24px rgba(74,144,226,0.5))",
          }}
        />
      </div>

      {/* Reward info */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "6px 32px 0",
        }}
      >
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#ffffff",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          {data.rewardName}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#888888",
            letterSpacing: "0.06em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#4a90e2" }}>{data.gameName}</span>
          <span style={{ color: "#333" }}>•</span>
          <span>{data.platform}</span>
        </div>
      </div>

      {/* Extras Section - Conditional Layouts */}
      {hasExtras && (
        <div
          style={{
            position: "relative",
            marginTop: 8,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          {/* Thin accent line top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 16,
              right: 16,
              height: 1,
              background: "linear-gradient(90deg, #4a90e2, #2ecc71)",
              borderRadius: 1,
            }}
          />

          {/* QR Code Only - Centered and Large */}
          {qrOnly && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 14px 12px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                gap: 8,
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 10,
                  padding: 8,
                  position: "relative",
                  boxShadow:
                    "0 0 0 2px rgba(74,144,226,0.4), 0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={data.qrDataUrl}
                  alt="QR Code"
                  style={{
                    width: 140,
                    height: 140,
                    display: "block",
                    borderRadius: 4,
                  }}
                />
                {/* NFR logo overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#fff",
                    borderRadius: 5,
                    padding: 3,
                    boxShadow: "0 0 0 2px #fff",
                  }}
                >
                  <img
                    src="/images/card-studio/nfr-logo.jpg"
                    alt="NFR"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 4,
                      display: "block",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <QrCodeIcon size={10} color="#2ecc71" />
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    color: "#2ecc71",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Scan to Redeem
                </span>
              </div>
            </div>
          )}

          {/* Redemption Code Only - Centered Badge */}
          {codeOnly && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 14px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <KeyIcon size={12} color="#f5c518" />
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#f5c518",
                    textTransform: "uppercase",
                  }}
                >
                  Redemption Code
                </span>
              </div>
              <span
                style={{
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "0.15em",
                  background: "rgba(245,197,24,0.12)",
                  border: "2px solid rgba(245,197,24,0.35)",
                  borderRadius: 8,
                  padding: "10px 20px",
                  display: "inline-block",
                  textShadow: "0 0 12px rgba(245,197,24,0.4)",
                }}
              >
                {data.redemptionCode}
              </span>
            </div>
          )}

          {/* Redemption URL Only - Centered */}
          {urlOnly && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 14px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <GlobeIcon size={12} color="#4a90e2" />
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#4a90e2",
                    textTransform: "uppercase",
                  }}
                >
                  Redemption Website
                </span>
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  color: "#b0b0b0",
                  textAlign: "center",
                  wordBreak: "break-all",
                  padding: "6px 14px",
                  background: "rgba(74,144,226,0.08)",
                  border: "1px solid rgba(74,144,226,0.2)",
                  borderRadius: 6,
                }}
              >
                {data.redemptionUrl}
              </span>
            </div>
          )}

          {/* QR + Code Side by Side */}
          {qrAndCode && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 12px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
              }}
            >
              {/* QR Code */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 8,
                    padding: 6,
                    position: "relative",
                    boxShadow:
                      "0 0 0 1.5px rgba(74,144,226,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={data.qrDataUrl}
                    alt="QR Code"
                    style={{
                      width: 110,
                      height: 110,
                      display: "block",
                      borderRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "#fff",
                      borderRadius: 4,
                      padding: 2,
                      boxShadow: "0 0 0 1.5px #fff",
                    }}
                  >
                    <img
                      src="/images/card-studio/nfr-logo.jpg"
                      alt="NFR"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 3,
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <QrCodeIcon size={8} color="#444" />
                  <span
                    style={{
                      fontSize: 7,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#444",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Scan
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 100,
                  background:
                    "linear-gradient(180deg, transparent, #2a2a2a, transparent)",
                  flexShrink: 0,
                }}
              />

              {/* Redemption Code */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <KeyIcon size={10} color="#f5c518" />
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#f5c518",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Redeem Code
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.12em",
                    background: "rgba(245,197,24,0.10)",
                    border: "1.5px solid rgba(245,197,24,0.3)",
                    borderRadius: 6,
                    padding: "8px 14px",
                    display: "inline-block",
                    textAlign: "center",
                    wordBreak: "break-all",
                  }}
                >
                  {data.redemptionCode}
                </span>
              </div>
            </div>
          )}

          {/* QR + URL Side by Side */}
          {qrAndUrl && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 12px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
              }}
            >
              {/* QR Code */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 8,
                    padding: 6,
                    position: "relative",
                    boxShadow:
                      "0 0 0 1.5px rgba(74,144,226,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={data.qrDataUrl}
                    alt="QR Code"
                    style={{
                      width: 110,
                      height: 110,
                      display: "block",
                      borderRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "#fff",
                      borderRadius: 4,
                      padding: 2,
                      boxShadow: "0 0 0 1.5px #fff",
                    }}
                  >
                    <img
                      src="/images/card-studio/nfr-logo.jpg"
                      alt="NFR"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 3,
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <QrCodeIcon size={8} color="#444" />
                  <span
                    style={{
                      fontSize: 7,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#444",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Scan
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 100,
                  background:
                    "linear-gradient(180deg, transparent, #2a2a2a, transparent)",
                  flexShrink: 0,
                }}
              />

              {/* Redemption URL */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <GlobeIcon size={10} color="#4a90e2" />
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#4a90e2",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Redemption Site
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    color: "#b0b0b0",
                    textAlign: "center",
                    wordBreak: "break-all",
                    padding: "8px 12px",
                    background: "rgba(74,144,226,0.08)",
                    border: "1px solid rgba(74,144,226,0.2)",
                    borderRadius: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {data.redemptionUrl}
                </span>
              </div>
            </div>
          )}

          {/* Code + URL Side by Side */}
          {codeAndUrl && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 12px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
              }}
            >
              {/* Redemption Code */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <KeyIcon size={10} color="#f5c518" />
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#f5c518",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Redeem Code
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.12em",
                    background: "rgba(245,197,24,0.10)",
                    border: "1.5px solid rgba(245,197,24,0.3)",
                    borderRadius: 6,
                    padding: "8px 14px",
                    display: "inline-block",
                    textAlign: "center",
                    wordBreak: "break-all",
                  }}
                >
                  {data.redemptionCode}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 100,
                  background:
                    "linear-gradient(180deg, transparent, #2a2a2a, transparent)",
                  flexShrink: 0,
                }}
              />

              {/* Redemption URL */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <GlobeIcon size={10} color="#4a90e2" />
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#4a90e2",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Redemption Site
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    color: "#b0b0b0",
                    textAlign: "center",
                    wordBreak: "break-all",
                    padding: "8px 12px",
                    background: "rgba(74,144,226,0.08)",
                    border: "1px solid rgba(74,144,226,0.2)",
                    borderRadius: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {data.redemptionUrl}
                </span>
              </div>
            </div>
          )}

          {/* All Three: QR on top, Code + URL below */}
          {allThree && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "10px 12px",
                background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
              }}
            >
              {/* QR Code - Centered on top */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 8,
                    padding: 6,
                    position: "relative",
                    boxShadow:
                      "0 0 0 1.5px rgba(74,144,226,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={data.qrDataUrl}
                    alt="QR Code"
                    style={{
                      width: 100,
                      height: 100,
                      display: "block",
                      borderRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "#fff",
                      borderRadius: 4,
                      padding: 2,
                      boxShadow: "0 0 0 1.5px #fff",
                    }}
                  >
                    <img
                      src="/images/card-studio/nfr-logo.jpg"
                      alt="NFR"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 3,
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <QrCodeIcon size={8} color="#444" />
                  <span
                    style={{
                      fontSize: 7,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: "#444",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Scan
                  </span>
                </div>
              </div>

              {/* Code + URL row */}
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <KeyIcon size={9} color="#f5c518" />
                    <span
                      style={{
                        fontSize: 8,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        color: "#f5c518",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Code
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "#ffffff",
                      letterSpacing: "0.1em",
                      background: "rgba(245,197,24,0.10)",
                      border: "1px solid rgba(245,197,24,0.25)",
                      borderRadius: 5,
                      padding: "5px 8px",
                      display: "inline-block",
                      textAlign: "center",
                      wordBreak: "break-all",
                    }}
                  >
                    {data.redemptionCode}
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <GlobeIcon size={9} color="#4a90e2" />
                    <span
                      style={{
                        fontSize: 8,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        color: "#4a90e2",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Site
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      color: "#b0b0b0",
                      textAlign: "center",
                      wordBreak: "break-all",
                      padding: "4px 6px",
                      background: "rgba(74,144,226,0.08)",
                      border: "1px solid rgba(74,144,226,0.2)",
                      borderRadius: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {data.redemptionUrl}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderTop: "1px solid #2a2a2a",
          backgroundColor: "#0d0d0d",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#555",
            letterSpacing: "0.04em",
          }}
        >
          NewFreeRewards.com
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              color: "#555",
            }}
          >
            @
          </span>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "#f5c518" }}>N</span>
            <span style={{ color: "#4a90e2" }}>F</span>
            <span style={{ color: "#2ecc71" }}>R</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function MonthlyCard({ data }: { data: MonthlyData }) {
  const numItems = data.rewards.length;
  // Dynamic scaling logic
  const cols = numItems > 24 ? 6 : numItems > 15 ? 5 : numItems > 8 ? 4 : 3;
  const itemScale =
    numItems > 24 ? 0.5 : numItems > 15 ? 0.6 : numItems > 8 ? 0.8 : 1;
  const paddingX = 24 - (cols - 3) * 2; // subtle shift for more items

  return (
    <div
      style={{
        width: 540,
        height: 540,
        backgroundColor: "#111111",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background:
            "linear-gradient(90deg, #f5c518 0%, #4a90e2 50%, #2ecc71 100%)",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px 0",
        }}
      >
        <img
          src="/images/card-studio/nfr-logo.jpg"
          alt="NFR"
          style={{ width: 44, height: 44, borderRadius: 8 }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.12em",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Monthly Rewards
        </span>
      </div>

      {/* Game name + month heading */}
      <div style={{ position: "relative", padding: "16px 24px 0" }}>
        <div
          style={{
            fontSize: numItems > 20 ? 36 : 42,
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            lineHeight: 1,
            color: "#ffffff",
          }}
        >
          {data.gameName}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: numItems > 20 ? 14 : 16,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#4a90e2",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {data.month} Rewards
        </div>
        {/* Divider */}
        <div
          style={{
            marginTop: 12,
            height: 1,
            backgroundColor: "#2a2a2a",
          }}
        />
      </div>

      {/* Reward thumbnails grid */}
      <div
        style={{
          position: "relative",
          padding: `14px ${paddingX}px 0`,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: numItems > 24 ? 6 : numItems > 15 ? 8 : 10,
          maxHeight: "340px",
        }}
      >
        {data.rewards.slice(0, 30).map((reward, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: `${8 * itemScale}px`,
            }}
          >
            <img
              src={reward.image || "/images/card-studio/valkyrie-emote.png"}
              alt={reward.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/card-studio/valkyrie-emote.png";
              }}
              style={{
                width: 64 * itemScale,
                height: 64 * itemScale,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                marginTop: 6 * itemScale,
                fontSize: Math.max(9, 11 * itemScale),
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                color: "#aaaaaa",
                textAlign: "center",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {reward.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderTop: "1px solid #2a2a2a",
          backgroundColor: "#0d0d0d",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#555",
            letterSpacing: "0.04em",
          }}
        >
          NewFreeRewards.com
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              color: "#555",
            }}
          >
            @
          </span>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "#f5c518" }}>N</span>
            <span style={{ color: "#4a90e2" }}>F</span>
            <span style={{ color: "#2ecc71" }}>R</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function FieldRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#777",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: 8,
          padding: "12px 16px",
          color: "#ffffff",
          fontSize: 15,
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#4a90e2";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,144,226,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#2a2a2a";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

export default function SocialStudioClient({
  platforms,
}: {
  platforms: PlatformInfo[];
}) {
  const [tab, setTab] = useState<Tab>("new-reward");
  const [exporting, setExporting] = useState(false);
  const [posting, setPosting] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // States for the data fetcher
  const [selectedPlatformId, setSelectedPlatformId] = useState("");
  const [selectedRewardId, setSelectedRewardId] = useState("");
  const [isLoadingRewards, setIsLoadingRewards] = useState(false);

  // Store fetched rewards associated with the selected platform
  const [fetchedRewards, setFetchedRewards] = useState<RewardItem[]>([]);

  // Composer fields
  const [postBody, setPostBody] = useState("");
  const [postTags, setPostTags] = useState("");

  const [newReward, setNewReward] = useState<NewRewardData>({
    rewardName: "Valkyrie Emote",
    gameName: "Fortnite",
    platform: "Epic Games",
    isExclusive: false,
    image: undefined,
    redemptionUrl: "",
    redemptionCode: "",
    qrInput: "",
    qrDataUrl: "",
  });

  // Auto-generate QR code data URL when qrInput changes
  const generateQr = useCallback(async (input: string) => {
    if (!input.trim()) {
      setNewReward((d) => ({ ...d, qrDataUrl: "" }));
      return;
    }
    try {
      const dataUrl = await QRCode.toDataURL(input.trim(), {
        width: 256,
        margin: 1,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "H", // high so logo overlay is readable
      });
      setNewReward((d) => ({ ...d, qrDataUrl: dataUrl }));
    } catch {
      setNewReward((d) => ({ ...d, qrDataUrl: "" }));
    }
  }, []);

  useEffect(() => {
    // Debounce QR generation slightly
    const timer = setTimeout(() => {
      generateQr(newReward.qrInput || "");
    }, 400);
    return () => clearTimeout(timer);
  }, [newReward.qrInput, generateQr]);

  const [monthly, setMonthly] = useState<MonthlyData>({
    gameName: "Clash Royale",
    month: "August 2026",
    rewards: SAMPLE_REWARDS,
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "new-reward", label: "New Reward" },
    { id: "monthly", label: "Monthly Rewards" },
  ];

  const exportPng = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download =
        tab === "new-reward"
          ? `nfr-new-reward-${newReward.rewardName
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`
          : `nfr-monthly-${monthly.gameName
              .toLowerCase()
              .replace(/\s+/g, "-")}-${monthly.month
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`;
      a.click();
    } finally {
      setExporting(false);
    }
  };

  const handlePostToPinterest = async () => {
    if (!cardRef.current) return;
    setPosting(true);
    setShowPostMenu(false);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const caption = `${postBody}\n\n${postTags}`;
      const platformName =
        tab === "new-reward" ? newReward.gameName : monthly.gameName;

      const result = await postToPinterest(
        dataUrl,
        caption,
        platformName || "NFR",
      );

      if (result.success) {
        alert(result.message);
      }
    } catch (e: any) {
      alert("Error posting to Pinterest: " + (e.message || String(e)));
    } finally {
      setPosting(false);
    }
  };

  const loadRewardsForPlatform = async (platformId: string) => {
    if (!platformId) {
      setFetchedRewards([]);
      return;
    }
    setIsLoadingRewards(true);
    try {
      const platformRewards = await getPlatformActiveRewards(platformId);
      setFetchedRewards(platformRewards);

      const selectedPlatform = platforms.find((p) => p.id === platformId);
      const platName = selectedPlatform ? selectedPlatform.name : "";

      if (tab === "monthly") {
        setMonthly((prev) => ({
          ...prev,
          gameName: platName || prev.gameName,
          rewards:
            platformRewards.length > 0
              ? platformRewards
              : [{ name: "No active rewards" }],
        }));
        setPostBody(
          `Monthly report of all current available rewards as ${monthly.month} for ${platName}!`,
        );
        setPostTags(
          `#${platName.replace(/\s+/g, "")} #${platName.replace(/\s+/g, "")}Rewards #FreeRewards #NewFreeRewards`,
        );
      }
    } catch (e) {
      console.error(e);
      alert("Failed to load rewards");
    } finally {
      setIsLoadingRewards(false);
    }
  };

  const handlePlatformChange = (val: string) => {
    setSelectedPlatformId(val);
    setSelectedRewardId(""); // reset selected reward
    loadRewardsForPlatform(val);
  };

  const handleRewardSelection = (val: string) => {
    setSelectedRewardId(val);
    const selectedPlatform = platforms.find((p) => p.id === selectedPlatformId);
    const reward = fetchedRewards.find((r) => r.id === val);

    if (reward && selectedPlatform) {
      setNewReward((prev) => ({
        ...prev,
        rewardName: reward.name,
        gameName: selectedPlatform.name,
        platform: selectedPlatform.name,
        image: reward.image,
      }));
      setPostBody(
        `${reward.name} is now available on ${selectedPlatform.name}! Get yours today free! \n\n${reward.description || ""}`,
      );
      setPostTags(
        `#${selectedPlatform.name.replace(/\s+/g, "")} #${reward.name.replace(/\s+/g, "")} #NewFreeRewards`,
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "32px 24px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        borderRadius: "16px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/images/card-studio/nfr-logo.jpg"
            alt="NFR"
            style={{ width: 40, height: 40, borderRadius: 8 }}
          />
          <span
            style={{
              fontSize: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "#f5c518" }}>N</span>
            <span style={{ color: "#4a90e2" }}>F</span>
            <span style={{ color: "#2ecc71" }}>R</span>
            <span
              style={{
                color: "#666",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Card Studio
            </span>
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            color: "#555",
            letterSpacing: "0.04em",
          }}
        >
          Social media card templates
        </p>
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: 8,
          padding: 4,
          gap: 2,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setPostBody("");
            }}
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.04em",
              transition: "all 0.15s",
              backgroundColor: tab === t.id ? "#4a90e2" : "transparent",
              color: tab === t.id ? "#ffffff" : "#555",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card preview */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          ref={cardRef}
          style={{
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 0 1px #2a2a2a, 0 32px 64px rgba(0,0,0,0.6)",
          }}
        >
          {tab === "new-reward" ? (
            <NewRewardCard data={newReward} />
          ) : (
            <MonthlyCard data={monthly} />
          )}
        </div>

        {/* Buttons container */}
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button
            onClick={exportPng}
            disabled={exporting || posting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              cursor: exporting ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.06em",
              backgroundColor: exporting ? "#2a2a2a" : "#2ecc71",
              color: exporting ? "#555" : "#0a0a0a",
              transition: "all 0.15s",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 10.5L3.5 6.5H6V1.5H9V6.5H11.5L7.5 10.5Z"
                fill="currentColor"
              />
              <rect
                x="2"
                y="12"
                width="11"
                height="1.5"
                rx="0.75"
                fill="currentColor"
              />
            </svg>
            {exporting ? "Exporting…" : "Export PNG"}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowPostMenu(!showPostMenu)}
              disabled={posting || exporting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                borderRadius: 8,
                border: "none",
                cursor: posting ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.06em",
                backgroundColor: posting ? "#2a2a2a" : "#4a90e2",
                color: posting ? "#555" : "#ffffff",
                transition: "all 0.15s",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
              {posting ? "Posting…" : "Post..."}
            </button>
            {showPostMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: 8,
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: 8,
                  padding: 8,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  width: 220,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <button
                  onClick={handlePostToPinterest}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#e60023",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    textAlign: "left",
                  }}
                >
                  Post to Pinterest
                </button>
                <button
                  disabled
                  title="Coming soon"
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "not-allowed",
                    backgroundColor: "#2a2a2a",
                    color: "#666666",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    textAlign: "left",
                  }}
                >
                  Post to Instagram (Disabled)
                </button>
                <button
                  disabled
                  title="Coming soon"
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "not-allowed",
                    backgroundColor: "#2a2a2a",
                    color: "#666666",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    textAlign: "left",
                  }}
                >
                  Post to Facebook Page (Disabled)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor fields */}
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          backgroundColor: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: 10,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#333",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            borderBottom: "1px solid #222",
            paddingBottom: 10,
          }}
        >
          Edit Card
        </div>

        {tab === "new-reward" ? (
          <>
            {/* Auto-fill from active rewards block */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                paddingBottom: "14px",
                borderBottom: "1px solid #2a2a2a",
                marginBottom: "4px",
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#e1306c",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Data Source API
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <select
                  value={selectedPlatformId}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 8,
                    padding: "12px 14px",
                    color: "#ffffff",
                    fontSize: 15,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                  }}
                >
                  <option value="">Select Platform/Game...</option>
                  {platforms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {selectedPlatformId && (
                  <select
                    value={selectedRewardId}
                    onChange={(e) => handleRewardSelection(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: 8,
                      padding: "12px 14px",
                      color: "#ffffff",
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: "none",
                    }}
                  >
                    <option value="">
                      {isLoadingRewards
                        ? "Loading rewards..."
                        : "Select Reward..."}
                    </option>
                    {fetchedRewards.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <FieldRow
              label="Reward Name"
              value={newReward.rewardName}
              onChange={(v) => setNewReward((d) => ({ ...d, rewardName: v }))}
            />
            <FieldRow
              label="Game Name"
              value={newReward.gameName}
              onChange={(v) => setNewReward((d) => ({ ...d, gameName: v }))}
            />
            <FieldRow
              label="Platform"
              value={newReward.platform}
              onChange={(v) => setNewReward((d) => ({ ...d, platform: v }))}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() =>
                  setNewReward((d) => ({ ...d, isExclusive: !d.isExclusive }))
                }
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: newReward.isExclusive
                    ? "#f5c518"
                    : "#2a2a2a",
                  position: "relative",
                  transition: "background-color 0.2s",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: newReward.isExclusive ? 20 : 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    transition: "left 0.2s",
                  }}
                />
              </button>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  color: "#888",
                }}
              >
                Exclusive badge
              </span>
            </div>

            {/* Divider */}
            <div
              style={{ height: 1, backgroundColor: "#1e1e1e", margin: "4px 0" }}
            />

            {/* ── Redemption section header ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 2,
                  height: 14,
                  background: "linear-gradient(180deg, #4a90e2, #2ecc71)",
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#444",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Redemption Info
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "'Inter', sans-serif",
                  color: "#333",
                }}
              >
                — all optional
              </span>
            </div>

            {/* Redemption Website URL */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#4a90e2",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: "rgba(74,144,226,0.12)",
                    border: "1px solid rgba(74,144,226,0.25)",
                    flexShrink: 0,
                  }}
                >
                  <GlobeIcon size={12} color="#4a90e2" />
                </span>
                Redemption Website
              </label>
              <input
                type="url"
                value={newReward.redemptionUrl || ""}
                onChange={(e) =>
                  setNewReward((d) => ({ ...d, redemptionUrl: e.target.value }))
                }
                placeholder="https://example.com/redeem"
                style={{
                  background: "#141414",
                  border: "1px solid #252525",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 15,
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#4a90e2";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(74,144,226,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#252525";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Redemption Code */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#f5c518",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: "rgba(245,197,24,0.10)",
                    border: "1px solid rgba(245,197,24,0.22)",
                    flexShrink: 0,
                  }}
                >
                  <KeyIcon size={12} color="#f5c518" />
                </span>
                Redemption Code
              </label>
              <input
                type="text"
                value={newReward.redemptionCode || ""}
                onChange={(e) =>
                  setNewReward((d) => ({
                    ...d,
                    redemptionCode: e.target.value,
                  }))
                }
                placeholder="e.g. FREENOW2026"
                style={{
                  background: "#141414",
                  border: "1px solid #252525",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 15,
                  fontFamily: "monospace",
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  letterSpacing: "0.08em",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#f5c518";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(245,197,24,0.10)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#252525";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* QR Code Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#2ecc71",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: "rgba(46,204,113,0.10)",
                    border: "1px solid rgba(46,204,113,0.22)",
                    flexShrink: 0,
                  }}
                >
                  <QrCodeIcon size={12} color="#2ecc71" />
                </span>
                QR Code — URL or Text
              </label>
              <input
                type="text"
                value={newReward.qrInput || ""}
                onChange={(e) =>
                  setNewReward((d) => ({ ...d, qrInput: e.target.value }))
                }
                placeholder="Paste any URL or text to generate a QR code"
                style={{
                  background: "#141414",
                  border: "1px solid #252525",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 15,
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2ecc71";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(46,204,113,0.10)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#252525";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              {newReward.qrDataUrl && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginTop: 4,
                    padding: "14px 16px",
                    background:
                      "linear-gradient(135deg, #0e1a12 0%, #0d130f 100%)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    borderRadius: 10,
                  }}
                >
                  {/* QR preview */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      style={{
                        background: "#ffffff",
                        borderRadius: 8,
                        padding: 6,
                        boxShadow:
                          "0 0 0 1.5px rgba(46,204,113,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                      }}
                    >
                      <img
                        src={newReward.qrDataUrl}
                        alt="QR preview"
                        style={{
                          width: 90,
                          height: 90,
                          display: "block",
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    {/* Logo overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#fff",
                        borderRadius: 4,
                        padding: 2,
                      }}
                    >
                      <img
                        src="/images/card-studio/nfr-logo.jpg"
                        alt="NFR"
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 2,
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: "#2ecc71",
                          flexShrink: 0,
                        }}
                      >
                        <CheckIcon size={10} color="#000" />
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontFamily: "'Inter', sans-serif",
                          color: "#2ecc71",
                          fontWeight: 600,
                        }}
                      >
                        QR Generated
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'Inter', sans-serif",
                        color: "#3a5a3e",
                      }}
                    >
                      Will appear on the card
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Auto-fill from active rewards block */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                paddingBottom: "14px",
                borderBottom: "1px solid #2a2a2a",
                marginBottom: "4px",
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#e1306c",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Data Source API
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  value={selectedPlatformId}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  style={{
                    flex: 1,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 8,
                    padding: "12px 14px",
                    color: "#ffffff",
                    fontSize: 15,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                  }}
                >
                  <option value="">Select Platform/Game...</option>
                  {platforms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => loadRewardsForPlatform(selectedPlatformId)}
                  disabled={!selectedPlatformId || isLoadingRewards}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    border: "none",
                    cursor:
                      !selectedPlatformId || isLoadingRewards
                        ? "not-allowed"
                        : "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    backgroundColor:
                      !selectedPlatformId || isLoadingRewards
                        ? "#2a2a2a"
                        : "#4a90e2",
                    color:
                      !selectedPlatformId || isLoadingRewards
                        ? "#555"
                        : "#ffffff",
                    transition: "all 0.15s",
                  }}
                >
                  {isLoadingRewards ? "Loading..." : "Load"}
                </button>
              </div>
            </div>

            <FieldRow
              label="Game / Platform Name"
              value={monthly.gameName}
              onChange={(v) => setMonthly((d) => ({ ...d, gameName: v }))}
            />
            <FieldRow
              label="Month"
              value={monthly.month}
              onChange={(v) => setMonthly((d) => ({ ...d, month: v }))}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#555",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Reward Names (one per line, up to 30)
              </label>
              <textarea
                value={monthly.rewards.map((r) => r.name).join("\n")}
                onChange={(e) => {
                  const lines = e.target.value.split("\n").slice(0, 30);
                  setMonthly((d) => ({
                    ...d,
                    rewards: lines.map((name) => {
                      // Try to match with fetched rewards to preserve image
                      const existing = fetchedRewards.find(
                        (r) => r.name === name,
                      );
                      return existing ? existing : { name: name || "" };
                    }),
                  }));
                }}
                rows={10}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#ffffff",
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              />
            </div>
          </>
        )}
      </div>

      {/* Post Composer Block */}
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          backgroundColor: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: 10,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#333",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            borderBottom: "1px solid #222",
            paddingBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#e1306c" }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Post Composer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#555",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Post Body
          </label>
          <textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            rows={5}
            placeholder={
              tab === "new-reward"
                ? "Describe the new reward..."
                : "Describe the monthly report..."
            }
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              padding: "12px 16px",
              color: "#ffffff",
              fontSize: 15,
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              resize: "vertical",
              lineHeight: 1.6,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#555",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Post Tags
          </label>
          <input
            value={postTags}
            onChange={(e) => setPostTags(e.target.value)}
            placeholder="#tags #separated #by #spaces"
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              padding: "12px 16px",
              color: "#ffffff",
              fontSize: 15,
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
          />
        </div>
      </div>
    </div>
  );
}
