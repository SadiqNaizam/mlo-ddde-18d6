import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface ParentalControlModuleProps {
  /** The main label for the control, e.g., "Weekly Allowance" */
  label: string;
  /** A short description appearing under the label */
  description: string;
  /** The maximum value for the slider */
  maxValue: number;
  /** The initial value for the slider */
  initialValue?: number;
  /** The initial enabled state of the control */
  initialEnabled?: boolean;
  /** The currency or unit symbol to display */
  unit?: string;
  /** The step increment for the slider */
  step?: number;
  /** Callback function that fires when the enabled state or value changes */
  onValueChange?: (value: { enabled: boolean; amount: number }) => void;
}

const ParentalControlModule: React.FC<ParentalControlModuleProps> = ({
  label,
  description,
  maxValue,
  initialValue = 0,
  initialEnabled = true,
  unit = '£',
  step = 1,
  onValueChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    console.log('ParentalControlModule loaded for:', label);
  }, [label]);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    if (onValueChange) {
      onValueChange({ enabled: checked, amount: currentValue });
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newAmount = value[0];
    setCurrentValue(newAmount);
    if (onValueChange) {
      onValueChange({ enabled: isEnabled, amount: newAmount });
    }
  };

  return (
    <div className="w-full p-4 border rounded-lg bg-white shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor={`switch-${label}`} className="text-base font-semibold">
            {label}
          </Label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Switch
          id={`switch-${label}`}
          checked={isEnabled}
          onCheckedChange={handleToggle}
          aria-label={`Enable or disable ${label}`}
        />
      </div>

      <div className={`transition-opacity duration-300 ${isEnabled ? 'opacity-100' : 'opacity-50'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Set amount</span>
          <span className="text-lg font-bold text-gray-800">
            {unit}{currentValue.toFixed(2)}
          </span>
        </div>
        <Slider
          id={`slider-${label}`}
          value={[currentValue]}
          onValueChange={handleSliderChange}
          max={maxValue}
          step={step}
          disabled={!isEnabled}
          className="w-full"
          aria-label={`Set value for ${label}`}
        />
      </div>
    </div>
  );
};

export default ParentalControlModule;