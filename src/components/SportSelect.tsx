import { Select } from './Select';
import { ALL_SPORTS_VALUE } from '@/utils/filterLeagues';

type SportSelectProps = {
  sports: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SportSelect({ sports, value, onChange }: SportSelectProps) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value={ALL_SPORTS_VALUE}>All sports</option>
      {sports.map((sport) => (
        <option key={sport} value={sport}>
          {sport}
        </option>
      ))}
    </Select>
  );
}
