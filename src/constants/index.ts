interface INAV {
  name: string;
  path: string;
  icon: string;
}

export const SIDENAVITEM: INAV[] = [
  {
    name: 'Transaction',
    path: '/',
    icon: './svg/ic-transaction.svg',
  },
  {
    name: 'Product',
    path: '/product',
    icon: './svg/ic-product.svg',
  },
];


export const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
