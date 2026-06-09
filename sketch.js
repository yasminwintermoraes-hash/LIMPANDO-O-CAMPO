// Variáveis do Trator (Jogador)
let tratorX = 100;
let tratorY = 300;
let tratorVel = 4;

// Variáveis do Item Reciclável (Objetivo)
let itemX, itemY;
let itemColetado = true;

// Variáveis do Jogo
let pontuacao = 0;
let tela = 0; // 0: Menu, 1: Jogo, 2: Fim de Jogo

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (tela === 0) {
    mostraMenu();
  } else if (tela === 1) {
    jogaPartida();
  } else if (tela === 2) {
    mostraFim();
  }
}

// --- TELAS DO JOGO ---

function mostraMenu() {
  background(135, 206, 235); // Céu azul
  
  // Gramado do menu
  fill(34, 139, 34);
  rect(0, 250, 600, 150);
  
  // Título do Projeto Agrinho
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("PROJETO AGRINHO", width / 2, 100);
  textSize(20);
  text("Sustentabilidade no Campo", width / 2, 140);
  
  // Botão Iniciar
  fill(255, 215, 0);
  rect(225, 180, 150, 50, 10);
  fill(0);
  text("JOGAR", width / 2, 212);
  
  // Instruções
  fill(255);
  textSize(14);
  text("Use as setas do teclado para mover o trator e coletar o lixo.", width / 2, 320);
}

function jogaPartida() {
  background(154, 205, 50); // Campo verde escuro
  
  // Desenha linhas da plantação ao fundo
  stroke(107, 142, 35);
  strokeWeight(5);
  for (let i = 0; i < width; i += 60) {
    line(i, 0, i, height);
  }
  noStroke();
  
  movimentaTrator();
  desenhaTrator(tratorX, tratorY);
  gerenciaItem();
  checaColisao();
  
  // Mostra Pontuação
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Pontos: " + pontuacao, 20, 30);
  
  // Condição de Vitória temporária
  if (pontuacao >= 10) {
    tela = 2;
  }
}

function mostraFim() {
  background(34, 139, 34);
  
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("Parabéns, Agrinho!", width / 2, 150);
  textSize(20);
  text("Você limpou o campo com sucesso!", width / 2, 200);
  
  // Botão Reiniciar
  fill(255, 215, 0);
  rect(225, 250, 150, 50, 10);
  fill(0);
  text("Recomeçar", width / 2, 282);
}

// --- FUNÇÕES DE APOIO ---

function movimentaTrator() {
  if (keyIsDown(LEFT_ARROW) && tratorX > 20) tratorX -= tratorVel;
  if (keyIsDown(RIGHT_ARROW) && tratorX < width - 40) tratorX += tratorVel;
  if (keyIsDown(UP_ARROW) && tratorY > 20) tratorY -= tratorVel;
  if (keyIsDown(DOWN_ARROW) && tratorY < height - 30) tratorY += tratorVel;
}

function desenhaTrator(x, y) {
  // Corpo do Trator (Verde)
  fill(0, 100, 0);
  rect(x, y, 40, 25, 5);
  // Cabine (Amarela)
  fill(255, 223, 0);
  rect(x + 20, y - 15, 18, 20);
  // Rodas (Pretas)
  fill(0);
  ellipse(x + 8, y + 23, 16, 16);
  ellipse(x + 32, y + 23, 20, 20);
}

function gerenciaItem() {
  if (itemColetado) {
    itemX = random(50, width - 50);
    itemY = random(50, height - 50);
    itemColetado = false;
  }
  
  // Garrafa plástica (Lixo a ser coletado)
  fill(0, 191, 255);
  rect(itemX, itemY, 10, 20, 3);
  fill(255);
  rect(itemX + 2, itemY - 4, 6, 5);
}

function checaColisao() {
  // Distância simplificada entre o trator e o item
  let d = dist(tratorX + 20, tratorY + 10, itemX + 5, itemY + 10);
  if (d < 25) {
    pontuacao++;
    itemColetado = true;
  }
}

function mousePressed() {
  // Cliques de botão para navegar nas telas
  if (tela === 0) {
    if (mouseX > 225 && mouseX < 375 && mouseY > 180 && mouseY < 230) {
      tela = 1;
      pontuacao = 0;
    }
  } else if (tela === 2) {
    if (mouseX > 225 && mouseX < 375 && mouseY > 250 && mouseY < 300) {
      tela = 0;
      tratorX = 100;
      tratorY = 300;
    }
  }
}
