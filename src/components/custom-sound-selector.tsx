import { Input } from "./ui/input";
import React from "react";

interface CustomSoundSelectorProps {
  customDot: File | null;
  setCustomDot: (file: File | null) => void;
  customDash: File | null;
  setCustomDash: (file: File | null) => void;
}

export const CustomSoundSelector: React.FC<CustomSoundSelectorProps> = ({
  setCustomDot,
  setCustomDash,
}) => (
  <>
    <label className="block mt-1 text-sm text-left">Custom dot sound:
      <Input type="file" accept="audio/*" className="block mt-1" onChange={e => setCustomDot(e.target.files?.[0] || null)} />
    </label>
    <label className="block mt-1 text-sm text-left">Custom dash sound:
      <Input type="file" accept="audio/*" className="block mt-1" onChange={e => setCustomDash(e.target.files?.[0] || null)} />
    </label>
  </>
);
