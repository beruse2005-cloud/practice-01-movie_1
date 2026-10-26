import React, { useState } from "react";

function App() {
    // 입력값을 관리하는 state
    const [title, setTitle] = useState(""); // 영화 제목
    const [genre, setGenre] = useState("액션"); // 장르 (기본값 액션)
    const [rating, setRating] = useState("3"); // 별점 (기본값 3점)

    // 영화 목록을 관리하는 state (초기 데이터를 빈 배열로 설정)
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
            rating: Number(rating), // 별점을 숫자로 변환하여 저장
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
        const updatedList = movieList.filter((_, i) => i !== index);
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
        <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
            <h2>나의 영화 기록장</h2>

            {/* 영화 추가 폼 */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
                <input
                    type="text"
                    placeholder="영화 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                />

                {/* 장르 선택 select 태그 */}
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                >
                    <option value="액션">액션</option>
                    <option value="드라마">드라마</option>
                    <option value="SF">SF</option>
                    <option value="코미디">코미디</option>
                </select>

                {/* 별점 선택 select 태그 */}
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                >
                    <option value="3">별점 3점</option>
                    <option value="5">별점 5점</option>
                    <option value="4">별점 4점</option>
                    <option value="2">별점 2점</option>
                    <option value="1">별점 1점</option>
                </select>

                <button type="submit" style={{ padding: "5px 10px" }}>추가</button>
            </form>

            {/* 상단 통계 영역 */}
            <h3>
                전체 {totalCount}편 / 감상 완료 {completedCount}편
            </h3>

            {/* 영화 카드 목록 영역 (데이터가 없을 때와 있을 때 조건부 렌더링) */}
            {movieList.length === 0 ? (
                <p style={{ color: "#666", marginTop: "20px" }}>아직 등록된 영화가 없습니다.</p>
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
                                // 감상 완료(completed가 true)일 때 투명도를 낮추고 배경색을 주어 블라인드 처리
                                opacity: movie.completed ? 0.4 : 1,
                                backgroundColor: movie.completed ? "#f1f1f1" : "#ffffff",
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
                            <h4 style={{ margin: "0 0 10px 0" }}>{movie.title}</h4>
                            <p style={{ margin: "5px 0" }}>장르: {movie.genre}</p>
                            <p style={{ margin: "5px 0" }}>
                                {"★".repeat(movie.rating)}
                                {"☆".repeat(5 - movie.rating)}
                            </p>

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
                                key={`btn-${index}`}
                                onClick={() => handleDeleteMovie(index)}
                                style={{ padding: "3px 8px", cursor: "pointer" }}
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