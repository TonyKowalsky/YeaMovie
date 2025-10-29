import type { Still } from "@/entities/movie";
import styles from "./StillsModal.module.css";

interface StillsModalProps {
  stills: Still[];
  currentStill: number;
  closeModal: () => void;
  prevStill: () => void;
  nextStill: () => void;
}

export const StillsModal = ({
  stills,
  currentStill,
  closeModal,
  prevStill,
  nextStill,
}: StillsModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.close}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={prevStill}
          >
            &lt;
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={nextStill}
          >
            &gt;
          </button>
        </div>
        <img
          key={stills[currentStill].imageUrl}
          src={stills[currentStill].imageUrl}
          alt={`Кадр ${currentStill + 1} из ${stills.length}`}
          className={styles.modalImage}
        />
        <div className={styles.counter}>
          {currentStill + 1} из {stills.length}
        </div>
      </div>
    </div>
  );
};
