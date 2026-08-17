
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
reservarAsiento(matriz, 6, 2); // Should reserve the seat
reservarAsiento(matriz, 7, 2);
current_state(matriz);

// funcion to add validation

function validation_seat(matriz: number[][]): number {
    for (let r = 0; r < matriz.length; r++) {
        for (let c = 0; c < matriz[r].length; c++) {
            if (matriz[r][c] !== 0 && matriz[r][c] !== 1) {
                return r * matriz[r].length + c; // Return the index of the invalid seat
            }
        }
    }
    return -1; // All seats are valid
}

console.log(validation_seat(matriz))

// function to count seats are occupied and free
function count_seats(matriz: number[][]) : {occupied: number; free: number}{
  let occupied = 0;
  let free = 0;

  for (let r=0; r < matriz.length; r++){
    for (let c = 0; c< matriz[r].length; c++){
      if (matriz[r][c] === 1){
        occupied++;
      } else if (matriz[r][c] ===0){
        free++;
      }
    }
  }
  return {occupied, free}
}

let seatCount = count_seats(matriz);
console.log(`Asientos ocupados: ${seatCount.occupied}, asientos libres: ${seatCount.free}`)

// Interfaz para devolver las posiciones de manera estructurada
interface ParAsientosAdyacentes {
    row: number;
    col1: number;
    col2: number;
}


function buscarDosAsientosAdyacentes(matriz: number[][]): ParAsientosAdyacentes | null {
    if (matriz.length === 0 || matriz[0].length === 0) {
        console.log("No se encontraron asientos adyacentes: la sala está vacía o es inválida.");
        return null;
    }

    // Recorremos fila por fila (de arriba a abajo)
    for (let r = 0; r < matriz.length; r++) {
        // Recorremos las columnas hasta la penúltima (para poder comparar con c + 1)
        for (let c = 0; c < matriz[r].length - 1; c++) {
            // Si el asiento actual y el siguiente en la misma fila están libres (0)
            if (matriz[r][c] === 0 && matriz[r][c + 1] === 0) {
                console.log(`Éxito: Se encontraron dos asientos adyacentes libres en la fila ${r}, columnas ${c} y ${c + 1}.`);
                return { row: r, col1: c, col2: c + 1 };
            }
        }
    }

    // Si el bucle termina sin retornar, no hay pares adyacentes
    console.log("No se encontraron dos asientos adyacentes disponibles en la misma fila.");
    return null;
}

console.log("\n--- Búsqueda de asientos adyacentes (Escenario 1: Sí hay) ---");
const resultado1 = buscarDosAsientosAdyacentes(matriz);
console.log("Resultado devuelto:", resultado1);

console.log("\n--- Búsqueda de asientos adyacentes (Escenario 2: Llenamos la sala para probar el fallo) ---");
// Llenamos toda la matriz para forzar que no haya asientos adyacentes libres
for (let r = 0; r < matriz.length; r++) {
    for (let c = 0; c < matriz[r].length; c++) {
        matriz[r][c] = 1;
    }
}

const resultado2 = buscarDosAsientosAdyacentes(matriz);
console.log("Resultado devuelto:", resultado2);


export {};
