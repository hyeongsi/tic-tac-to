import { shallow } from "zustand/shallow";
import { useGameStore } from "../../store/useGameStore"

export default function Square(mark: string) {
    function marking() {
        // selector로 여러 개 묶으면 매 렌더마다 새 객체 생성
        // 그래서 이전과 이후의 참조값이 달라져 매번 store 값 변경하면 재랜더링 되게 됨
        // 해결: shallow 옵션 추가
        const { players, board } = useGameStore((state) => ({
            players: state.players,
            board: state.board,
        }), shallow);
    }


    return (<button onClick={marking}>{mark}</button>);
}