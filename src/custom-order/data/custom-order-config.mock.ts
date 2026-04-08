import {
  BuilderField,
  CustomOrderBuilderConfig,
  SelectOption,
} from '../types/custom-order.types';

const option = (
  value: string,
  label: string,
  priceDelta = 0,
): SelectOption => ({
  value,
  label,
  priceDelta,
});

const selectField = (
  key: string,
  label: string,
  options: SelectOption[],
): BuilderField => ({
  key,
  label,
  type: 'select',
  options,
  required: true,
});

const textField = (
  key: string,
  label: string,
  required = false,
): BuilderField => ({
  key,
  label,
  type: 'text',
  required,
});

const emailField = (key: string, label: string): BuilderField => ({
  key,
  label,
  type: 'email',
  required: true,
});

const selectWithComments = (
  key: string,
  label: string,
  options: SelectOption[],
): BuilderField[] => [
  selectField(key, label, options),
  textField(`${key}Comments`, `${label} - Comments`),
];

const yesNoOptions = [option('yes', 'Yes', 80), option('no', 'No', 0)];

const modelOptions = [
  option('arcadia', 'Arcadia', 0),
  option('revenant', 'Revenant', 250),
  option('sable', 'Sable', 380),
];

const bodyMaterialOptions = [
  option('swamp-ash', 'Swamp Ash', 0),
  option('mahogany', 'Mahogany', 160),
  option('alder', 'Alder', 120),
];

const topMaterialOptions = [
  option('none', 'No Top', 0),
  option('flamed-maple', 'Flamed Maple', 320),
  option('quilted-maple', 'Quilted Maple', 390),
];

const sublayerOptions = [
  option('none', 'None', 0),
  option('walnut', 'Walnut', 90),
  option('maple', 'Maple', 70),
];

const fretboardOptions = [
  option('ebony', 'Ebony', 0),
  option('rosewood', 'Rosewood', 60),
  option('maple', 'Maple', 40),
];

const neckMaterialOptions = [
  option('maple', 'Maple', 0),
  option('roasted-maple', 'Roasted Maple', 140),
  option('wenge', 'Wenge', 180),
];

const bindingOptions = [
  option('none', 'None', 0),
  option('black', 'Black', 70),
  option('cream', 'Cream', 70),
];

const inlayOptions = [
  option('dots', 'Dots', 0),
  option('blocks', 'Blocks', 120),
  option('custom', 'Custom', 250),
];

const markerOptions = [
  option('luminlay', 'Luminlay', 90),
  option('black-dots', 'Black Dots', 0),
  option('abalone', 'Abalone', 60),
];

const instrumentFields: BuilderField[] = [
  selectField('instrumentType', 'Instrument Type', [
    option('electric-guitar', 'Electric Guitar', 0),
    option('baritone-guitar', 'Baritone Guitar', 220),
    option('bass-vi', 'Bass VI', 310),
  ]),
  selectField('orientation', 'Orientation', [
    option('right-handed', 'Right Handed', 0),
    option('left-handed', 'Left Handed', 150),
  ]),
  selectField('stringNumber', 'String Number', [
    option('6', '6 Strings', 0),
    option('7', '7 Strings', 260),
    option('8', '8 Strings', 390),
  ]),
  selectField('scaleType', 'Scale Type', [
    option('standard', 'Standard', 0),
    option('multi-scale', 'Multi-Scale', 280),
    option('baritone', 'Baritone', 180),
  ]),
  selectField('scaleLength', 'Scale Length', [
    option('25-5', '25.5"', 0),
    option('24-75', '24.75"', 0),
    option('26-5', '26.5"', 140),
  ]),
  selectField('numberOfFrets', 'Number of Frets', [
    option('22', '22', 0),
    option('24', '24', 80),
    option('27', '27', 180),
  ]),
  selectField('buildConstruction', 'Build Construction', [
    option('bolt-on', 'Bolt-On', 0),
    option('set-neck', 'Set Neck', 210),
    option('neck-through', 'Neck Through', 480),
  ]),
  selectField('neckProfile', 'Neck Profile', [
    option('modern-c', 'Modern C', 0),
    option('thin-d', 'Thin D', 0),
    option('soft-v', 'Soft V', 40),
  ]),
  selectField('headstockType', 'Headstock Type', [
    option('inline-6', 'Inline 6', 0),
    option('3x3', '3x3', 50),
    option('custom', 'Custom', 140),
  ]),
  selectField('fretboardRadius', 'Fretboard Radius', [
    option('12', '12"', 0),
    option('14', '14"', 0),
    option('compound', 'Compound Radius', 160),
  ]),
  selectField('bodyChambering', 'Body Chambering', [
    option('solid', 'Solid Body', 0),
    option('semi-hollow', 'Semi-Hollow', 240),
    option('light-relief', 'Light Relief', 90),
  ]),
  selectField('topContouring', 'Top Contouring', [
    option('flat', 'Flat Top', 0),
    option('arm-bevel', 'Arm Bevel', 90),
    option('carved', 'Carved Top', 260),
  ]),
  selectField('trussRodAccess', 'Truss Rod Access', [
    option('headstock', 'Headstock', 0),
    option('heel', 'Heel', 40),
    option('spoke-wheel', 'Spoke Wheel', 110),
  ]),
  selectField('recessedJackAccessRoute', 'Recessed Jack Access Route', [
    option('side-jack', 'Side Jack', 0),
    option('top-jack', 'Top Jack', 40),
    option('football-plate', 'Football Plate', 15),
  ]),
];

