function drawTriangle() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    var gl=WebGLUtils.setupWebGL(canvas); //set up webgl context, like a handle
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 ); //r, g, b, transparency
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // Create shader program, needs vertex and fragment shader code
    // in GLSL to be written in HTML file
    // It compiles them into a program for drawing content
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    // ##########################################################################

    // Enter array set up code here
    // We will put all the values we need for our triangle

    var arrayOfPoints = [];

    var p0 = vec2( 0.0, 0.0 );
    var p1 = vec2( 1.0, 0.0 );
    var p2 = vec2( 0.0, 1.0 );

    // Concatenate the points
    arrayOfPoints.push( p0 );
    arrayOfPoints.push( p1 );
    arrayOfPoints.push( p2 );


    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionHandle = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionHandle, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionHandle );
    
    
    
    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // We also have: POINTS (individual points) and LINE_STRIP (draws line segments) and LINE_LOOP (draws connected line segments)
    // To make any shape we have: FAN (one to all points), points provided in consecutive order into array, starting from first as the fan core
    // TRIANGLE_STRIP allows us to have a zigzag strip. But you have to be careful about the order of the points. Be careful to specify adjacent triangles!

    // How can you draw a square? Use either the FAN or STRIP!
    //
    
}

