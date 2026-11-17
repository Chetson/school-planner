import { useState } from 'react';

import type { TabItem, TabsProps } from './lib/types';

export const Tabs = <Id, Item extends TabItem<Id>>({
  tabs = [],
  active,
  className,
  onChange,
}: TabsProps<Id, Item>) => {
  const [activeTab, setActiveTab] = useState<TabItem<Id>>(active || tabs?.[0]);

  const handleTabClick = (newTab: TabItem<Id>) => {
    if (newTab?.id !== activeTab?.id) {
      setActiveTab(newTab);
      onChange?.(newTab);
    }
  };

  return (
    <nav className={className}>
      <div className="flex justify-start">
        <div className="flex gap-x-1 rounded-lg bg-gray-100">
          {tabs.map((tab: TabItem<Id>) => (
            <button
              key={String(tab.id)}
              className={`rounded-lg py-2 px-3 ease-in duration-150 active:bg-button-primary-tap ${activeTab?.id === tab.id ? 'bg-button-primary-default text-button-tertiary-default hover:bg-button-primary-hover' : 'hover:bg-gray-200'}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <section key={String(activeTab?.id)}>{activeTab?.content}</section>
    </nav>
  );
};