const woodFields: BuilderField[] = [
  ...selectWithComments('bodyMaterial', 'Body Material', bodyMaterialOptions),
  ...selectWithComments('topMaterial', 'Top Material', topMaterialOptions),
  ...selectWithComments(
    'topSublayerMaterial',
    'Top Sublayer Material',
    sublayerOptions,
  ),
  ...selectWithComments(
    'fretboardMaterial',
    'Fretboard Material',
    fretboardOptions,
  ),
  ...selectWithComments(
    'fretboardSublayer',
    'Fretboard Sublayer',
    sublayerOptions,
  ),
  ...selectWithComments(
    'neckMaterialPrimary',
    'Neck Material (Primary)',
    neckMaterialOptions,
  ),
  ...selectWithComments('neckMaterialSecondary', 'Neck Material (Secondary)', [
    option('none', 'None', 0),
    option('walnut', 'Walnut', 75),
    option('purpleheart', 'Purpleheart', 95),
  ]),
  ...selectWithComments('neckMaterialLaminates', 'Neck Material (Laminates)', [
    option('none', 'None', 0),
    option('2-piece', '2 Piece', 0),
    option('5-piece', '5 Piece', 140),
  ]),
  ...selectWithComments(
    'headstockCapTop',
    'Headstock Cap - Top',
    topMaterialOptions,
  ),
  ...selectWithComments(
    'headstockCapTopSublayer',
    'Headstock Cap Top Sublayer',
    sublayerOptions,
  ),
  ...selectWithComments(
    'headstockCapBottom',
    'Headstock Cap - Bottom',
    topMaterialOptions,
  ),
  ...selectWithComments(
    'headstockCapBottomSublayer',
    'Headstock Cap Bottom Sublayer',
    sublayerOptions,
  ),
  ...selectWithComments('bodyBinding', 'Body Binding', bindingOptions),
  ...selectWithComments(
    'fretboardBinding',
    'Fretboard Binding',
    bindingOptions,
  ),
  ...selectWithComments(
    'headstockBinding',
    'Headstock Binding',
    bindingOptions,
  ),
  ...selectWithComments('headstockLogo', 'Headstock Logo', [
    option('silk', 'Silk Screen', 0),
    option('pearloid', 'Pearloid', 80),
    option('custom', 'Custom Logo', 190),
  ]),
  ...selectWithComments('fretboardInlay', 'Fretboard Inlay', inlayOptions),
  ...selectWithComments(
    'fretboardMarkersTop',
    'Fretboard Markers Top',
    markerOptions,
  ),
  ...selectWithComments(
    'fretboardMarkersSide',
    'Fretboard Markers Side',
    markerOptions,
  ),
];

const hardwareFields: BuilderField[] = [
  selectField('hardwareColour', 'Hardware colour', [
    option('black', 'Black', 0),
    option('chrome', 'Chrome', 0),
    option('gold', 'Gold', 140),
  ]),
  selectField('bridge', 'Bridge', [
    option('hardtail', 'Hardtail', 0),
    option('hipshot-trem', 'Hipshot Tremolo', 230),
    option('evertune', 'Evertune', 420),
  ]),
  selectField('tuners', 'Tuners', [
    option('locking', 'Locking Tuners', 0),
    option('gotoh', 'Gotoh Locking', 90),
    option('hipshot', 'Hipshot Grip-Lock', 120),
  ]),
  selectField('pickupSets', 'Pickup Sets (Bridge & Neck)', [
    option('bare-knuckle-set', 'Bare Knuckle Set', 0),
    option('fishman-set', 'Fishman Set', 160),
    option('lundgren-set', 'Lundgren Set', 220),
  ]),
  selectField('bridgePickupSingle', 'Bridge Pickup (Single)', [
    option('none', 'None', 0),
    option('humbucker', 'Humbucker', 0),
    option('single-coil', 'Single Coil', 0),
  ]),
  textField('bridgePickupSpecifyModel', 'Bridge Pickup (Specify Model)'),
  selectField('middlePickupSingle', 'Middle Pickup (Single)', [
    option('none', 'None', 0),
    option('single-coil', 'Single Coil', 80),
    option('stacked-single', 'Stacked Single', 110),
  ]),
  textField('middlePickupSpecifyModel', 'Middle Pickup (Specify Model)'),
  selectField('neckPickupSingle', 'Neck Pickup (Single)', [
    option('none', 'None', 0),
    option('humbucker', 'Humbucker', 0),
    option('single-coil', 'Single Coil', 0),
  ]),
  textField('neckPickupSpecifyModel', 'Neck Pickup (Specify Model)'),
  ...selectWithComments('wiringConfiguration', 'Wiring Configuration', [
    option('3-way', '3-Way', 0),
    option('5-way', '5-Way', 50),
    option('coil-split', 'Coil Split', 80),
  ]),
  selectField('powerSupply', 'Power Supply', [
    option('passive', 'Passive', 0),
    option('9v', '9V Active', 60),
    option('rechargeable', 'Rechargeable Pack', 140),
  ]),
  selectField('killswitch', 'Killswitch', yesNoOptions),
  selectField('killswitchLedColour', 'Killswitch - LED Colour', [
    option('none', 'None', 0),
    option('red', 'Red', 15),
    option('blue', 'Blue', 15),
  ]),
  selectField('fretwireMaterial', 'Fretwire Material', [
    option('nickel', 'Nickel Silver', 0),
    option('stainless', 'Stainless Steel', 180),
    option('gold', 'Gold EVO', 120),
  ]),
  selectField('straplocks', 'Straplocks', yesNoOptions),
  selectField('inputJack', 'Input Jack', [
    option('pure-tone', 'Pure Tone', 0),
    option('switchcraft', 'Switchcraft', 25),
    option('stereo', 'Stereo', 40),
  ]),
  selectField('controlKnobs', 'Control Knobs', [
    option('metal-dome', 'Metal Dome', 0),
    option('speed-knobs', 'Speed Knobs', 20),
    option('custom', 'Custom Knobs', 70),
  ]),
];

