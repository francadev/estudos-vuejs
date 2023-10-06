new Vue({
    el: '#app',
    data:{
        playerLife: 100,
        monsterLife: 100,
        running: false,
        textBtn: 'INICIAR JOGO',
        pAttackMonster: 'Monstro atingiu o jogador com ',
        pAttackPlayer: 'Jogador atingiu o monstro com ',
        pCuraJogador: 'Jogador ganhou força de ',
        listLogs: []
    },
    computed:{
        hasResult(){
            return this.playerLife==0 || this.monsterLife==0
        }
    },
    methods:{
        newGame(){
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.listLogs = []
        },
        quitGame(){
            this.running = false;
            this.textBtn = 'INICIAR NOVO JOGO'
            this.playerLife = 0 
        },
        attack(especial){   
            attackPlayer = this.getRandom(5,10) + especial
            attackMonster = this.getRandom(8,13)

            console.log(attackPlayer)
            console.log(attackMonster)

            if(this.playerLife - attackMonster <= 0){
                this.playerLife = 0
                this.running = false;
                this.listLogs.unshift({ text: this.pAttackMonster + attackMonster, css: 'ataqueMonstro' });
            }else{
                this.playerLife -= attackMonster
                this.listLogs.unshift({ text: this.pAttackMonster + attackMonster, css: 'ataqueMonstro' });
            }

            if(this.monsterLife - attackPlayer <= 0){
                this.monsterLife = 0
                this.running = false;
                this.listLogs.unshift({ text: this.pAttackPlayer + attackPlayer, css: 'ataquePlayer' });
            }else{
                this.monsterLife -= attackPlayer
                this.listLogs.unshift({ text: this.pAttackPlayer + attackPlayer, css: 'ataquePlayer' });
            }
        },
        healing(){
            healPlayer = this.getRandom(8,13)
            attackMonster = this.getRandom(6,16)
            
            this.listLogs.unshift({ text: this.pAttackMonster + attackMonster, css: 'ataqueMonstro' });
            this.listLogs.unshift({ text: this.pCuraJogador + healPlayer, css:'cura' });

            if(this.playerLife + healPlayer >= 100){
                this.playerLife = 100
            }else{
                this.playerLife += healPlayer
            }

            if(this.playerLife - attackMonster <= 0){
                this.playerLife = 0
                this.running = false;
            }else{
                this.playerLife -= attackMonster
            }
        },
        getRandom(max, min){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
    }
})