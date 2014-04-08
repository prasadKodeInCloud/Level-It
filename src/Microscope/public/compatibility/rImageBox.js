

function RImageBox(src,onImageLoadcallback){
	
  var imageObj = new Image();
	imageObj.src = src;
  imageObj.onload = onImageLoadcallback(imageObj);
    //imageObj.src = "http://1.bp.blogspot.com/-iIkJT9x-Tmc/TsmnUI4A7LI/AAAAAAAACkg/c82_sYZjAV8/s1600/AngryBirds_by_jocelynC+%252811%2529.png";
    //imageObj.src = "http://icons.iconarchive.com/icons/femfoyou/angry-birds/512/angry-bird-red-icon.png";
    
    
}