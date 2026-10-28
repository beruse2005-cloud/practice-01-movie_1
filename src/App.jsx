import { useState } from "react";
import styles from "./App.module.css";

function App() {
    const genres = ["액션", "코미디", "드라마", "SF", "공포", "멜로"];
    const ratings = ["5", "4", "3", "2", "1"];

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState(genres[0]);
    const [rating, setRating] = useState(ratings[0]);

    const [movies, setMovies] = useState([]);

    const handleChangeTitle = event => setTitle(event.target.value);

    const handleChangeGenre = event => setGenre(event.target.value);

    const handleChangeRating = event => setRating(event.target.value);

    const handleOnSubmit = event => {
        event.preventDefault();

        // 저장하지 말아야 되는 상황에 대한 처리
        const parseTitle = title.trim();
        if (parseTitle === "") {
            return;
        }

        const newMovie = {
            title: parseTitle, // key와 value의 스펠링이 달라서 써줘야 됨
            genre, // key와 value의 스펠링이 같으면 생략 가능
            rating,
            watched: false,
        };

        setMovies([...movies, newMovie]);
        setTitle("");
        setGenre(genres[0]);
        setRating(ratings[0]);
    };

    const handleToggleWatched = index => {
        // setMovies를 통해 새로운 배열을 저장해야 하니까
        const newMovies = movies.map((movie, i) => {
            if (index !== i) {
                return movie;
            }
            return { ...movie, watched: !movie.watched };
        });
        setMovies(newMovies);
    };

    const handleDelete = index => {
        const newMovies = movies.filter((movie, i) => i !== index);
        setMovies(newMovies);
    };

    // const totalWatched = movies.filter((movie) => movie.watched).length;
    const totalWatched = movies.reduce((sum, item) => {
        return item.watched ? sum + 1 : sum;
    }, 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>나의 영화 기록장</h2>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>영화 추가</legend>
                <form className={styles.form} onSubmit={handleOnSubmit}>
                    <input
                        className={styles.input}
                        placeholder={"영화 제목"}
                        onChange={handleChangeTitle}
                    />
                    <select className={styles.select} onChange={handleChangeGenre}>
                        {genres.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <select className={styles.selectTo} onChange={handleChangeRating} >
                        {ratings.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    별점 {item}점
                                </option>
                            );
                        })}
                    </select>
                    <button className={styles.submitButton} type={"submit"}>추가</button>
                </form>
            </fieldset>
            <h3 className={styles.titleText}>
                전체 {movies.length}편 / 감상 완료 {totalWatched}편
            </h3>
            <div className={styles.movieContainer}>
                {movies.map((item, index) => {
                    return (
                        <div
                            className={`${styles.containerBox} ${item.watched ? styles.watched : ""}`}>
                            <h4 className={styles.movieTitle}>{item.title}</h4>
                            <div className={styles.movieGenre}>장르: {item.genre}</div>
                            <div className={styles.movieRating}>
                                {"★".repeat(Number(item.rating)) +
                                    "☆".repeat(5 - Number(item.rating))}
                            </div>
                            <label className={styles.watchedLabel}>
                                <input
                                    type={"checkbox"}
                                    checked={item.watched}
                                    onChange={() => {
                                        handleToggleWatched(index);
                                    }}
                                />{" "}
                                감상완료
                            </label>
                            <div>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        handleDelete(index);
                                    }}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
