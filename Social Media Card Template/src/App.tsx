import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import nfrLogo from '@/imports/626888195_122287208756073889_2863061566938551913_n.jpg'
import valkyrieEmote from '@/imports/hero-valkyrie-emote.png'

type Tab = 'new-reward' | 'monthly'

interface NewRewardData {
  rewardName: string
  gameName: string
  platform: string
  isExclusive: boolean
}

interface RewardItem {
  name: string
}

interface MonthlyData {
  gameName: string
  month: string
  rewards: RewardItem[]
}

const SAMPLE_REWARDS: RewardItem[] = [
  { name: 'Valkyrie Emote' },
  { name: 'Gold Shield' },
  { name: 'Crown Pack' },
  { name: 'Epic Chest' },
  { name: 'Season Badge' },
  { name: 'Rare Card' },
]

function NewRewardCard({ data }: { data: NewRewardData }) {
  return (
    <div
      style={{
        width: 540,
        height: 540,
        backgroundColor: '#111111',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top-right color stripe accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 6,
          background: 'linear-gradient(90deg, #f5c518, #4a90e2, #2ecc71)',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px 0',
        }}
      >
        <img src={nfrLogo} alt="NFR" style={{ width: 52, height: 52, borderRadius: 8 }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {data.isExclusive && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.12em',
                color: '#111',
                backgroundColor: '#f5c518',
                padding: '3px 10px',
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
              letterSpacing: '0.12em',
              color: '#2ecc71',
              border: '1.5px solid #2ecc71',
              padding: '3px 10px',
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
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(74,144,226,0.25) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <img
          src={valkyrieEmote}
          alt={data.rewardName}
          style={{
            width: 200,
            height: 200,
            objectFit: 'contain',
            position: 'relative',
            filter: 'drop-shadow(0 0 24px rgba(74,144,226,0.5))',
          }}
        />
      </div>

      {/* Reward info */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: '12px 32px 0',
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '0.02em',
            color: '#ffffff',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          {data.rewardName}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: '#888888',
            letterSpacing: '0.06em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#4a90e2' }}>{data.gameName}</span>
          <span style={{ color: '#333' }}>•</span>
          <span>{data.platform}</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderTop: '1px solid #2a2a2a',
          backgroundColor: '#0d0d0d',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: '#555',
            letterSpacing: '0.04em',
          }}
        >
          NewFreeRewards.com
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: '#555' }}>@</span>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: '#f5c518' }}>N</span>
            <span style={{ color: '#4a90e2' }}>F</span>
            <span style={{ color: '#2ecc71' }}>R</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function MonthlyCard({ data }: { data: MonthlyData }) {
  return (
    <div
      style={{
        width: 540,
        height: 540,
        backgroundColor: '#111111',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #f5c518 0%, #4a90e2 50%, #2ecc71 100%)',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px 0',
        }}
      >
        <img src={nfrLogo} alt="NFR" style={{ width: 44, height: 44, borderRadius: 8 }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.12em',
            color: '#555',
            textTransform: 'uppercase',
          }}
        >
          Monthly Rewards
        </span>
      </div>

      {/* Game name + month heading */}
      <div style={{ position: 'relative', padding: '16px 24px 0' }}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: '#ffffff',
          }}
        >
          {data.gameName}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 16,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: '#4a90e2',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {data.month} Rewards
        </div>
        {/* Divider */}
        <div
          style={{
            marginTop: 12,
            height: 1,
            backgroundColor: '#2a2a2a',
          }}
        />
      </div>

      {/* Reward thumbnails grid */}
      <div
        style={{
          position: 'relative',
          padding: '14px 24px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {data.rewards.slice(0, 6).map((reward, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: 8,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px 8px 8px',
            }}
          >
            <img
              src={valkyrieEmote}
              alt={reward.name}
              style={{ width: 64, height: 64, objectFit: 'contain' }}
            />
            <span
              style={{
                marginTop: 6,
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                color: '#aaaaaa',
                textAlign: 'center',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderTop: '1px solid #2a2a2a',
          backgroundColor: '#0d0d0d',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: '#555',
            letterSpacing: '0.04em',
          }}
        >
          NewFreeRewards.com
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: '#555' }}>@</span>
          <span
            style={{
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: '#f5c518' }}>N</span>
            <span style={{ color: '#4a90e2' }}>F</span>
            <span style={{ color: '#2ecc71' }}>R</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function FieldRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: '#555',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 6,
          padding: '8px 12px',
          color: '#ffffff',
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#4a90e2')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
      />
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('new-reward')
  const [exporting, setExporting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const exportPng = async () => {
    if (!cardRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = tab === 'new-reward'
        ? `nfr-new-reward-${newReward.rewardName.toLowerCase().replace(/\s+/g, '-')}.png`
        : `nfr-monthly-${monthly.gameName.toLowerCase().replace(/\s+/g, '-')}-${monthly.month.toLowerCase().replace(/\s+/g, '-')}.png`
      a.click()
    } finally {
      setExporting(false)
    }
  }

  const [newReward, setNewReward] = useState<NewRewardData>({
    rewardName: 'Valkyrie Emote',
    gameName: 'Fortnite',
    platform: 'Epic Games',
    isExclusive: false,
  })

  const [monthly, setMonthly] = useState<MonthlyData>({
    gameName: 'Clash Royale',
    month: 'August 2026',
    rewards: SAMPLE_REWARDS,
  })

  const tabs: { id: Tab; label: string }[] = [
    { id: 'new-reward', label: 'New Reward' },
    { id: 'monthly', label: 'Monthly Rewards' },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: '32px 24px 64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={nfrLogo} alt="NFR" style={{ width: 40, height: 40, borderRadius: 8 }} />
          <span
            style={{
              fontSize: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: '#f5c518' }}>N</span>
            <span style={{ color: '#4a90e2' }}>F</span>
            <span style={{ color: '#2ecc71' }}>R</span>
            <span style={{ color: '#666', marginLeft: 10, fontSize: 16, fontWeight: 500 }}>
              Card Studio
            </span>
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            color: '#555',
            letterSpacing: '0.04em',
          }}
        >
          Social media card templates
        </p>
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#161616',
          border: '1px solid #2a2a2a',
          borderRadius: 8,
          padding: 4,
          gap: 2,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.04em',
              transition: 'all 0.15s',
              backgroundColor: tab === t.id ? '#4a90e2' : 'transparent',
              color: tab === t.id ? '#ffffff' : '#555',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card preview */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div
          ref={cardRef}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 0 0 1px #2a2a2a, 0 32px 64px rgba(0,0,0,0.6)',
          }}
        >
          {tab === 'new-reward' ? (
            <NewRewardCard data={newReward} />
          ) : (
            <MonthlyCard data={monthly} />
          )}
        </div>

        {/* Export button */}
        <button
          onClick={exportPng}
          disabled={exporting}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            cursor: exporting ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.06em',
            backgroundColor: exporting ? '#2a2a2a' : '#2ecc71',
            color: exporting ? '#555' : '#0a0a0a',
            transition: 'all 0.15s',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 10.5L3.5 6.5H6V1.5H9V6.5H11.5L7.5 10.5Z" fill="currentColor"/>
            <rect x="2" y="12" width="11" height="1.5" rx="0.75" fill="currentColor"/>
          </svg>
          {exporting ? 'Exporting…' : 'Export PNG'}
        </button>
      </div>

      {/* Editor fields */}
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          backgroundColor: '#161616',
          border: '1px solid #2a2a2a',
          borderRadius: 10,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            textTransform: 'uppercase',
            borderBottom: '1px solid #222',
            paddingBottom: 10,
          }}
        >
          Edit Card
        </div>

        {tab === 'new-reward' ? (
          <>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setNewReward((d) => ({ ...d, isExclusive: !d.isExclusive }))}
                style={{
                  width: 36,
                  height: 20,
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: newReward.isExclusive ? '#f5c518' : '#2a2a2a',
                  position: 'relative',
                  transition: 'background-color 0.2s',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: newReward.isExclusive ? 18 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    transition: 'left 0.2s',
                  }}
                />
              </button>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  color: '#888',
                }}
              >
                Exclusive badge
              </span>
            </div>
          </>
        ) : (
          <>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#555',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Reward Names (one per line, up to 6)
              </label>
              <textarea
                value={monthly.rewards.map((r) => r.name).join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n').slice(0, 6)
                  setMonthly((d) => ({
                    ...d,
                    rewards: lines.map((name) => ({ name: name || '' })),
                  }))
                }}
                rows={6}
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  resize: 'none',
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#4a90e2')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
