const cell = document.querySelectorAll('.cell');
        const statusText = document.getElementById('status');
        const restart = document.getElementById('restart');
        const win_aeraO = document.getElementById('winO');
        const win_aeraX = document.getElementById('winX');


        win_aeraO.style.display = 'none';
        win_aeraX.style.display = 'none';

        let board = ["","","","","","","","",""];
        let currentPlayer = "O";
        let win = false;

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        function main(){
            cell.forEach(cell => cell.addEventListener('click',cell_click));
            restart.addEventListener('click',restart_game);
            statusText.textContent = `輪到 ${currentPlayer}`;
            win_aeraO.addEventListener('click',change);
            win_aeraX.addEventListener('click',change);
        }

        function cell_click(e){
            let c = e.target;
            let cIndex = c.getAttribute('data-index');

            if(board[cIndex] != "" || win){
                return;
            }

            board[cIndex] = currentPlayer;
            c.textContent = currentPlayer;
            c.style.color = currentPlayer === "O" ? "blue":"red";
            check_win();
        }

        function check_win(){
            for(let i = 0;i < winConditions.length;i ++){
                let [a,b,c] = winConditions[i];
                if(board[a] && board[a] === board[b] && board[b] === board[c]){
                    win = true;
                    statusText.textContent = `玩家${currentPlayer}獲勝！`;
                    alreadyWin(currentPlayer);
                    setTimeout(restart_game, 1000);
                    return;
                }
            }
            if(!board.includes("")){
                statusText.textContent = `平手~`;
                win = true;
                return;
            }
            if(!win){
                currentPlayer = currentPlayer === "O" ? "X" : "O";
                statusText.textContent = `輪到 ${currentPlayer}`;
            }
        }

        function restart_game(){
            currentPlayer = "O";
            board = ["","","","","","","","",""];
            win = false;
            cell.forEach(cell => {
                cell.textContent = "";
            });
            statusText.textContent = `輪到 ${currentPlayer}`;
            win_aeraO.classList.remove('slide-in');
            win_aeraX.classList.remove('slide-in');
        }

        function alreadyWin(c){
            if(c === "O"){
                win_aeraO.classList.add('slide-in');
            }
            else{
                win_aeraX.classList.add('slide-in');
            }
        }

        function change(){
            restart_game();
        }
        main();
