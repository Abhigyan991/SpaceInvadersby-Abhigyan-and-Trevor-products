const scoreEl = document.getElementById('scoreEl')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;
	
	//classes
//player class
 	class Player {
 		constructor() {
 			this.velocity = {
 				x: 0,
 				y: 0
 			}
 			this.rotation = 0
 			this.opacity = 1

 			const image = new Image()
 			image.src = './IMG/spaceship.png'
 			image.onload = () => {
 				const scale = 0.15
			this.image = image
			this.width = image.width * scale
 			this.height = image.height * scale
 			this.position = {
 				x: canvas.width / 2 - this.width / 2,
 				y: canvas.height - this.height - 20
 			}
 			}
 		}

 		draw() {
 			//c.fillStyle = 'red';
 			//c.fillRect(this.position.x, 
 			//this.position.y, this.width, this.height)

 					c.save()
 					c.globalAlpha = this.opacity
 					c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
 					c.rotate(this.rotation)
 					c.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)
				c.drawImage(this.image, 
 				this.position.x, 
 				this.position.y, 
 				this.width, 
 				this.height)
 				c.restore()
 		}

 		update() {
 		if (this.image) {
 			this.draw()
 			this.position.x += this.velocity.x
 		}
 		}
 	}

 	//projectile class for Player
 	class Projectile {
 		constructor({position, velocity}) {
 			this.position = position
 			this.velocity = velocity

 			this.radius = 5
 		}

 		draw() {
 			c.beginPath()
 			c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
 			c.fillStyle = 'white'
 			c.fill()
 			c.closePath()
 		}

 		update() {
 			this.draw()
 			this.position.x += this.velocity.x
 			this.position.y += this.velocity.y
 		}
 	}

 	 	//particle class
 	class Particle {
 		constructor({position, velocity, radius, color, fades}) {
 			this.position = position
 			this.velocity = velocity

 			this.radius = radius
 			this.color = color
 			this.opacity = 1
 			this.fades = fades
 		}

 		draw() {
 				c.save()
 			c.globalAlpha = this.opacity
 			c.beginPath()
 			c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
 			c.fillStyle = this.color
 			c.fill()
 			c.closePath()
 				c.restore()
 		}

 		update() {
 			this.draw()
 			this.position.x += this.velocity.x
 			this.position.y += this.velocity.y

 			if (this.fades) this.opacity -= 0.01
 		}
 	}

 	 	//projectile class for enemy
 	class InvaderProjectile {
 		constructor({position, velocity}) {
 			this.position = position
 			this.velocity = velocity

 			this.width = 3;
 			this.height = 10
 		}

 		draw() {
 			c.fillStyle = 'white'
 			c.fillRect(this.position.x, this.position.y, this.width, this.height)
 		}

 		update() {
 			this.draw()
 			this.position.x += this.velocity.x
 			this.position.y += this.velocity.y
 		}
 	}

 			//invader class
 	 	 	class Invader {
 		constructor({position}) {
 			this.velocity = {
 				x: 0,
 				y: 0
 			}

 			const image = new Image()
 			image.src = './IMG/invader.png'
 			image.onload = () => {
 				const scale = 1
			this.image = image
			this.width = image.width * scale
 			this.height = image.height * scale
 			this.position = {
 				x: position.x,
 				y: position.y
 			}
 			}
 		}

 		draw() {
 			//c.fillStyle = 'red';
 			//c.fillRect(this.position.x, 
 			//this.position.y, this.width, this.height)
				c.drawImage(this.image, 
 				this.position.x, 
 				this.position.y, 
 				this.width, 
 				this.height)
 		}

 		update({velocity}) {
 		if (this.image) {
 			this.draw()
 			this.position.x += velocity.x
 			this.position.y += velocity.y
 		}
 		}

 		shoot(invaderProjectiles) {
 			invaderProjectiles.push(new InvaderProjectile({
 				position: {
 					x: this.position.x + this.width / 2,
 					y: this.position.y + this.height
 				},
 				velocity:{
 					x: 0,
 					y: 5
 				}
 			}))
 		}
 	}

 	//Grid class
 	 class Grid {
 	 	constructor() {
 	 		this.position = {
 	 			x: 0,
 	 			y: 0
 	 		}

 	 		this.velocity = {
 	 			x: 3,
 	 			y: 0
 	 		}

 	 		this.invaders = []

 	 		const columns = Math.floor(Math.random() * 10 + 5)
 	 		const rows = Math.floor(Math.random() * 5 + 2)

 	 		this.width = columns * 30

 	 	for (let x = 0; x < columns; x++) {
 	 		for (let y = 0; y < rows; y++) {
 	 			this.invaders.push(
 	 			new Invader({
 	 				position: {
 	 				x: x * 30,
 	 				y: y * 30
 	 			}
 	 		  })
 	 	    )
 		}
 	}
 	 	}

 	 	update() {
 	 		this.position.x += this.velocity.x
 	 		this.position.y += this.velocity.y

 	 		this.velocity.y = 0

 	 		if (this.position.x + this.width >= canvas.width || 
 	 			this.position.x <= 0) {
 	 			this.velocity.x = -this.velocity.x
 	 			this.velocity.y = 30
 	 		}
 	 	}
 	 }


 	 class Background {
 	 	constructor() {
 	 		this.position = {
 	 			x: 0,
 	 			y: 0
 	 		}

 	 		this.width = canvas.width
 	 		this.height = canvas.height

 	 		this.image = new Image()
 	 		this.image.src = './IMG/game-space-img.jpg'
 	 	}

 	 	draw() {
 	 		c.drawImage(this.image, 
 				this.position.x, 
 				this.position.y, 
 				this.width, 
 				this.height)
 	 	}
 	 }

 	const player = new Player()
 	const projectiles = []
 	const grids = []
 	const invaderProjectiles = []
 	const particles = []
 	const background = new Background()
 	const keys = {
 		a: {
 			pressed: false
 		},
 		d: {
 			pressed: false
 		},
 		space: {
 			pressed: false
 		}
 	}

 		function createParticles({object, color, fades}) {
 			for (let i = 0; i < 15; i++) {
 				particles.push(new Particle({
 					position: {
 						x: object.position.x + object.width / 2,
 						y: object.position.y + object.height / 2
 					},
 					velocity: {
 						x: (Math.random() - 0.5) * 2,
 						y: (Math.random() - 0.5) * 2
 					},

 						radius: Math.random() * 3,
 						color: color || '#ca80e9',
 						fades
 				})
 			)

 		}
 	}

 		let frames = 0
 		let randomInterval = Math.floor(Math.random() * 500 + 500)
 		let game = {
 			over: false,
 			active: true
 		}
 		let score = 0


        let animationID
 		function animate() {
 			if (!game.active) return
 			window.requestAnimationFrame(animate)
 			background.draw()

 			c.fillStyle = 'rgba(0, 0, 0, 0.1)'
 			c.fillRect(0, 0, canvas.width, canvas.height)
 			//player's update
 			player.update()

 			//particles
 			particles.forEach((particle, index) => {


 					if (particle.position.y - particle.radius >= canvas.height) {
 						particle.position.x = Math.random() * canvas.width
 						particle.position.y = -particle.radius
 					}


 				if (particle.opacity <= 0) {
 					setTimeout(() => {
 					particles.splice(index, 1)
 				}, 0)
 				} else {
 				particle.update()
 				}
 			})

 			//invader's projectiles
 			invaderProjectiles.forEach((invaderProjectile, index) => {
 				if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
 					setTimeout(() => {
 						invaderProjectiles.splice(index, 1)
 					}, 0)	
 				} else 	{
 					invaderProjectile.update()
 				}

 				//invader projectile hits player
 				if (invaderProjectile.position.y + invaderProjectile.height >= 
 					player.position.y &&
 					invaderProjectile.position.x + invaderProjectile.width >= 
 					player.position.x &&
 					invaderProjectile.position.x <= player.position.x + player.width ) {

 					setTimeout(() => {
 					invaderProjectiles.splice(index, 1)
 					player.opacity = 0
 					game.over = true
 					}, 0)

 					setTimeout(() => {
 					game.active = false
 					}, 2000)


 					createParticles({object: player, color: 'white', fades: true})

 				}

 			})

 			//player's projectiles
 			projectiles.forEach((projectile, index) => {
 				if (projectile.position.y + projectile.radius <= 0) {
 					setTimeout(() => {
 						projectiles.splice(index, 1)
 					}, 0)			
 				} else
 					 	{
 				projectile.update()
 				}
 			})

 			//grids forEach
 			grids.forEach((grid, gridIndex) => {
 				grid.update()
 				//spawn the projectiles for the enemy
 				if (frames % 100 === 0 && grid.invaders.length > 0)  {
 					grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
 						invaderProjectiles
 						)

 				}


 				grid.invaders.forEach((invader, i) => {
 					invader.update({velocity: grid.velocity})

 					//projectiles hit inavder
 					projectiles.forEach((projectile, j) => {
 						if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
 							projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x -
 							projectile.radius <= invader.position.x + invader.width && projectile.position.y + 
 							projectile.radius >= invader.position.y ) {

 							setTimeout(() => {
 								const invaderFound = grid.invaders.find(invader2 => invader2 === invader)

 								const projectileFound = projectiles.find(projectile2 => projectile2 === projectile)

 								//remove invader and projectiles
 								if (invaderFound && projectileFound) {
 									score += 100
 									scoreEl.innerHTML = score

 									createParticles({
 										object: invader,
 										fades: true
 									})
 								grid.invaders.splice(i, 1)
 								projectiles.splice(j, 1)

 								if (grid.invaders.length > 0) {
 									const firstInvader = grid.invaders[0]
 									const lastInvader = grid.invaders[grid.invaders.length - 1]

 									grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
 									grid.position.x = firstInvader.position.x 
 								} else {
 									grids.splice(gridIndex, 1)
 								}
 							}
 						})
 						}
 					})
 				})
 			})

 			//space ship movement
 			//constants required:
 			const speed = 7
 			//conditionals
 				//left
 				if (keys.a.pressed && player.position.x >= 0) {
 					player.velocity.x = -speed
 					player.rotation = -0.15
 				} 
 				//right
 				else if (keys.d.pressed && player.position.x + 
 					player.width <= canvas.width) {
 					player.velocity.x = speed
 					player.rotation = 0.15
 				} 
 				/*set player velocity on the x axis to 0 and
					set player rotation to 0*/
 				else {
 					player.velocity.x = 0
 					player.rotation = 0
 				}

 				//spawn grids at interval's if statement 
 				if(frames % randomInterval === 0) {
 					grids.push(new Grid())
					randomInterval = Math.floor(Math.random() * 500 + 500)
 					frames = 0
 				}

 					grids.forEach(grid => {
 				 	if (grid.invaders.length === 0 && randomInterval < randomInterval) {
 						grids.push(new Grid())
 					}
 					})

 				frames++
 		}

 		animate()

 		addEventListener('keydown', (event) => {
 			if (game.over) return

 			switch (event.key) {
 			case 'a':
 				keys.a.pressed = true
 				break;
 			case 'd':
 				keys.d.pressed = true
 				break;
 			case 'w':
 				projectiles.push(new Projectile({
 						position: {
 						x: player.position.x + player.width / 2,
 						y: player.position.y
 						},
 						velocity: {
 						x: 0,
 						y: -15
 					}
 						}
 					))
 				//console.log(projectiles)
 				break;
 			case ' ':
 				projectiles.push(new Projectile({
 						position: {
 						x: player.position.x + player.width / 2,
 						y: player.position.y
 						},
 						velocity: {
 						x: 0,
 						y: -15
 					}
 						}
 					))
 				//console.log(projectiles)
 				break;
 			}
 		})

 		 addEventListener('keyup', (event) => {
 			switch (event.key) {
 			case 'a':
 				keys.a.pressed = false
 				break;
 			case 'd':
 				keys.d.pressed = false
 				break;
 			case ' ':
 				break;
 			}
 		})

 		  addEventListener('click', () => {
 		  		 				projectiles.push(new Projectile({
 						position: {
 						x: player.position.x + player.width / 2,
 						y: player.position.y
 						},
 						velocity: {
 						x: 0,
 						y: -15
 					}
 						}
 					))
 				//console.log(projectiles)
 		   	
 		   	})