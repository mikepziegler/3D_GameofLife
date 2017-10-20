var cubez = []
var newCubez = []

var zLength = 10
var yLength = 10
var xLength = 10

var RunBool = false

var scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var container = document.getElementById('container')
var renderer = new THREE.WebGLRenderer()

renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

var render = function () {
    requestAnimationFrame(render)


    renderer.render(scene, camera)
}

var init = function () {
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})

    for (var z = 0; z < zLength; z++) {
        var cubey = []
        for (var y = 0; y < yLength; y++) {
            var cubex = []
            for (var x = 0; x < xLength; x++) {
                cubex.push(false)
            }
            cubey.push(cubex)
        }
        cubez.push(cubey)
    }

    camera.position.set(5, 5, -10)
    camera.lookAt(new THREE.Vector3(5, 5, 5))



    render()

    /*cubez[1][0][0] = true
    cubez[0][1][0] = true
    cubez[1][1][0] = true
    cubez[0][2][0] = true
    cubez[2][2][0] = true*/

    cubez[2][1][1] = true
    cubez[1][2][1] = true
    cubez[2][2][1] = true
    cubez[1][3][1] = true
    cubez[3][3][1] = true

    newCubez = cubez


    draw()
}

var nextGen = function () {

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    for (var z = 0; z < zLength; z++) {
        var cubey = []
        for (var y = 0; y < yLength; y++) {
            var cubex = []
            for (var x = 0; x < xLength; x++) {
                cubex.push(false)
            }
            cubey.push(cubex)
        }
        cubez.push(cubey)
    }

    newCubez = cubez

    var totalNeigh = 0;
    var totalchecks = 0

    for (var z = 0; z < xLength; z++) {
        for (var y = 0; y < yLength; y++) {
            for (var x = 0; x < zLength; x++) {

                totalchecks++
                var neighbours = 0

                for (var zk = -1; zk <= 1; zk++) {
                    if ((z === 0 && zk === -1) || (z === 9 && zk === 1)) {
                        continue
                    }
                    for (var yk = -1; yk <= 1; yk++) {
                        if ((y === 0 && yk === -1) || (y === 9 && yk === 1)) {
                            continue
                        }
                        for (var xk = -1; xk <= 1; xk++) {
                            if ((x === 0 && xk === -1) || (x === 9 && xk === 1)) {
                                continue
                            }
                            if (cubez[x + xk][y + yk][z + zk] === true && !(x + xk === x && y + yk === y && z + zk === z)) {
                                neighbours++
                                totalNeigh++
                            }
                        }
                    }
                }

                if (neighbours > 0) {
                  console.log("x = " + x + ", y = " + y + ", z = " + z + ", neighbours = " + neighbours)
                }


                if (neighbours < 2 && cubez[x][y][z]) {
                    newCubez[x][y][z] = false
                }
                if (neighbours === 3 && !cubez[x][y][z]) {
                    newCubez[x][y][z] = true
                }
                if ((neighbours === 3 || neighbours === 2) && cubez[x][y][z]) {
                    newCubez[x][y][z] = true
                }
                if (neighbours > 3 && cubez[x][y][z]) {
                    newCubez[x][y][z] = false
                }
            }
        }
    }

    console.log(totalNeigh + ", " + totalchecks)

    draw()
}

var run = function () {
    nextGen()
}

var draw = function () {

    scene.remove()

    for (var z = 0; z < zLength; z++) {
        for (var y = 0; y < yLength; y++) {
            for (var x = 0; x < xLength; x++) {
                if (newCubez[x][y][z]) {
                    var geometry = new THREE.BoxGeometry(1, 1, 1)
                    var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
                    var cube = new THREE.Mesh(geometry, material)

                    cube.position.z = z
                    cube.position.y = y
                    cube.position.x = x

                    scene.add(cube)
                }
            }
        }
    }

    cubez = newCubez

    render()
}

var r = function () {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0])
    }

    cubez = []

    for (var z = 0; z < zLength; z++) {
        var cubey = []
        for (var y = 0; y < yLength; y++) {
            var cubex = []
            for (var x = 0; x < xLength; x++) {
                cubex.push(false)
            }
            cubey.push(cubex)
        }
        cubez.push(cubey)
    }

    newCubez = cubez


    render()
}


init()