const finishFields: BuilderField[] = [
  ...selectWithComments('grainFill', 'Grain Fill', [
    option('clear', 'Clear', 0),
    option('black', 'Black', 45),
    option('natural', 'Natural', 25),
  ]),
  ...selectWithComments('finishStyle', 'Finish Style', [
    option('solid', 'Solid', 0),
    option('burst', 'Burst', 180),
    option('natural', 'Natural Satin', 120),
  ]),
  selectField('finish', 'Finish', [
    option('gloss', 'Gloss', 0),
    option('satin', 'Satin', 0),
    option('open-pore', 'Open Pore', 80),
  ]),
  selectField('case', 'Case', [
    option('gig-bag', 'Gig Bag', 0),
    option('hardcase', 'Hardcase', 180),
    option('flight-case', 'Flight Case', 320),
  ]),
  selectField('shipping', 'Shipping', [
    option('australia', 'Australia', 0),
    option('asia', 'Asia', 120),
    option('worldwide', 'Worldwide', 260),
  ]),
  selectField('tuning', 'Tuning', [
    option('standard', 'Standard', 0),
    option('drop-d', 'Drop D', 0),
    option('custom', 'Custom', 20),
  ]),
  selectField('stringGauges', 'String Gauges', [
    option('9-42', '9-42', 0),
    option('10-46', '10-46', 0),
    option('11-52', '11-52', 10),
  ]),
  selectField('paymentPlans', 'Payment Plans', [
    option('full', 'Full Payment', 0),
    option('50-50', '50/50 Split', 0),
    option('monthly', 'Monthly Plan', 80),
  ]),
  textField('discountCode', 'Discount Code'),
];

const personalDetailsFields: BuilderField[] = [
  textField('firstName', 'First Name', true),
  textField('lastName', 'Last Name', true),
  emailField('email', 'Email'),
  textField('country', 'Country', true),
  textField('streetAddress', 'Street Address', true),
  textField('city', 'City', true),
  textField('state', 'State', true),
  textField('postCode', 'Post Code', true),
];

export const customOrderBuilderConfig: CustomOrderBuilderConfig = {
  currency: 'AUD',
  totalEstimateCost: 7340,
  bodyDesigns: [
    {
      id: 'body-shape-orion',
      name: 'Orion',
      model: 'Arcadia',
      description: 'Balanced double-cut shape for versatile modern builds.',
    },
    {
      id: 'body-shape-vela',
      name: 'Vela',
      model: 'Revenant',
      description:
        'Offset silhouette with slightly more aggressive upper horn.',
    },
    {
      id: 'body-shape-noctis',
      name: 'Noctis',
      model: 'Sable',
      description:
        'Sharper carved profile for extended-range and metal-oriented builds.',
    },
  ],
  modelOptions,
  sections: [
    {
      key: 'instrument',
      title: 'Body Design & Core Build',
      subtitle: 'Choose your base instrument options.',
      totalEstimateCost: 2450,
      fields: instrumentFields,
    },
    {
      key: 'wood',
      title: 'Wood',
      subtitle: 'Choose your options.',
      totalEstimateCost: 3350,
      fields: woodFields,
    },
    {
      key: 'hardware',
      title: 'Hardware',
      subtitle: 'Choose your options.',
      totalEstimateCost: 5120,
      fields: hardwareFields,
    },
    {
      key: 'finish',
      title: 'Finish',
      subtitle: 'Choose your options.',
      totalEstimateCost: 6320,
      fields: finishFields,
    },
    {
      key: 'personal-details',
      title: 'Personal Details',
      subtitle: 'Please enter your contact information.',
      totalEstimateCost: 7340,
      fields: personalDetailsFields,
    },
  ],
};
