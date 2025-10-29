import { useTheme } from "@/shared/lib";
import styles from "./PopularTabs.module.css";
import type { Collections } from "@/entities/movie";
import type { Tab } from "../model/types";

interface PopularTabsProps {
  tabs: Tab[];
  activeTab: Collections;
}

const PopularTabs = ({ tabs, activeTab }: PopularTabsProps) => {
  const { isDark } = useTheme();

  return (
    <div role="tablist" className={`${styles.tabs} ${isDark ? "dark" : ""}`}>
      {tabs.map(tab => (
        <button
          role="tab"
          type="button"
          key={tab.type}
          className={`${styles.button} ${
            activeTab === tab.type ? styles.active : ""
          }`}
          onClick={tab.onClick}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default PopularTabs;
