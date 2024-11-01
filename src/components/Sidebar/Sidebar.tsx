'use client';

import { SIDENAVITEM } from '@/constants';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const SideBar: React.FC = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="px-[20px]">
      <div className="flex justify-center mt-[25px]">
        <img src={'./product-logo.png'} alt="logo" />
      </div>

      <div className="h-[40px]" />
      {SIDENAVITEM.map((item, idx) => (
        <div
          key={idx + 'nav'}
          onClick={() => router.push(item?.path)}
          className={`flex text-white p-[12px] gap-[16px] ${
            item?.path === pathname ? 'bg-[#FFFFFF33]' : 'bg-transparent'
          } cursor-pointer`}
        >
          <img src={item?.icon} alt="transaction" />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
