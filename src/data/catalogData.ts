export interface CatalogItem {
  id: string;
  nameKey: string; // Used for i18n
  icon?: string;
  subcategories?: CatalogItem[];
}

export const catalogData: CatalogItem[] = [
  {
    id: 'oa',
    nameKey: 'cat_oa',
    /*
    subcategories: [
      { id: 'desk', nameKey: 'subcat_desk' },
      { id: 'chair', nameKey: 'subcat_chair' }
    ]
    */
  },
  {
    id: 'handtools',
    nameKey: 'cat_handtools',
    /*
    subcategories: [
      { id: 'wrench', nameKey: 'subcat_wrench' },
      { id: 'socket', nameKey: 'subcat_socket' },
      { id: 'pliers', nameKey: 'subcat_pliers' }
    ]
    */
  },
  {
    id: 'powertools',
    nameKey: 'cat_powertools',
    /*
    subcategories: [
      { id: 'screwdriver', nameKey: 'subcat_screwdriver' },
      { id: 'drill', nameKey: 'subcat_drill' },
      { id: 'grinder', nameKey: 'subcat_grinder' }
    ]
    */
  },
  {
    id: 'fasteners',
    nameKey: 'cat_fasteners'
  },
  {
    id: 'building',
    nameKey: 'cat_building'
  },
  {
    id: 'water',
    nameKey: 'cat_water'
  },
  {
    id: 'electric',
    nameKey: 'cat_electric',
    /*
    subcategories: [
      { id: 'multimeter', nameKey: 'subcat_multimeter' },
      { id: 'wire', nameKey: 'subcat_wire' }
    ]
    */
  },
  {
    id: 'house',
    nameKey: 'cat_house'
  },
  {
    id: 'metal',
    nameKey: 'cat_metal'
  },
  {
    id: 'garden',
    nameKey: 'cat_garden'
  },
  {
    id: 'safety',
    nameKey: 'cat_safety'
  },
  {
    id: 'clean',
    nameKey: 'cat_clean'
  },
  {
    id: 'life',
    nameKey: 'cat_life'
  },
  {
    id: 'stationery',
    nameKey: 'cat_stationery'
  },
  {
    id: 'protect',
    nameKey: 'cat_protect'
  },
  {
    id: 'machine',
    nameKey: 'cat_machine',
    subcategories: [
      { id: 'A', nameKey: 'subcat_machine_a' },
      { id: 'B', nameKey: 'subcat_machine_b' },
      { id: 'C', nameKey: 'subcat_machine_c' },
      { id: 'D', nameKey: 'subcat_machine_d' },
      { id: 'E', nameKey: 'subcat_machine_e' },
      { id: 'F', nameKey: 'subcat_machine_f' },
      { id: 'G', nameKey: 'subcat_machine_g' },
      { id: 'H', nameKey: 'subcat_machine_h' }
    ]
  }
];
