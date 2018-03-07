
var gl, gl2, gl3;
var points;

window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );
    var canvas2 = document.getElementById('gl-canvas2');
    var canvas3 = document.getElementById('gl-canvas3');

    gl = WebGLUtils.setupWebGL( canvas );
    gl2 = WebGLUtils.setupWebGL(canvas2);
    gl3 = WebGLUtils.setupWebGL(canvas3);
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // Three Vertices

    var vertices = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];

    var vertices2 = [
      vec2(1, 0),
      vec2(0, 1),
      vec2(0, -1)
    ];

    var vertices3 = [
      vec2(0, -1),
      vec2(-1, 0),
      vec2(1, 0)
    ]

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl2.viewport(0, 0, canvas2.width, canvas2.height);
    gl2.clearColor(1.0, 1.0, 1.0, 1.0);
    gl3.viewport(0, 0, canvas3.width, canvas3.height);
    gl3.clearColor(0.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    var program2 = initShaders(gl2, 'vertex-shader2', 'fragment-shader2');
    var program3 = initShaders(gl3, 'vertex-shader3', 'fragment-shader3');
    gl.useProgram( program );
    gl2.useProgram(program2);
    gl3.useProgram(program3);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    var bufferId2 = gl2.createBuffer();
    var bufferId3 = gl3.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl2.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl2.bufferData(gl.ARRAY_BUFFER, flatten(vertices2), gl2.STATIC_DRAW);
    gl3.bindBuffer(gl.ARRAY_BUFFER, bufferId3);
    gl3.bufferData(gl.ARRAY_BUFFER, flatten(vertices3), gl3.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vPosition2 = gl2.getAttribLocation(program2, 'vPosition2');
    var vPosition3 = gl3.getAttribLocation(program3, 'vPosition3');
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl2.vertexAttribPointer(vPosition2, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(vPosition2);
    gl3.vertexAttribPointer(vPosition3, 2, gl.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(vPosition3);

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.drawArrays(gl2.TRIANGLES, 0, 3);
    gl3.clear(gl3.COLOR_BUFFER_BIT);
    gl3.drawArrays(gl3.TRIANGLES, 0, 3);
}
