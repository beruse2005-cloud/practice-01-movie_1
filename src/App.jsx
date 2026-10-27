import { useState } from "react";

function App() {
    // 입력값을 관리하는 state
    const [title, setTitle] = useState(""); // 영화 제목
    const [genre, setGenre] = useState("액션"); // 장르 (기본값 액션)
    const [rating, setRating] = useState("3"); // 별점 (기본값 별점 3점)

    // 영화 목록을 관리하는 state (초기 데이터 없음)
    const [movieList, setMovieList] = useState([]);

    // 영화 추가 핸들러 (handleSubmit)
    const handleSubmit = (e) => {
        e.preventDefault();

        // title에 글자가 비어있거나 공백만 있는 경우 저장 방지
        if (title.trim() === "") {
            return;
        }

        // 새로운 영화 객체 생성
        const newMovie = {
            title: title,
            genre: genre,
            rating: Number(rating), // 별점 숫자로 변환 저장
            completed: false, // 감상 완료 여부 초기값
        };

        // 새로운 array를 만들어 movieList 갱신
        setMovieList([...movieList, newMovie]);

        // 인풋 값 초기화
        setTitle("");
        setGenre("액션");
        setRating("3");
    };

    // 영화 삭제 핸들러 (handleDeleteMovie)
    const handleDeleteMovie = (index) => {
        const updatedList = movieList.filter((item, i) => i !== index);
        setMovieList(updatedList);
    };

    // 감상 완료 토글 핸들러 (handleToggleMovie)
    const handleToggleMovie = (index) => {
        const updatedList = movieList.map((movie, i) => {
            if (i === index) {
                return { ...movie, completed: !movie.completed };
            }
            return movie;
        });
        setMovieList(updatedList);
    };

    // 전체 영화 수 및 감상 완료 수 계산
    const totalCount = movieList.length;
    const completedCount = movieList.filter((movie) => movie.completed).length;

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <h2>나의 영화 기록장</h2>

            {/* 영화 추가 박스 컨테이너 */}
            <fieldset
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "15px",
                    marginBottom: "20px",
                }}
            >
                <legend style={{ padding: "0 5px", fontSize: "14px" }}>영화 추가</legend>

                {/* 인풋, 셀렉트, 버튼들이 나란히 붙어있도록 구성 */}
                <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="영화 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "160px" }}
                    />

                    {/* 장르 선택 select */}
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="액션">액션</option>
                        <option value="드라마">드라마</option>
                        <option value="코미디">코미디</option>
                        <option value="SF">SF</option>
                        <option value="공포">공포</option>
                    </select>

                    {/* 별점 선택 select */}
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="1">별점 1점</option>
                        <option value="2">별점 2점</option>
                        <option value="3">별점 3점</option>
                        <option value="4">별점 4점</option>
                        <option value="5">별점 5점</option>
                    </select>

                    <button type="submit" style={{ padding: "4px 8px", cursor: "pointer" }}>
                        추가
                    </button>
                </form>
            </fieldset>

            {/* 상단 통계 영역 */}
            <h3 style={{ marginBottom: "25px" }}>
                전체 {totalCount}편 / 감상 완료 {completedCount}편
            </h3>

            {/* 영화 카드 목록 영역 (안내 문구 여백 분리) */}
            {movieList.length === 0 ? (
                <p style={{ color: "#333", marginTop: "30px" }}>아직 등록된 영화가 없습니다.</p>
            ) : (
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {movieList.map((movie, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "20px",
                                width: "200px",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                // 체크했을 때 카드 전체 요소가 블라인드(흐림/배경색 변경) 처리되도록 수정
                                opacity: movie.completed ? 0.7 : 1,
                                backgroundColor: movie.completed ? "#f9f9f9" : "#ffffff",
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
                            {/* 체크 완료 시 제목, 장르, 별점 영역만 흐려지도록 블라인드 처리 */}
                            <div style={{ opacity: movie.completed ? 0.8 : 1, transition: "opacity 0.2s" }}>
                                <h4 style={{ margin: "0 0 10px 0" }}>{movie.title}</h4>
                                <p style={{ margin: "5px 0" }}>장르: {movie.genre}</p>
                                <p style={{ margin: "5px 0" }}>
                                    {"★".repeat(movie.rating)}
                                    {"☆".repeat(5 - movie.rating)}
                                </p>
                            </div>

                            {/* 감상 완료 체크박스 및 토글 */}
                            <div style={{ margin: "10px 0" }}>
                                <label style={{ cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={movie.completed}
                                        onChange={() => handleToggleMovie(index)}
                                        style={{ marginRight: "5px" }}
                                    />
                                    감상 완료
                                </label>
                            </div>

                            <button
                                onClick={() => handleDeleteMovie(index)}
                                style={{ padding: "2px 8px", cursor: "pointer" }}
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;