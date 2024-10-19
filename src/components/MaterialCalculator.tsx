import React, { useState } from 'react';
import { CalculationResult } from '../types';

interface MaterialCalculatorProps {
  onCalculate: (result: CalculationResult) => void;
}

const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({ onCalculate }) => {
  const [structureType, setStructureType] = useState('wall');
  const [mixType, setMixType] = useState(15);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const calculateMaterials = (mixType: number, volume: number, structureType: string): CalculationResult => {
    let bricks = 0, aggregate, cementBags, sand, steel;
    let cementRatio, sandRatio, aggregateRatio, totalRatio;

    switch (mixType) {
      case 15:
        bricks = 500 * volume;
        cementRatio = 1; sandRatio = 2; aggregateRatio = 4;
        break;
      case 20:
        bricks = 550 * volume;
        cementRatio = 1; sandRatio = 1.5; aggregateRatio = 3;
        break;
      case 25:
        bricks = 600 * volume;
        cementRatio = 1; sandRatio = 1; aggregateRatio = 2;
        break;
      case 30:
        bricks = 650 * volume;
        cementRatio = 1; sandRatio = 0.75; aggregateRatio = 1.5;
        break;
      case 40:
        bricks = 700 * volume;
        cementRatio = 1; sandRatio = 0.5; aggregateRatio = 1;
        break;
      default:
        throw new Error('Invalid mix type');
    }

    totalRatio = cementRatio + sandRatio + aggregateRatio;
    cementBags = ((cementRatio / totalRatio) * volume * 1440 / 50);
    sand = ((sandRatio / totalRatio) * volume);
    aggregate = ((aggregateRatio / totalRatio) * volume);
    steel = (0.0001 * volume * mixType);

    const totalVolume = aggregate + (cementBags * 50 / 1440) + sand + steel;

    return {
      bricks: structureType === 'wall' ? Math.ceil(bricks) : 0,
      aggregate: Number(aggregate.toFixed(2)),
      cementBags: Math.ceil(cementBags),
      sand: Number(sand.toFixed(2)),
      steel: Number(steel.toFixed(3)),
      volume: Number(totalVolume.toFixed(2)),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let volume: number;

    switch (structureType) {
      case 'wall':
        volume = Number(length) * Number(height) * 0.2; // Using 0.2m as standard wall width
        break;
      case 'slab':
      case 'beam':
        volume = Number(length) * Number(width) * Number(height);
        break;
      default:
        throw new Error('Invalid structure type');
    }

    const result = calculateMaterials(mixType, volume, structureType);
    onCalculate(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Structure Type</label>
        <select
          value={structureType}
          onChange={(e) => setStructureType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="wall">Wall</option>
          <option value="slab">Slab</option>
          <option value="beam">Beam</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Concrete Mix Type</label>
        <select
          value={mixType}
          onChange={(e) => setMixType(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Length (m)</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          required
          min="0.1"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {structureType !== 'wall' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Width (m)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            required
            min="0.1"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {structureType === 'slab' ? 'Thickness' : 'Height'} (m)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          min="0.1"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Calculate Materials
      </button>
    </form>
  );
};

export default MaterialCalculator;