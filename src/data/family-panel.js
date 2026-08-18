
const W3 = 'Zəmanət - 3 il və ya 90 000 km'
const W5 = 'Zəmanət - 5 il və ya 150 000 km'

const FWD = 'Ön çəkimli'
const AWD = 'Daimi tam çəkimli quattro'


export const FAMILY_PANEL = {

  'a1-sportback': { engine: '1.0 L / 999 cm³', power: '116 a.g.', drive: FWD, warranty: W3 },
  'a3-sedan': { engine: '1.4 L / 1395 cm³', power: '150 a.g.', drive: FWD, warranty: W3 },

  'a4-ultra': {
    engine: '2.0 L / 1984 cm³',
    power: '190 a.g.',
    drive: 'ön ötürməli',
    warranty: W3,
  },
  'a5-sportback-sport': {
    engine: '2.0 L / 1984 cm³',
    power: '190 a.g.',
    drive: FWD,
    warranty: W3,
  },
  'a5-sportback-sline': {
    engine: '2.0 L / 1984 cm³',
    power: '252 a.g.',
    drive: AWD,
    warranty: W3,
  },
  'a6-design': {
    engine: '2.0 L / 1984 cm³',
    power: '190 a.g.',
    drive: 'ön ötürməli',
    warranty: W5,
  },
  'a6-sport': {
    engine: '2.0 L / 1984 cm³',
    power: '190 a.g.',
    drive: 'ön ötürməli',
    warranty: W5,
  },
  'a6-55-s-line': {
    engine: '3.0 L / 2995 cm³',
    power: '340 a.g.',
    drive: 'Daimi tam ötürmə quattro',
    warranty: W5,
  },
  'a7-sportback': {
    engine: '3.0 L / 2995 cm³',
    power: '340 a.g.',
    drive: AWD,
    warranty: W3,
  },
  'a8-55-lux': {
    engine: '3.0 L / 2995 cm³',
    power: '340 a.g.',
    drive: AWD,
    warranty: W3,
  },
  
  s8: { engine: '4.0 L', power: '571 a.g.', drive: AWD, warranty: W3 },

  q2: { engine: '1.4 L / 1395 cm³', power: '150 a.g.', drive: FWD, warranty: W3 },

  
  q3: { engine: '2.0 L / 1984 cm³', power: '220 a.g.', drive: AWD, warranty: W3 },

  'q5-design': {
    engine: '2.0 L / 1984 cm³',
    power: '252 a.g.',
    drive: AWD,
    warranty: W3,
  },
  
  'q5-sline': { engine: '2.0 L / 1984 cm³', power: '252 a.g.', drive: AWD, warranty: W3 },

  'q7-45-tdi': {
    engine: '3.0 L / 2967 cm³',
    power: '250 a.g.',
    drive: AWD,
    warranty: W5,
  },
  'q7-45-comfort': {
    engine: '2.0 L / 1984 cm³',
    power: '252 a.g.',
    drive: AWD,
    warranty: W5,
  },
  'q7-45-comfort-plus': {
    engine: '2.0 L / 1984 cm³',
    power: '252 a.g.',
    drive: AWD,
    warranty: W5,
  },
  'q7-45-business': {
    engine: '2.0 L / 1984 cm³',
    power: '252 a.g.',
    drive: AWD,
    warranty: W5,
  },
  'q7-55-business': {
    engine: '3.0 L / 2995 cm³',
    power: '340 a.g.',
    drive: AWD,
    warranty: W5,
  },
  q8: { engine: '3.0 L / 2995 cm³', power: '340 a.g.', drive: AWD, warranty: W3 },

  
  'tt-coupe': { engine: '2.0 L / 1984 cm³', power: '245 a.g.', drive: AWD, warranty: W3 },

  'tt-roadster': {
    engine: '2.0 L / 1984 cm³',
    power: '230 a.g.',
    drive: AWD,
    warranty: W3,
  },
  
  'r8-v10-plus': { engine: '5.2 L / 5204 cm³', power: '610 a.g.', drive: AWD, warranty: W3 },

  'r8-v10-spyder': {
    engine: '5.2 L / 5203 cm³',
    power: '540 a.g.',
    drive: 'Daimi tam çəkimli quattro, mexaniki bloklaşan diferensial, ASR dartma',
    warranty: W3,
  },
  'rs3-sedan': {
    engine: '2.5 L / 2480 cm³',
    power: '400 a.g.',
    drive:
      'Elektron tənzimlənən çoxdiskli muftalı daimi tam çəkimli quattro, elektron diferensial qapanması',
    warranty: W3,
  },
  
  'rs5-coupe': { engine: '2.9 L / 2894 cm³', power: '450 a.g.', drive: AWD, warranty: W3 },
}


export const panelInfo = (slug) => FAMILY_PANEL[slug] ?? {}
