const img2base64=(img)=>{
	const getBase64Image=(img)=>{  
     var canvas = document.createElement("canvas");  
     canvas.width = img.width;  
     canvas.height = img.height;  
     var ctx = canvas.getContext("2d");  
     ctx.drawImage(img, 0, 0, img.width, img.height);  
     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
     var dataURL = canvas.toDataURL("image/"+ext).substring(22);  
     return dataURL;  
}
var image = new Image();  
image.src = img;  
image.setAttribute('crossOrigin', 'anonymous'); //允许图片跨域请求、必须后台也允许
image.onload = ()=>{  
  var base64 = getBase64Image(image);  
}
return getBase64Image(image);
}
export default img2base64;
