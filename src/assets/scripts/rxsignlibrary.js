var RxSignLibrary = function() {

    var drawCanvas, textCanvas, imageCanvas;
    var drawctx, texctx, imgctx;
    var imageCanvasId = "";
    var drawCanvasid = "";
    var textCanvasid = "";


    var btextCanvasSet = false;
    var bdrawCanvasSet = false;
    var bimageCanvasSet = false;


    var maxwidth = 40;
    var maxheight = 40;

    var curpagescale = 1;

    var strokeColor = '#000000FF';
    var lineWidth = 1;


    var RxCore_GUI_Upload = undefined;


    var curnamerect = undefined;

    
    var tool;
    var tools = {};

    //create image from a clip section.
    var offscreenDraw = document.createElement('canvas');
    var offscrDrawctx;

    var offscreenText = document.createElement('canvas');
    var offscrTextctx;

    var offscreenImage = document.createElement('canvas');
    var offscrImagectx;



    var signaturedrawing = undefined;

    var bsinguploaddrawn = false;
    var bsingFontNamedrawn = false;
    var bsingFontInitdrawn = false;

    var fontArray = [];
    var selectedFont = 0;

    function downScaleCanvas(cv, scale) {
        if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
        var sqScale = scale * scale; // square scale = area of source pixel within target
        var sw = cv.width; // source image width
        var sh = cv.height; // source image height
        var tw = Math.ceil(sw * scale); // target image width
        var th = Math.ceil(sh * scale); // target image height
        var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
        var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
        var tX = 0, tY = 0; // rounded tx, ty
        var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
        // weight is weight of current source point within target.
        // next weight is weight of current source point within next target's point.
        var crossX = false; // does scaled px cross its current px right border ?
        var crossY = false; // does scaled px cross its current px bottom border ?
        var sBuffer = cv.getContext('2d').    
        getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
        var tBuffer = new Float32Array(4 * sw * sh); // target buffer Float32 rgb
        var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
        // untested !
        var sA = 0;  //source alpha    
    
        for (sy = 0; sy < sh; sy++) {
            ty = sy * scale; // y src position within target
            tY = 0 | ty;     // rounded : target pixel's y
            yIndex = 4 * tY * tw;  // line index within target array
            crossY = (tY != (0 | ty + scale)); 
            if (crossY) { // if pixel is crossing botton target pixel
                wy = (tY + 1 - ty); // weight of point within target pixel
                nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
            }
            for (sx = 0; sx < sw; sx++, sIndex += 4) {
                tx = sx * scale; // x src position within target
                tX = 0 |  tx;    // rounded : target pixel's x
                tIndex = yIndex + tX * 4; // target pixel index within target array
                crossX = (tX != (0 | tx + scale));
                if (crossX) { // if pixel is crossing target pixel's right
                    wx = (tX + 1 - tx); // weight of point within target pixel
                    nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
                }
                sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
                sG = sBuffer[sIndex + 1];
                sB = sBuffer[sIndex + 2];
                sA = sBuffer[sIndex + 3];
                
                if (!crossX && !crossY) { // pixel does not cross
                    // just add components weighted by squared scale.
                    tBuffer[tIndex    ] += sR * sqScale;
                    tBuffer[tIndex + 1] += sG * sqScale;
                    tBuffer[tIndex + 2] += sB * sqScale;
                    tBuffer[tIndex + 3] += sA * sqScale;
                } else if (crossX && !crossY) { // cross on X only
                    w = wx * scale;
                    // add weighted component for current px
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    tBuffer[tIndex + 3] += sA * w;
                    // add weighted component for next (tX+1) px                
                    nw = nwx * scale
                    tBuffer[tIndex + 4] += sR * nw; // not 3
                    tBuffer[tIndex + 5] += sG * nw; // not 4
                    tBuffer[tIndex + 6] += sB * nw; // not 5
                    tBuffer[tIndex + 7] += sA * nw; // not 6
                } else if (crossY && !crossX) { // cross on Y only
                    w = wy * scale;
                    // add weighted component for current px
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    tBuffer[tIndex + 3] += sA * w;
                    // add weighted component for next (tY+1) px                
                    nw = nwy * scale
                    tBuffer[tIndex + 4 * tw    ] += sR * nw; // *4, not 3
                    tBuffer[tIndex + 4 * tw + 1] += sG * nw; // *4, not 3
                    tBuffer[tIndex + 4 * tw + 2] += sB * nw; // *4, not 3
                    tBuffer[tIndex + 4 * tw + 3] += sA * nw; // *4, not 3
                } else { // crosses both x and y : four target points involved
                    // add weighted component for current px
                    w = wx * wy;
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    tBuffer[tIndex + 3] += sA * w;
                    // for tX + 1; tY px
                    nw = nwx * wy;
                    tBuffer[tIndex + 4] += sR * nw; // same for x
                    tBuffer[tIndex + 5] += sG * nw;
                    tBuffer[tIndex + 6] += sB * nw;
                    tBuffer[tIndex + 7] += sA * nw;
                    // for tX ; tY + 1 px
                    nw = wx * nwy;
                    tBuffer[tIndex + 4 * tw    ] += sR * nw; // same for mul
                    tBuffer[tIndex + 4 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 4 * tw + 2] += sB * nw;
                    tBuffer[tIndex + 4 * tw + 3] += sA * nw;
                    // for tX + 1 ; tY +1 px
                    nw = nwx * nwy;
                    tBuffer[tIndex + 4 * tw + 4] += sR * nw; // same for both x and y
                    tBuffer[tIndex + 4 * tw + 5] += sG * nw;
                    tBuffer[tIndex + 4 * tw + 6] += sB * nw;
                    tBuffer[tIndex + 4 * tw + 7] += sA * nw;
                }
            } // end for sx 
        } // end for sy
    
        // create result canvas
        var resCV = document.createElement('canvas');
        resCV.width = tw;
        resCV.height = th;
        var resCtx = resCV.getContext('2d');
        
        //setSmoothingEnabledEx(false, resCtx);
    
        var imgRes = resCtx.getImageData(0, 0, tw, th);
        var tByteBuffer = imgRes.data;
        // convert float32 array into a UInt8Clamped Array
        var pxIndex = 0; //  
        for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 4, tIndex += 4, pxIndex++) {
            tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
            tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
            tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
            tByteBuffer[tIndex + 3] = Math.ceil(tBuffer[sIndex + 3]);
        }
        // writing result to canvas.
        resCtx.putImageData(imgRes, 0, 0);
        sBuffer = null;
        tByteBuffer = null;
        tBuffer = null;
        return resCV;
    }
    

    class signObject {
        constructor() {



            var signobject = this;

            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.xoffset = 0;
            this.yoffset = 0;

            this.linewidth = lineWidth;
            this.strokecolor = strokeColor;

            this.pointlist = [];
            this.points = [];


            this.drawme = function (ctx) {


                var linewidthlocal = this.linewidth;

                ctx.save();

                ctx.lineWidth = linewidthlocal;
                ctx.strokeStyle = this.strokecolor;
                //this.GetLinestyle(markupobject.linestyle, ctx, 1);

                
                ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
                ctx.stroke();
                ctx.restore();

            };

            this.saveme = function(){

                //var offscreenDraw = document.createElement('canvas');
                offscreenDraw.width = this.w - this.x;
                offscreenDraw.height = this.h - this.y;

                this.xoffset = this.x;
                this.yoffset = this.y;
    

                //var offscrDrawctx;
                offscrDrawctx = offscreenDraw.getContext('2d');

                offscrDrawctx.clearRect(0, 0, offscreenDraw.width, offscreenDraw.height);

                this.drawmescaled(offscrDrawctx);

                signaturedrawing = signobject;


                //offscrDrawctx.lineWidth = this.linewidth;

                //offscrDrawctx.strokeStyle = this.strokecolor;
            
                //signaturedrawing = signobject;
            };

            this.drawmescaled = function(ctx){


                var linewidthScaled = this.linewidth;


                var counter = 0;
                var lcounter = 0;

                var xscalepoint = 0;
                var yscalepoint = 0;


                ctx.save();

                ctx.strokeStyle = this.strokecolor;
                ctx.lineWidth = linewidthScaled;
                //markupobject.GetLinestyle(markupobject.linestyle, ctx, markupobject.fixedscaleFactor);

                ctx.beginPath();
                for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                    for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                        xscalepoint = (this.pointlist[lcounter][counter].x - this.xoffset);
                        yscalepoint = (this.pointlist[lcounter][counter].y - this.yoffset);
                        //xscalepoint = (this.points[counter].x - this.xoffset) * scalefactor;
                        //yscalepoint = (this.points[counter].y - this.yoffset) * scalefactor;

                        if (counter == 0) {
                            ctx.moveTo(xscalepoint, yscalepoint);
                        }
                        else {
                            ctx.lineTo(xscalepoint, yscalepoint);
                        }
                    }
                }
                ctx.stroke();
                ctx.restore();

            };

            this.addpoint = function (x, y) {
                //this.points.push(new point(x, y));
                this.points.push({ x: x, y: y });
            };

            
            this.addline = function () {
                this.pointlist.push(signobject.points);
                this.points = [];
                //this.points.push(new point(x, y));
            };

            this.startdraw = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            };

            this.removepoints = function (){

                this.pointlist = [];
                this.points = [];
    
            };


            this.findrectangle = function () {
                var counter = 0;
                var lcounter = 0;

                var minx = this.pointlist[0][0].x;
                var miny = this.pointlist[0][0].y;
                var maxx = this.pointlist[0][0].x;
                var maxy = this.pointlist[0][0].y;

                for (lcounter = 0; lcounter < this.pointlist.length; lcounter++) {
                    for (counter = 0; counter < this.pointlist[lcounter].length; counter++) {
                        if (this.pointlist[lcounter][counter].x < minx) {
                            minx = this.pointlist[lcounter][counter].x;
                        }
                        if (this.pointlist[lcounter][counter].y < miny) {
                            miny = this.pointlist[lcounter][counter].y;
                        }
                        if (this.pointlist[lcounter][counter].x > maxx) {
                            maxx = this.pointlist[lcounter][counter].x;
                        }
                        if (this.pointlist[lcounter][counter].y > maxy) {
                            maxy = this.pointlist[lcounter][counter].y;
                        }
                    }
                }


                this.x = minx;
                this.y = miny;
                this.w = maxx;
                this.h = maxy;

                this.xscaled = this.x;
                this.yscaled = this.y;
                this.wscaled = this.w;
                this.hscaled = this.h;

                if (this.type == 0 && !this.origset) {
                    
                    this.origx = minx;
                    this.origy = miny;
                    this.origw = maxx;
                    this.origh = maxy;

                    this.origset = true;
                    //store original rect here
                }


                //alert(x);
            };




        }

    }


    class Rx_GUIUpload {
        constructor(callback) {
            var scope = this;
            this.callback = callback;
            this.progress = 0;
            this.connect = function (callback) {
                scope.callback = callback;
            };
            this.setUpload = function () {
                if (typeof scope.callback === "function") {
                    scope.callback();
                }
            };
        }
    }

    function img_update() {
        //drawctx.drawImage(canvas, 0, 0);
        //context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function signFreepen(selected) {

        if (selected) {
            set_tool('pencil');
            
        } else {
            if(tool.name == 'pencil' && tool.started){
                tool.apply();
            }
            
            //set_tool('markupedit', {p1 : false});
            
        }

    }

    function uploadSignImage(selected){

        if (selected) {
            //set_tool('pencil');
            set_tool('uploadSign');
        }else{

        }

        //uploadSign
    }


    function setCanvasDraw(canvid){

        if(document.getElementById(canvid).clientWidth == 0 || document.getElementById(canvid).clientHeight == 0){
            return;
        }
        
        if(bdrawCanvasSet){
            return;
        }


        drawCanvas = document.getElementById(canvid);

        drawCanvasid = canvid;
        //var imageCanvasId = "";
        //var drawCanvasid = "";
        //var textCanvasid = "";

        
        const cwidth = drawCanvas.clientWidth;
        const cheight = drawCanvas.clientHeight;

        drawCanvas.width = cwidth;
        drawCanvas.height = cheight;

        drawctx = drawCanvas.getContext('2d');

        bdrawCanvasSet = true;


    }

    function setCanvasText(canvid){
        

        if(document.getElementById(canvid).clientWidth == 0 || document.getElementById(canvid).clientHeight == 0){
            return;
        }
        
        if(btextCanvasSet){
            return;
        }

        //var btextCanvasSet = false;
        //var bdrawCanvasSet = false;
        //var bimageCanvasSet = false;
    

        textCanvas = document.getElementById(canvid);
        textCanvasid = canvid;

        //var imageCanvasId = "";
        //var drawCanvasid = "";
        //var textCanvasid = "";


        const cwidth = textCanvas.clientWidth;
        const cheight = textCanvas.clientHeight;

        textCanvas.width = cwidth;
        textCanvas.height = cheight;


        texctx = textCanvas.getContext('2d');
        btextCanvasSet = true;


    }

    function drawUploadText(ctx, sztext, font, size, w, h){

        ctx.save();


        //setFont(fontArray[selectedFont].name, fontArray[selectedFont].size);
        setFont(ctx,  font, size);

        var dimsel = ctx.measureText(sztext);
        var textwidth = dimsel.width;
        //var topoffset = dimsel.actualBoundingBoxAscent;

        var centerx = (w * 0.5) - (textwidth *0.5);
        var centery = (h * 0.5) + (size * 0.5);
        
        
        var rect = {x : centerx, y : centery, w : textwidth, h : size};

        //texctx.font = fontArray[selectedFont].size + "px" + fontArray[selectedFont].name; // set font

        if(sztext != ""){
            ctx.fillText(sztext, rect.x, rect.y);
            //copysignText(textCanvas, rect);
            //getoffscreencanvas(rect).fillText(signName.value, 0, topoffset);
            //signctx.fillText(signName.value, 10, 70);
        }
        ctx.restore();

    }

    function setCanvasImage(canvid){

        if(document.getElementById(canvid).clientWidth == 0 || document.getElementById(canvid).clientHeight == 0){
            return;
        }
        
        if(bimageCanvasSet){
            return;
        }

        //var btextCanvasSet = false;
        //var bdrawCanvasSet = false;
        //var bimageCanvasSet = false;

        
        imageCanvas = document.getElementById(canvid);

        imageCanvasId = canvid;



        const cwidth = imageCanvas.clientWidth;
        const cheight = imageCanvas.clientHeight;

        imageCanvas.width = cwidth;
        imageCanvas.height = cheight;


        imgctx = imageCanvas.getContext('2d');

        //Select Image File


        //drawUploadText(imgctx, "Select Image File", "Verdana", 14, cwidth, cheight);

        //draw click to upload text.



        
        bimageCanvasSet = true;

    }
    
    function setFontSize(szname, nsize) {


        for(var i = 0; i < fontArray.length; i++){
            if(fontArray[i].name == szname){
                fontArray[i].size = nsize;
            }
        }

    }
    function getfonts(){

        return fontArray;

    }

    function selectFont(num){

        selectedFont = num;
    }

    function addFont(szname, szurl, style, nsize, szelement, szlistsize){


        var newFont = new FontFace(szname, szurl, style);
        //var PrimeraSignature = new FontFace('PrimeraSignature', 'url(./assets/fonts/PrimeraSignature-ALLy7.ttf)', { style: 'normal', weight: 700 });

        var selectelement = document.getElementById(szelement);

        //signctx.font = "70px PrimeraSignature"; // set font


        newFont.load().then(function(font) {
            // loaded_face holds the loaded FontFace
            //signctx.t
            
            document.fonts.add(font);
            fontArray.push({name : szname, size : nsize});


            selectelement.style.fontFamily = szname;
            selectelement.style.fontSize = szlistsize;

            //var seltext = "Style " + nfontselnum;
            //selectelement.innerText = seltext;

            
            //$scope.textRectStyle['font-family'] = fs.currentFont.font;
            //$scope.textRectStyle['font-size'] = size;


            //var fontArray = [];

           

        }).catch(function(error) {
            // error occurred
        });

        

    }

    function getTextSigncanvas(){
        
       
        return {cnv : offscreenText, width : offscreenText.width, height : offscreenText.height};
    }

    function getDrawSigncanvas(){
        return {cnv : offscreenDraw, width : offscreenDraw.width, height : offscreenDraw.height};
    }

    function getImageSigncanvas(){

        return {cnv : offscreenImage, width : offscreenImage.width, height : offscreenImage.height};
        //var offscreenImage = document.createElement('canvas');
        //var offscrImagectx;
    
    }

    function getoffscreencanvas(rect){

        offscreenText.width = rect.w;
        offscreenText.height = rect.h;

        //offscreenText.style.border = "1px solid #0000FF";

        offscrTextctx = offscreenText.getContext('2d');

        //offscrTextctx.strokeRect(0,0,rect.w,rect.h);

        offscrTextctx.fillStyle = strokeColor;
        setFont(offscrTextctx,  fontArray[selectedFont].name, fontArray[selectedFont].size);

        offscrTextctx.textBaseline = "bottom";


        return offscrTextctx;

        
    }

    function fileSelected(element) {
        uploadFile(element);
    }


    function copysignText(rect){

        offscreenText.width = rect.w;
        offscreenText.height = rect.h;

        offscrTextctx = offscreenText.getContext('2d');



        //offscrTextctx.drawImage(sourcecnv, rect.x, rect.y,rect.w,rect.h);
        
        


        //offscreenText = document.createElement('canvas');
        //offscrTextctx;
    

    }

    function clearcanvas(szcanvas){


        //var imageCanvasId = "";
        //var drawCanvasid = "";
        //var textCanvasid = "";

        //var imageCanvasId = "";
         //var drawCanvasid = "";
        //var textCanvasid = "";

        //var bsinguploaddrawn = false;
        //var bsingFontNamedrawn = false;
        //var bsingFontInitdrawn = false;
    

        if(szcanvas == imageCanvasId){
            imgctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            bsinguploaddrawn = false;

            //drawUploadText(imgctx, "Select Image File", "Verdana", 14, imageCanvas.width, imageCanvas.height);

        }else if(szcanvas == drawCanvasid){
            drawctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

            //offscrDrawctx = offscreenDraw.getContext('2d');

            if(tool.name == 'pencil' && tool.started){
                tool.clearpoints();
            }

            //signaturedrawing.removepoints();
            //signaturedrawing.saveme();

            
        }else if(szcanvas == textCanvasid){
            texctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
            bsingFontNamedrawn  = false;
            bsingFontInitdrawn = false;
        }


    

        
    }


    function drawsigninit(signInit, x, y){

        if(bsingFontInitdrawn){
            return;
        }


        //texctx.font = fontArray[selectedFont].size + "px" + fontArray[selectedFont].name; // set font

        texctx.save();

        setFont(texctx,  fontArray[selectedFont].name, fontArray[selectedFont].size);

        var dimsel = texctx.measureText(signInit.value);
        var textwidth = dimsel.width;
        
        var rect = {x : x, y : y, w : textwidth, h : fontArray[selectedFont].size};

        if (curnamerect != undefined){
            x = curnamerect.x + curnamerect.w + 20;
        }


        //var offscreenText;
        //var offscrTextctx;
    

        if(signInit.value != ""){
            texctx.fillStyle = strokeColor;
            texctx.fillText(signInit.value, x, y);

            //getoffscreencanvas().fillText(signInit.value, 0, 0);
            
            //copysignText(textCanvas, rect);

            bsingFontInitdrawn = true;
            //signctx.fillText(signInit.value, 300, 70);
        }
        texctx.restore();
        
    }

    function drawsignName(signName, x, y){

        if(bsingFontNamedrawn){
            return;
        }

          /*textCanvas = document.getElementById(canvid);

          const cwidth = textCanvas.clientWidth;
          const cheight = textCanvas.clientHeight;
  
          textCanvas.width = cwidth;
          textCanvas.height = cheight;
  
  
          texctx = textCanvas.getContext('2d');*/

        //  function setFont(fontname, size)
        
        texctx.save();


        //setFont(fontArray[selectedFont].name, fontArray[selectedFont].size);
        setFont(texctx,  fontArray[selectedFont].name, fontArray[selectedFont].size);

        var dimsel = texctx.measureText(signName.value);
        var textwidth = dimsel.width;
        var topoffset = dimsel.fontBoundingBoxAscent;
        var bottomoffset = dimsel.fontBoundingBoxDescent;
        
        
        
               
        
        var rect = {x : x, y : y, w : textwidth, h : topoffset + bottomoffset};

        curnamerect = rect;

        //texctx.font = fontArray[selectedFont].size + "px" + fontArray[selectedFont].name; // set font

        if(signName.value != ""){
            texctx.fillStyle = strokeColor;
            texctx.fillText(signName.value, x, y);
            //copysignText(textCanvas, rect);

            
            getoffscreencanvas(rect).fillText(signName.value, 0, rect.h);
            bsingFontNamedrawn = true;
            //signctx.fillText(signName.value, 10, 70);
        }
        texctx.restore();

  
    }

    function setMaxSize(w,h){
        maxwidth = w;
        maxheight = h;
    }

    function setPageScale(dScale){
        curpagescale = dScale;
    }

    function getmaxsizeScaled(){
        return {w : maxwidth * curpagescale, h : maxheight * curpagescale};
    }

    function readImageDirect(file){

        //var tgt = evt.target || window.event.srcElement, files = tgt.files;
        
        // FileReader support
        if (FileReader && file) {
            var fr = new FileReader();

            fr.onload = function () {
                
                //draw to canvas here.

                drawSignUpload(fr.result, 10, 20);
                //document.getElementById(outImage).src = fr.result;


            }
            fr.readAsDataURL(file);
        }
    
        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }



    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        var file = document.getElementById('SignToUpload').files[0];

        var urifilename = encodeURI(file.name);
        //var openfile = UploadServerfolderd + file.name;
        //hideUploadDialog();
        /*if (RxCore_GUI_Upload != undefined) {
            RxCore_GUI_Upload.setUpload("hide");
        }*/
        /*if (RxCore_GUI_Download != undefined) {
            RxCore_GUI_Download.setDownload("show");
        }*/

        //var urifilename = encodeURI(openfile);
        var openfileobj = {filename: openfile, displayname : null};

        //getFile(openfileobj);
        
        //set_tool('markupedit', {p1 : false});
        
        //alert(evt.target.responseText);
    }

    function uploadProgress(evt) {
        if (evt.lengthComputable) {
            //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            //showUploadDialog();
            /*if (RxCore_GUI_Upload != undefined) {
                RxCore_GUI_Upload.setUpload(Math.round(evt.loaded * 100 / evt.total));

            }*/
            console.log(Math.round(evt.loaded * 100 / evt.total));
            /*document.getElementById('progressbar').value = Math.round(evt.loaded * 100 / evt.total); //percentComplete;//.toString() + '%';
            if (document.getElementById('progressbar').value == 100) {
                document.getElementById('progressbar').value = 0;
                //hideUploadDialog();

            }*/
        } else {
            //document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }


    function uploadCanvasClick(callback){

        if (typeof callback === "function") {
            callback();
        }

    }

    function uploadFile(element) {
        //var fd = new FormData();
        if(element){
            var file = element.files[0];
        }
        


        readImageDirect(file);
        

        /*eventlist = [
            {event : "progress", func : uploadProgress, bupload : true},
            {event : "load", func : uploadComplete},
            {event : "error", func : uploadFailed},
            {event : "abort", func : uploadCanceled}
        ];

        sendHttpRequestwevents('POST', FileuploadURL + "&" + UploadServerfolder + "&" + file.name + "&" + file.lastModified + "&" + file.size, '', eventlist, file);*/


    }

    //SignatureLib.checkButtonstate(document.getElementById("inputName"), document.getElementById("inputInitials"),  document.getElementById("adoptsignbtn"));

    function checkButtonstate(inputnameelement, inputinitialelement, adoptbuttonelement){

        var retvalue = false;
        var bsignNameEmpty = (inputnameelement.value == "");
        var bsignInitEmpty = (inputinitialelement.value == "");

        //var adptsignbtn = document.getElementById("adoptsignbtn");

        //SignatureLib.checkButtonstate(document.getElementById("inputName"), document.getElementById("inputInitials"),  document.getElementById("adoptsignbtn"));

        if(bsignNameEmpty ||  bsignInitEmpty){
          
            adoptbuttonelement.setAttribute("disabled", "");
          //adptsignbtn.removeAttribute("disabled");

          retvalue = false;
          
        }else{

            adoptbuttonelement.removeAttribute("disabled");

            retvalue = true;

            //SignatureLib.setCanvasText("fontsign");
            //drawsignFont();


          
        }
        return retvalue;


    }

    function drawSignUpload(imagesource, x, y){

        if(bsinguploaddrawn){
          return;
        }


        /*drawCanvas = document.getElementById(canvid);
        
        const cwidth = drawCanvas.clientWidth;
        const cheight = drawCanvas.clientHeight;

        drawCanvas.width = cwidth;
        drawCanvas.height = cheight;

        drawctx = drawCanvas.getContext('2d');*/


        //var signimageCanvas =  document.getElementById("imagesign");
        //var signimagectx = signimageCanvas.getContext('2d');

        var signimg = new Image();

        //var offscreenImage = document.createElement('canvas');


        //var offscrImagectx;
    
      
        signimg.onload = function (ev){
          //dropdata.width = 203;
          //dropdata.height = 88;

          //naturalHeight: 88
          //naturalWidth: 203

          offscreenImage.width = signimg.naturalWidth;
          offscreenImage.height = signimg.naturalHeight;

          offscrImagectx = offscreenImage.getContext('2d');
          offscrImagectx.drawImage(signimg, 0,0);

          imgctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

          imgctx.drawImage(signimg, x, y);
          bsinguploaddrawn = true;

          //signimagectx.drawImage(signimage, 10, 70, imagewidth, imageheight);

        }
        //signimg.src = "./images/fsingnatur.png";
        signimg.src = imagesource;

    }


    function setFont(ctx, fontname, size){

        ctx.font = size + "px " + fontname; // set font
    }

    /*function drawsignFont(szfullName, szInitial){

        

        if(szInitial != ""){
            texctx.fillText(szInitial, 100, 50);
        }


    }*/

    function getMousePos(canvas, evt) {
        
        var rect = canvas.getBoundingClientRect();
        
        return {
            x:evt.clientX - rect.left,
            y:evt.clientY - rect.top,
            xpadding:evt.clientX - rect.left,
            ypadding:evt.clientY - rect.top,
            busepadding : false
        };
    }

    function set_tool(toolname){


        //for (var i = 0; i < params.keys(obj).length; i++);
        if (tool){
            if(tool.name == 'pencil' && tool.started){
                tool.apply();
            }

        }

        tool = new tools[toolname]();

    }


    function ev_canvas(ev) {
        //var touch_event = document.getElementById('shape');
        if (ev.layerX || ev.layerY == 0) { // Firefox
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetY == 0) { // Opera
            ev._x = ev.offsetX;
            ev._y = ev.offsetY;
        }

        //touch_event.value = ev.type;
        if (tool == undefined) {
            return;
        }
        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
            func(ev);
        }
    }


    function initialize() {

        if(drawCanvas != undefined){
            /*Chrome etc */
            drawCanvas.addEventListener('mousemove', ev_canvas, false);
            drawCanvas.addEventListener('mousedown', ev_canvas, false);
            drawCanvas.addEventListener('mouseup', ev_canvas, false);
            drawCanvas.addEventListener('mouseout', ev_canvas, false);
            drawCanvas.addEventListener("dblclick", ev_canvas, false);

            /*Touch devices */
            drawCanvas.addEventListener("touchstart", ev_canvas, false);
            drawCanvas.addEventListener("touchmove", ev_canvas, true);
            drawCanvas.addEventListener("touchend", ev_canvas, false);
            drawCanvas.addEventListener("touchcancel", ev_canvas, false);
            drawCanvas.addEventListener("dbltap", ev_canvas, false);

        }

        if(textCanvas != undefined){
        }
        
        if(imageCanvas != undefined){

            //$("#fileToUpload").click();

            /*Chrome etc */

            imageCanvas.addEventListener('mousedown', ev_canvas, false);
            imageCanvas.addEventListener('mousemove', ev_canvas, false);

            /*Touch devices */
            imageCanvas.addEventListener("touchstart", ev_canvas, false);
        }

        // The drawing pencil.

        tools.uploadSign = function(){


            //ev.target.style.cursor = 'pointer';    
            

            this.mousedown = function (ev) {
                
                ev.preventDefault();


                if(RxCore_GUI_Upload != undefined){

                    RxCore_GUI_Upload.setUpload();
                }

                
                //uploadCanvasClick();
                //uploadFile();

            };

            this.mousemove = function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                
                ev.target.style.cursor = 'pointer';

            };

            this.touchstart = function (ev) {
                ev.preventDefault();
                //uploadFile();
                //uploadCanvasClick();

                if(RxCore_GUI_Upload != undefined){
                    RxCore_GUI_Upload.setUpload();
                }


            };


        };
        
        tools.pencil = function () {
            var tool = this;
            this.started = false;
            this.name = 'pencil';

            this.draw = false;

            //ft 08.08.2018 changed from separate index to direct array length                
            //var curmarkup = DocObj.nummarkups;
            //var curmarkup = DocObj.markuplist.length;
            var pencilmarkupobj;
            var numlines = 0;
            //var subtype = params.p1



            this.newpencil = function(mousePos){

                pencilmarkupobj = new signObject();

                pencilmarkupobj.x = mousePos.x;
                pencilmarkupobj.y = mousePos.y;

                

            };

            // This is called when you start holding down the mouse button.
            // This starts the pencil drawing.

            this.mousedown = function (ev) {

                var mousePos = getMousePos(drawCanvas, ev);


                tool.draw = true;

                if (numlines == 0){

                    tool.newpencil(mousePos);
                    tool.started = true;

                    pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                    
                    pencilmarkupobj.startdraw(drawctx);


                }else{
                    pencilmarkupobj.addline();
                    tool.started = true;
                    
                    pencilmarkupobj.addpoint(mousePos.x, mousePos.y);

                    pencilmarkupobj.startdraw(drawctx);

                }
                numlines++;

            };


            // This function is called every time you move the mouse. Obviously, it only
            // draws if the tool.started state is set to true (when you are holding down
            // the mouse button).
            this.mousemove = function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                ev.target.style.cursor = 'crosshair';
                var mousePos = getMousePos(drawCanvas, ev);

                if (tool.started && tool.draw) {
                    pencilmarkupobj.addpoint(mousePos.x, mousePos.y);
                    pencilmarkupobj.drawme(drawctx);
                    //context.lineTo(ev._x, ev._y);
                    //context.stroke();
                }
            };


            // This is called when you release the mouse button.
            this.mouseup = function (ev) {
                ev.preventDefault();
                tool.draw = false;
            };

            this.touchstart = function (ev) {
                ev.preventDefault();
                tool.draw = true;
                var touchPos = getTouchPos(drawCanvas, ev, 0);
                if (numlines == 0){

                    tool.newpencil(touchPos);
                    tool.started = true;
                    pencilmarkupobj.addpoint(touchPos.x, touchPos.y);

                    pencilmarkupobj.startdraw(drawctx);


                }else{
                    pencilmarkupobj.addline();
                    tool.started = true;
                    pencilmarkupobj.addpoint(touchPos.x, touchPos.y);

                    pencilmarkupobj.startdraw(drawctx);

                }
                numlines++;


                

            };
            this.touchmove = function (ev) {
                ev.preventDefault();
                if (tool.started && tool.draw) {
                    var touchPos = getTouchPos(drawCanvas, ev, 0);
                    pencilmarkupobj.addpoint(touchPos.x, touchPos.y);
                    pencilmarkupobj.drawme(drawctx);

                    //context.lineTo(, );
                    //context.stroke();
                }
            };
            this.touchcancel = function(ev){
                ev.preventDefault();
                tool.draw = false;
            };

            this.touchend = function (ev) {
                ev.preventDefault();
                tool.draw = false;
            };

            this.clearpoints = function(){
                
                pencilmarkupobj.removepoints();
                numlines = 0;

            };

            this.apply = function () {
                tool.draw = false;

                pencilmarkupobj.addline();
                pencilmarkupobj.findrectangle();

                pencilmarkupobj.saveme();
                //signaturedrawing = pencilmarkupobj;

                //img_update();

                tool.started = false;
                pencilmarkupobj = null;

                /*if (!bMultimarkupadd) {
                    //need to move to connection object.
                    //markupcreated();
                    if (RxCore_GUI_Markup != undefined) {
                        //RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[index],true);
                        var operation = {created : true, modified : false, deleted : false};
                        RxCore_GUI_Markup.setMarkupSelected(DocObj.markuplist[nMarkupcreated], operation);
                    }

                }*/


            };

        };

    }

    function destroy() {
        bdrawCanvasSet = false;
        btextCanvasSet = false;
        bimageCanvasSet = false;

        if(drawCanvas != undefined){
            /*Chrome etc */
            drawCanvas.removeEventListener('mousemove', ev_canvas, false);
            drawCanvas.removeEventListener('mousedown', ev_canvas, false);
            drawCanvas.removeEventListener('mouseup', ev_canvas, false);
            drawCanvas.removeEventListener('mouseout', ev_canvas, false);
            drawCanvas.removeEventListener("dblclick", ev_canvas, false);

            /*Touch devices */
            drawCanvas.removeEventListener("touchstart", ev_canvas, false);
            drawCanvas.removeEventListener("touchmove", ev_canvas, true);
            drawCanvas.removeEventListener("touchend", ev_canvas, false);
            drawCanvas.removeEventListener("touchcancel", ev_canvas, false);
            drawCanvas.removeEventListener("dbltap", ev_canvas, false);

        }

        if(textCanvas != undefined){
        }
        
        if(imageCanvas != undefined){

            //$("#fileToUpload").click();

            /*Chrome etc */

            imageCanvas.removeEventListener('mousedown', ev_canvas, false);
            imageCanvas.removeEventListener('mousemove', ev_canvas, false);

            /*Touch devices */
            imageCanvas.removeEventListener("touchstart", ev_canvas, false);
        }
    }

    RxCore_GUI_Upload = new Rx_GUIUpload();

    return {
        initialize : initialize,
        destroy: destroy,
        drawSignUpload : drawSignUpload,
        checkButtonstate : checkButtonstate,
        setCanvasDraw : setCanvasDraw,
        setCanvasText : setCanvasText,
        setCanvasImage : setCanvasImage,
        addFont : addFont,
        setFont : setFont,
        setMaxSize : setMaxSize,
        setPageScale : setPageScale,
        getmaxsizeScaled : getmaxsizeScaled,
        downScaleCanvas : downScaleCanvas,
        selectFont : selectFont,
        getfonts : getfonts,
        setFontSize : setFontSize,
        fileSelected : fileSelected,
        //drawsignFont : drawsignFont,
        getTextSigncanvas : getTextSigncanvas,
        getDrawSigncanvas : getDrawSigncanvas,
        getImageSigncanvas : getImageSigncanvas,
        drawsigninit : drawsigninit,
        drawsignName : drawsignName,
        uploadSignImage : uploadSignImage,
        uploadCanvasClick : uploadCanvasClick,
        signFreepen : signFreepen,
        clearcanvas : clearcanvas,
        GUI_Upload : RxCore_GUI_Upload,
        setStrokeColor: function(color) {
            strokeColor = color;
        },
        setLineThickness: function(thickness) {
            lineWidth = thickness;
        }
    };



};