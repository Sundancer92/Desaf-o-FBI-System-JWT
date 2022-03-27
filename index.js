const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const agents = require("./data/agentes.js");

const secretKey = "secretKey";

app.listen(3000, () =>
	console.log("Server started on port http://localhost:3000"),
);

// Carga de index.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// Control para el inicio de sesion
app.get("/SignIn", (req, res) => {
	const { email, password } = req.query;

	// Se busca al agente en la lista de agentes
	const agent = agents.results.find(
		(a) => a.email == email && a.password == password,
	);

	// Si se encuentra el agente se crea el token y redirige al lobby
	if (agent) {
		const token = jwt.sign(
			{
				// Expiracion en 2 minutos (120 segundos)
				exp: Math.floor(Date.now() / 1000) + 120,
				// Los datos del agente: email y password
				data: agent,
			},
			// Clave secreta previamente creada
			secretKey,
		);
		res.send(`
        <a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>
        Bienvenido, ${email}.
        <script>
            sessionStorage.setItem('token', JSON.stringify("${token}"))
        </script>
        `);
	} else {
		res.send("Usuario o contraseña incorrecta");
	}
});

// Ruta restringida
app.get("/Dashboard", (req, res) => {
    // Captura del token enviado como parametro
	let { token } = req.query;

    // Validacion del token
	jwt.verify(token, secretKey, (err, decoded) => {
		err
			? res.status(401).send({
					error: "401 Unauthorized Agent",
					message: err.message,
			  })
			: res.send(`
						Bienvenido al Dashboard ${decoded.data.email}
						`);
	});
});
