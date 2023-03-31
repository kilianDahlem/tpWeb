
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'

  this.initX = 0;
  this.initY = 0;
  this.finalX = 0;
  this.finalY = 0;
  this.isClicked = false;
  this.interactor = interactor;

	// Developper les 3 fonctions gérant les événements
  this.mouseClick = function(evt) {
    var pos = getMousePosition(canvas, evt);
    this.initX = pos.x;
    this.initY = pos.y;
    this.isClicked = true;
    //console.log(pos);
    this.interactor.onInteractionStart(this);

  }.bind(this);

  this.mouseMove = function(evt) {
    if(this.isClicked){
      var pos = getMousePosition(canvas, evt);
      this.finalX = pos.x;
      this.finalY = pos.y;
      this.isClicked = true;
      //console.log(pos);
      this.interactor.onInteractionUpdate(this);
    }
  }.bind(this);

  this.mouseRelease = function(evt) {
    var pos = getMousePosition(canvas, evt);
    this.finalX = pos.x;
    this.finalY = pos.y;
    this.isClicked = false;
    //console.log(pos);
    this.interactor.onInteractionEnd(this);
  }.bind(this);

  canvas.addEventListener('mousedown', this.mouseClick, false);
  canvas.addEventListener('mousemove', this.mouseMove, false);
  canvas.addEventListener('mouseup', this.mouseRelease, false);
  // Associer les fonctions précédentes aux évènements du canvas.
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



