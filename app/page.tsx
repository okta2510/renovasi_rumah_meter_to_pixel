'use client';

import { useState, useEffect } from 'react';
import { RulerIcon, ArrowRightLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [baseMeters, setBaseMeters] = useState<number>(1.7);
  const [basePixels, setBasePixels] = useState<number>(63);
  const [inputValue, setInputValue] = useState<number>(3);
  const [result, setResult] = useState<number>(0);
  const [isMetersToPixels, setIsMetersToPixels] = useState<boolean>(true);

  const calculate = () => {
    if (isMetersToPixels) {
      // Convert meters to pixels
      const pixelResult = (inputValue * basePixels) / baseMeters;
      setResult(Math.round(pixelResult * 100) / 100);
    } else {
      // Convert pixels to meters
      const meterResult = (inputValue * baseMeters) / basePixels;
      setResult(Math.round(meterResult * 100) / 100);
    }
  };

  useEffect(() => {
    calculate();
  }, [inputValue, baseMeters, basePixels, isMetersToPixels]);

  const toggleDirection = () => {
    setIsMetersToPixels(!isMetersToPixels);
    setInputValue(result); // Set the current result as the new input
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <RulerIcon className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Meter ↔ Pixel Converter</h1>
          <p className="text-muted-foreground">Convert between meters and pixels with ease</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseMeters">Base Meters</Label>
                <Input
                  id="baseMeters"
                  type="number"
                  step="0.1"
                  value={baseMeters}
                  onChange={(e) => setBaseMeters(parseFloat(e.target.value) || 0)}
                  placeholder="Enter base meters"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePixels">Base Pixels</Label>
                <Input
                  id="basePixels"
                  type="number"
                  value={basePixels}
                  onChange={(e) => setBasePixels(parseFloat(e.target.value) || 0)}
                  placeholder="Enter base pixels"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="input">
                  {isMetersToPixels ? 'Meters to Convert' : 'Pixels to Convert'}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDirection}
                  className="flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Switch Direction
                </Button>
              </div>
              <Input
                id="input"
                type="number"
                step="0.1"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                placeholder={isMetersToPixels ? "Enter meters" : "Enter pixels"}
              />
            </div>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold text-foreground">
                {result} {isMetersToPixels ? 'pixels' : 'meters'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {inputValue}{isMetersToPixels ? 'm' : 'px'} = {result}{isMetersToPixels ? 'px' : 'm'}
                <br />
                (ratio: 1m = {(basePixels / baseMeters).toFixed(2)}px)
              </p>
            </div>
          </div>
        </Card>
      </div>
      <footer className="mt-[100px] text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} <a href="https://oktaviardi.com" className="text-primary hover:underline">oktaviardi.com</a>
        </p>
        <p>
          Check out <a href="https://github.com/okta2510" className="text-primary hover:underline">my GitHub</a>
        </p>
      </footer>
    </div>
  );
}