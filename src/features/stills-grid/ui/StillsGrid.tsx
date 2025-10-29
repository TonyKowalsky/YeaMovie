import { useEffect, useState } from "react";
import styles from "./StillsGrid.module.css";
import { useGetMovieStillsQuery } from "@/entities/movie";
import { StillsModal } from "./StillsModal";

interface StillsGridProps {
  id: number;
  maxPreviews?: number;
}

const StillsGrid = ({ id, maxPreviews = 6 }: StillsGridProps) => {
  const { data, isLoading, isError } = useGetMovieStillsQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStill, setCurrentStill] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setCurrentStill(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextStill = () => {
    setCurrentStill(prev => (prev + 1) % stills.length);
  };

  const prevStill = () => {
    setCurrentStill(prev => (prev - 1 + stills.length) % stills.length);
  };

  if (isError || !data)
    return (
      <section className={styles.error}>Ошибка при загрузке кадров...</section>
    );
  const stills = data.items;
  if (stills.length === 0)
    return <section className={styles.error}>Нет кадров для превью.</section>;

  return (
    <>
      {isLoading ? (
        <div>Загрузка кадров...</div>
      ) : (
        <section>
          <div className={styles.title}>
            <button className={styles.button} onClick={() => openModal(0)}>
              Кадры из фильма
            </button>
          </div>
          <div className={styles.stills}>
            {stills.slice(0, maxPreviews).map((still, i) => (
              <div className={styles.stillWrapper} key={still.imageUrl}>
                <img
                  loading="lazy"
                  className={styles.still}
                  src={still.imageUrl}
                  alt={`Кадр ${i + 1} из фильма`}
                  onClick={() => openModal(i)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {isModalOpen && (
        <StillsModal
          stills={stills}
          currentStill={currentStill}
          closeModal={closeModal}
          prevStill={prevStill}
          nextStill={nextStill}
        />
      )}
    </>
  );
};

export default StillsGrid;
