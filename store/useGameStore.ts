import { create } from "zustand/react";

// 사용자 타입
export type Player = {
    id: string;
    mark: "X" | "O";
}

// 게임 상태 타입
export type GameState = "idle" | "playing";

// 보드 타입 (3x3)
export type Board = Array<Array<"X" | "O" | null>>;

type TicTacToState = {
    players: Player[];              // 등록된 유저
    currentTurn: string | null;     // 현재 턴 유저 id
    gameState: GameState;           // 게임 상태
    board: Board;                   // 게임 보드

    //액션
    addPlayer: (player: Player) => void;
    startGame: () => void;
    nextTurn: () => void;
    resetGame: () => void;
    marking: (x: number, y: number, mark: "X" | "O") => boolean;
};

function createEmptyBoard(): Board {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
} 

function canAddPlayer(players: Player[]): boolean {
    return players.length < 2;
}

function canStartGame(players: Player[]): boolean {
    return players.length === 2;
}

function canMark(
    board: Board,
    gameState: GameState,
    row: number,
    col: number
): boolean {
    if (gameState !== "playing") return false;

    if (board.length <= row ||
        row < 0 ||
        board[row].length <= col ||
        col < 0) 
        return false;

    if (board[row][col] !== null) return false;

    return true;
}

function isGameFinished(board: Board): boolean {
    return false;
}


// Zustand는 set을 통해 상태를 업데이트할 때만 구독한 컴포넌트가 리렌더됨
// 그냥 객체 값 변경만 하면 React는 상태 변경을 인지하지 못함
export const useGameStore = create<TicTacToState>((set, get) => ({
    players: [],
    currentTurn: null,
    gameState: "idle",
    board: createEmptyBoard(),

    addPlayer: (newPlayer: Player): void => {
        const { players } = get();
        if (players.length >= 2) return;

        set({ players: [...players, newPlayer] });
    },

    startGame: (): void => {
        const { players } = get();
        if (players.length !== 2) return;

        set({ gameState: "playing", currentTurn: players[0].id, board: createEmptyBoard() });
    },

    nextTurn: (): void =>

        set((state) => {
            if (state.players.length === 2) {
                const nextPlayer = state.currentTurn === state.players[0].id ? state.players[1].id : state.players[0].id;
                return { currentTurn: nextPlayer };
            }
            return state;
        }),

    resetGame: (): void => set({ board: createEmptyBoard(), currentTurn: null, gameState: "idle", players: [] }),

    marking: (x, y, mark): boolean => {
        const { board, gameState } = get();

        if (board[y][x] != null) return false;
        if (gameState !== "playing") return false;

        set((state) => {
            const newBoard = state.board.map(
                (row, rowIndex) =>
                    row.map((cell, colIndex) => (rowIndex === y && colIndex === x ? mark : cell))
                );

            return { board: newBoard };
        })

        return true;
    },

}));
