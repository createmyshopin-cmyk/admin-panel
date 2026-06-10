'use client';

import React, { useEffect, useState } from 'react';
import { API_BASE, getHeaders } from '../lib/api';

type Campaign = {
  id: string;
  enabled: boolean;
  rewardCoins: number;
  maxDurationSeconds: number;
  assignmentStrategy: string;
};

export default function WelcomeCampaignsView() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [rewardCoins, setRewardCoins] = useState(100);
  const [maxDurationSeconds, setMaxDurationSeconds] = useState(300);
  const [assignmentStrategy, setAssignmentStrategy] = useState('online');
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/welcome-campaigns`, {
          headers: getHeaders(),
        });
        const data = await res.json();
        const c = data.campaigns?.[0] as Campaign | undefined;
        if (c) {
          setCampaign(c);
          setRewardCoins(c.rewardCoins);
          setMaxDurationSeconds(c.maxDurationSeconds);
          setAssignmentStrategy(c.assignmentStrategy);
          setEnabled(c.enabled);
        }
      } catch {
        setMessage('Failed to load campaign');
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/admin/welcome-campaigns`, {
        method: 'POST',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled,
          rewardCoins,
          maxDurationSeconds,
          assignmentStrategy,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Save failed');
      setCampaign(data.campaign);
      setMessage('Campaign saved');
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-white">Welcome Call Campaign</h1>
      <p className="text-sm text-zinc-400">
        Privileged onboarding calls — platform pays creators; users are never charged.
      </p>

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Campaign enabled
      </label>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Reward coins (50–100)</label>
        <input
          type="number"
          min={50}
          max={100}
          value={rewardCoins}
          onChange={(e) => setRewardCoins(Number(e.target.value))}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Max duration (seconds)</label>
        <input
          type="number"
          min={60}
          max={600}
          value={maxDurationSeconds}
          onChange={(e) => setMaxDurationSeconds(Number(e.target.value))}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Assignment strategy</label>
        <select
          value={assignmentStrategy}
          onChange={(e) => setAssignmentStrategy(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-white"
        >
          <option value="online">Online creator</option>
          <option value="random">Random creator</option>
          <option value="top_rated">Top-rated creator</option>
          <option value="legend">Legend creator</option>
        </select>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-lg bg-pink-600 px-4 py-2 text-white font-medium disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save campaign'}
      </button>

      {message && <p className="text-sm text-zinc-300">{message}</p>}
      {campaign && (
        <p className="text-xs text-zinc-500">Campaign id: {campaign.id}</p>
      )}
    </div>
  );
}
