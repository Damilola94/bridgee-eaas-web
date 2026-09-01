"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const GRACE_HOUR_OPTIONS = [0, 1, 3, 6, 9, 12, 24, 72];

/** Matches the real GET /apikeys response shape. */
export interface ApiKey {
  keyId: string;
  masked: string;
  label: string;
  environment: string;
  status: "Active" | "Revoked" | string;
  createdAt: string;
  lastUsedAt?: string | null;
  expiresAt?: string | null;
  revokedAt?: string | null;
}

interface RotateKeyDialogProps {
  apiKey: ApiKey;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: (label: string, graceHours: number) => void;
}

export default function APIKey({
  apiKey,
  isSubmitting,
  onCancel,
  onConfirm,
}: RotateKeyDialogProps) {
  const [label, setLabel] = useState(apiKey.label);
  const [graceHours, setGraceHours] = useState(24);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Rotate API key
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This immediately issues a new secret for &ldquo;{apiKey.label}
              &rdquo;. The current key keeps working until the grace period
              below expires.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-900">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Production backend"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-primary-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-900">
              Grace period
            </label>
            <div className="flex flex-wrap gap-2">
              {GRACE_HOUR_OPTIONS.map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setGraceHours(hours)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    graceHours === hours
                      ? "border-secondary bg-primary text-white"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {hours === 0 ? "Immediate" : `${hours}h`}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              How long the old key stays valid after rotation. Choose
              &ldquo;Immediate&rdquo; to revoke it right away.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(label, graceHours)}
            disabled={isSubmitting || !label.trim()}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-900/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Rotating..." : "Rotate Key"}
          </button>
        </div>
      </div>
    </div>
  );
}