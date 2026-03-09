export const palestineBounds = [
  [29.5, 34.2],
  [33.3, 35.9]
];

export const palestineCenter = [31.9, 35.2];

export const palestineCities = [
  { name: 'Jerusalem', coordinates: [31.7683, 35.2137], region: 'west-bank' },
  { name: 'Gaza', coordinates: [31.5, 34.467], region: 'gaza' },
  { name: 'Ramallah', coordinates: [31.9, 35.2], region: 'west-bank' },
  { name: 'Hebron', coordinates: [31.5326, 35.0998], region: 'west-bank' },
  { name: 'Nablus', coordinates: [32.2211, 35.2544], region: 'west-bank' },
  { name: 'Bethlehem', coordinates: [31.7054, 35.2024], region: 'west-bank' },
  { name: 'Jericho', coordinates: [31.8667, 35.4667], region: 'west-bank' },
  { name: 'Jenin', coordinates: [32.4603, 35.2969], region: 'west-bank' },
  { name: 'Tulkarm', coordinates: [32.3108, 35.0278], region: 'west-bank' },
  { name: 'Qalqilya', coordinates: [32.1889, 34.9706], region: 'west-bank' },
  { name: 'Rafah', coordinates: [31.2969, 34.2455], region: 'gaza' },
  { name: 'Khan Yunis', coordinates: [31.3462, 34.3061], region: 'gaza' },
  { name: 'Salfit', coordinates: [32.0833, 35.1833], region: 'west-bank' },
  { name: 'Tubas', coordinates: [32.3209, 35.3681], region: 'west-bank' },
];

export const palestineDistricts = {
  'Jerusalem': ['Old City', 'Sheikh Jarrah', 'Silwan', 'Beit Hanina', 'Shuafat', 'Sur Baher'],
  'Ramallah': ['Al-Bireh', 'Beitunia', 'Ein Arik', 'Beit Ur', 'Silwad', 'Downtown'],
  'Hebron': ['Old City', 'Halhul', 'Dura', 'Yatta', 'Beit Ummar', 'Taffuh'],
  'Nablus': ['Old City', 'Rafidia', 'Balata', 'Askar', 'Tell', 'Huwara'],
  'Bethlehem': ['Old City', 'Beit Sahour', 'Beit Jala', 'Al-Khader', 'Artas'],
  'Gaza': ['Rimal', 'Shujayea', 'Zeitoun', 'Tel al-Hawa', 'Sheikh Radwan', 'Sabra'],
  'Jenin': ['Downtown', 'Qabatiya', 'Arraba', 'Yabad', 'Al-Yamun'],
  'Jericho': ['Downtown', 'Ein al-Sultan', 'Aqbat Jaber', 'Ein al-Dyouk'],
  'Tulkarm': ['Downtown', 'Anabta', 'Bal\'a', 'Illar', 'Attil'],
  'Qalqilya': ['Downtown', 'Azzun', 'Jayous', 'Habla'],
  'Khan Yunis': ['Downtown', 'Abasan', 'Bani Suheila', 'Khuza\'a'],
  'Rafah': ['Downtown', 'Tal al-Sultan', 'Al-Shaboura', 'Yibna'],
  'Salfit': ['Downtown', 'Deir Istiya', 'Bruqin', 'Kifl Haris'],
  'Tubas': ['Downtown', 'Tammun', 'Tayasir', 'Aqqaba'],
};

export const palestineRegions = [
  {
    id: 'west-bank',
    name: 'West Bank',
    coordinates: [31.9, 35.2],
    bounds: [[31.3, 34.9], [32.5, 35.6]]
  },
  {
    id: 'gaza',
    name: 'Gaza Strip',
    coordinates: [31.5, 34.467],
    bounds: [[31.2, 34.2], [31.6, 34.6]]
  }
];
