'use client';

import { SIDENAVITEM } from '@/constants';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const SideBar: React.FC = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="px-[41px] flex items-center h-[104px] gap-20">
      <Image width={120} height={50} src={'/product-logo.png'} alt="logo" />

      <div className='flex items-center gap-10'>
        {SIDENAVITEM.map((item, idx) => (
          <div
            key={idx + 'nav'}
            onClick={() => router.push(item?.path)}
            className={`flex text-white p-[12px] gap-[16px] w-[200px] ${
              item?.path === pathname ? 'bg-[#FFFFFF33]' : 'bg-transparent'
            } cursor-pointer`}
          >
            <Image width={20} height={20} src={item?.icon} alt="logo" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
