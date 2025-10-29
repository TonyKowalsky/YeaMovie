import { memo } from "react";

interface InfoTableProps {
  genres: string | undefined;
  countries: string | undefined;
  year: number | undefined;
  directors: string;
  actors: string;
}

const InfoTable = ({
  genres,
  countries,
  year,
  directors,
  actors,
}: InfoTableProps) => {
  return (
    <tbody>
      <tr>
        <td>Жанр:</td>
        <td>{genres ?? "-"}</td>
      </tr>
      <tr>
        <td>Страна:</td>
        <td>{countries ?? "-"}</td>
      </tr>
      <tr>
        <td>Год:</td>
        <td>{year ?? "-"}</td>
      </tr>
      <tr>
        <td>Режиссер:</td>
        <td>{directors ?? "-"}</td>
      </tr>
      <tr>
        <td>В главных ролях:</td>
        <td>{actors ?? "-"}</td>
      </tr>
    </tbody>
  );
};

export default memo(InfoTable);
