import styles from "./Mapbox.module.css";
import { useMapbox } from "./useMapbox";

export const Map = () => {
  const { ref } = useMapbox();

  return <div ref={ref} className={styles.map} />;
};
