
if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}

console.log("Cinemateca");

// function to create a matriz 
function crearMatriz(rows: number, cols: number): number[][] {

    let matriz: number [][] = []
    for (let i=0; i < rows; i++){
        matriz[i] = []
    for (let j=0; j< cols; j++){
        matriz[i][j] = 0
    }
    }
return matriz;
}

// estado del cinema
function current_state(matriz: number[][]): void {
    if (matriz.length === 0 || matriz[0].length === 0) {
        console.log("Sala vacía.");
        return;
    }

    const rows = matriz.length;
    const cols = matriz[0].length;

    // Header with column numbers
    let header = "    ";
    for (let c = 0; c < cols; c++) {
        header += `${c.toString().padStart(2, " ")} `;
    }
    console.log(header);

    // Rows with row number + seat status (0 => L, 1 => X)
    for (let r = 0; r < rows; r++) {
        let line = `${r.toString().padStart(2, " ")} | `;
        for (let c = 0; c < cols; c++) {
            line += matriz[r][c] === 1 ? "X  " : "L  ";
        }
        console.log(line);
    }
}

// Example:
const matriz = crearMatriz(8, 10);
matriz[0][0] = 1;
matriz[2][4] = 1;
matriz[7][9] = 1;

current_state(matriz);



function reservarAsiento(matriz: number[][], row: number, col: number): boolean {
     if (matriz.length === 0 || matriz[0].length === 0) {
        console.log("Sala vacía.");
        return false;
    }
     // validate integer indices
    if (!Number.isInteger(row) || !Number.isInteger(col)) {
        console.log("Fila y columna deben ser números enteros.");
        return false;
    }

    // validate row and col within bounds
    if (row < 0 || row >= matriz.length || col < 0 || col >= matriz[0].length) {
        console.log("Fila o columna fuera de rango.");
        return false;
    }
    
    if (matriz[row][col] === 1) {
        console.log("Asiento ya reservado.");
        return false;
    } else {
        matriz[row][col] = 1;
        console.log(`Asiento ${row}-${col} reservado.`);
        return true;
    }
}

// Example
reservarAsiento(matriz, 6, 8); // reservas
reservarAsiento(matriz, 4, 6); // reserva
current_state(matriz);

export {};
