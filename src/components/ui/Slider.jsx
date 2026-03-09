import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Slider({ min, max, value, onChange, step = 1, formatLabel }) {
  return (
    <div className="px-2">
      <RcSlider
        range
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        trackStyle={[{ backgroundColor: '#2563eb', height: 6 }]}
        handleStyle={[
          { borderColor: '#2563eb', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' },
          { borderColor: '#2563eb', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' },
        ]}
        railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>{formatLabel ? formatLabel(value[0]) : value[0]}</span>
        <span>{formatLabel ? formatLabel(value[1]) : value[1]}</span>
      </div>
    </div>
  );
}
