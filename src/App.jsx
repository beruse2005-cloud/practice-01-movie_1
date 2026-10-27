import {useState} from "react";

function App() {
    const genres = ["액션", "코미디", "드라마", "SF", "공포", "멜로"];
    const ratings = ["5", "4", "3", "2", "1"];

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState(genres[0]);
    const [rating, setRating] = useState(ratings[0]);

    const [movies, setMovies] = useState([]);

    const handleChangeTitle = (event) => setTitle(event.target.value);

    const handleChangeGenre = (event) => setGenre(event.target.value);

    const handleChangeRating = (event) => setRating(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // 저장하지 말아야 되는 상황에 대한 처리
        const parseTitle = title.trim();
        if (parseTitle === "") {
            return;
        }

        const newMovie = {
            title: parseTitle,    // key와 value의 스펠링이 달라서 써줘야 됨
            genre,                // key와 value의 스펠링이 같으면 생략 가능
            rating,
            watched: false,
        }

        setMovies([...movies, newMovie]);
        setTitle("");
        setGenre(genres[0]);
        setRating(ratings[0]);
    }

    return <>
        <h2>나의 영화 기록장</h2>
        <fieldset>
            <legend>영화 추가</legend>
            <form onSubmit={handleOnSubmit}>
                <input
                    placeholder={"영화 제목"}
                    onChange={handleChangeTitle}
                    value={title}
                />
                <select
                    onChange={handleChangeGenre}
                    value={genre}
                >
                    {genres.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
                <select
                    onChange={handleChangeRating}
                    value={rating}
                >
                    {ratings.map((item, index) => {
                        return <option key={index} value={item}>별점 {item}점</option>
                    })}
                </select>
                <button type={"submit"}>추가</button>
            </form>
        </fieldset>
        <h3>전체 0편 / 감상 완료 0편</h3>
        <div>
            <div>
                <h4>위키드</h4>
                <div>장르: 드라마</div>
                <div>★★★★★</div>
                <label>
                    <input type={"checkbox"}/> 감상완료
                </label>
                <div>
                    <button>삭제</button>
                </div>
            </div>
        </div>
    </>
}

export default App;