import { useState } from 'react';
import LineasMatricesPotenciales from '../components/administration/LineasMatricesPotenciales';
import AreasTematicas from '../components/administration/AreasTematicas';
import Investigadores from '../components/administration/Investigadores';

interface AdministrationProps {
  title?: string;
}

const Administration: React.FC<AdministrationProps> = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Líneas Matrices / Potenciales',
    'Áreas Temáticas',
    'Usuarios'
  ];

  return (
    <div className="w-full pt-4">
            <nav className="">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 text-base ${
                activeTab === index
                  ? "text-[#3B82F6]"
                  : "text-[#6B7280] hover:text-[#374151]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4">
        {activeTab === 0 && (
          <div>
            <LineasMatricesPotenciales />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <AreasTematicas />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <Investigadores />
          </div>
        )}
      </div>
    </div>
  );
};

export default Administration;
