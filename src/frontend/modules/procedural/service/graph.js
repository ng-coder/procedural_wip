(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('graphService',['config', (config) => {
    const canvasSize = config.boardSize * config.boardResolution;
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = canvasSize;
    ctx.canvas.height = canvasSize;
    const service = {
      drawGrid: drawGrid,
      drawArea: drawArea,
      drawMap: drawMap,
      clearMap: clearMap,
      drawObject: drawObject
    };
    return service;
    
    function drawGrid() {
      for (let i = 0; i <= canvasSize; i = i + config.boardResolution){
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvasSize);
        ctx.moveTo(0,i);
        ctx.lineTo(canvasSize,i);
      }
      ctx.stroke();
    }
    
    function drawArea(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect (x, y, config.boardResolution, config.boardResolution);
    }
    
    function drawMap(mapArray, mapColor) {
      for (let i in mapArray) {
        for(let j in mapArray[i]) {
          if (mapArray[i][j] === 1) {
            drawArea(i * config.boardResolution, j * config.boardResolution, mapColor);
          }
        }
      }
    }
    
    function drawObject(position, mapId, key) {
      const start = mapId === 0 ? 1 : 0;
      if (key === 'gate') {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "bold 20px Arial";
        for (let i = start; i < position.length; i++) {
          ctx.fillText( 'A' + i ,position[i][0] * config.boardResolution + 2 , position[i][1] * config.boardResolution + 18);
        }
      }
      
      if (key === 'player') {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "bold 20px Arial";
        ctx.fillText( '@' ,position[0] * config.boardResolution + 2 , position[1] * config.boardResolution + 18);
      }
      
    }
    
    function clearMap() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }]);
})();
