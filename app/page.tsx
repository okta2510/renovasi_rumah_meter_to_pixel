'use client';

import { useState, useEffect } from 'react';
import { RulerIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [baseMeters, setBaseMeters] = useState<number>(1.7);
  const [basePixels, setBasePixels] = useState<number>(63);
  const [meters, setMeters] = useState<number>(3);
  const [result, setResult] = useState<number>(0);

  const calculatePixels = () => {
    // Calculate pixels using the ratio: basePixels/baseMeters = x/meters
    const pixelResult = (meters * basePixels) / baseMeters;
    setResult(Math.round(pixelResult * 100) / 100);
  };

  useEffect(() => {
    calculatePixels();
  }, [meters, baseMeters, basePixels]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <RulerIcon className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Meter to Pixel Converter</h1>
          <p className="text-muted-foreground">Calculate pixel values based on known ratios</p>
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
              <Label htmlFor="meters">Meters to Convert</Label>
              <Input
                id="meters"
                type="number"
                step="0.1"
                value={meters}
                onChange={(e) => setMeters(parseFloat(e.target.value) || 0)}
                placeholder="Enter meters to convert"
              />
            </div>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold text-foreground">
                {result} pixels
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {meters}m = {result}px (ratio: 1m = {(basePixels / baseMeters).toFixed(2)}px)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}