/*
 * @author: Loki Tang
 * @description:  Mosaic 
 *
 * */
;(function(Ps){

    window[Ps].module("mosaic",function(P){

        var M = {
            process: function(imgData,arg){//调节亮度对比度

                var data = imgData.data;
                var width = imgData.width;
                var height = imgData.height;

                var xyToIFun = P.lib.dorsyMath.xyToIFun(width);

                var dotSize = 10;
                var halfSize = 5;
                var dotSizeWidth = imgData.width / dotSize;
                var dotSizeHeight = imgData.height / dotSize;

                console.log(data.length);

                for (var i = 0; i < dotSizeWidth; i++) {
                    for (var j = 0; j < dotSizeHeight; j++) {
                        var sx = dotSize * i;
                        var sy = dotSize * j;
                        
                        var getColorSX = sx + halfSize;
                        var getColorSY = sy + halfSize;
                        var cc = getColor(getColorSX, getColorSY);

                        setRect(sx, sy, cc);
                    }
                };

                function setRect(sx, sy, cc) {
                    for (var i = 0; i < dotSize; i++) {
                        for (var j = 0; j < dotSize; j++) {
                            setColor(sx + i, sy + j, cc);
                        }
                    };
                }

                function setColor(sx, sy, ccc) {
                    if (!ccc || ccc.length <= 0) {
                        return;
                    }
                    data[xyToIFun(sx, sy, 0)] = ccc[0];
                    data[xyToIFun(sx, sy, 1)] = ccc[1];
                    data[xyToIFun(sx, sy, 2)] = ccc[2];
                    data[xyToIFun(sx, sy, 3)] = ccc[3];
                }

                function getColor(sx, sy) {
                    var r = data[xyToIFun(sx, sy, 0) + 0];
                    var g = data[xyToIFun(sx, sy, 0) + 1];
                    var b = data[xyToIFun(sx, sy, 0) + 2];
                    var a = data[xyToIFun(sx, sy, 0) + 3];
                    return [r, g, b, a];
                }

                return imgData;
            }
            
        };

        return M;

    });

})("psLib");
