import React from "react";

const CheckBox = ({ checkGenres, setCheckGenres }) => {
  const genres = ["Commercial", "Production", "Motion", "Events"];
  const handleIsChecked = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckGenres([...checkGenres, value]);
    } else {
      setCheckGenres(checkGenres.filter((item) => item !== value));
    }
  };
  return (
    <div className="d-flex gap-4">
      <span>Genres:</span>
      <div className="d-flex flex-row justify-content-between gap-3">
        {genres.map((genre) => (
          <label htmlFor={genre.toLocaleLowerCase()}>
            <input
              type="checkbox"
              name={genre.toLocaleLowerCase()}
              value={genre.toLocaleLowerCase()}
              onChange={handleIsChecked}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBox;
