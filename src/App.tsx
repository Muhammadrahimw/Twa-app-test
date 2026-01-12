import {useEffect} from "react";
import WebApp from "@twa-dev/sdk";
import "./App.css";

function App() {
	useEffect(() => {
		// Telegram Web App-ni tayyorlash
		WebApp.ready();
	}, []);

	const sendOrder = (color: string) => {
		const data = {
			item: "Futbolka",
			color: color,
			date: new Date().toLocaleDateString(),
		};

		// Botga JSON string ko'rinishida yuboramiz
		WebApp.sendData(JSON.stringify(data));
	};

	return (
		<div style={{padding: "20px", textAlign: "center"}}>
			<h1>Kiyim do'koni</h1>
			<p>Rangni tanlang:</p>

			<div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
				<button
					onClick={() => sendOrder("Qizil")}
					style={{background: "red", color: "white"}}>
					Qizil
				</button>
				<button
					onClick={() => sendOrder("Ko'k")}
					style={{background: "blue", color: "white"}}>
					Ko'k
				</button>
			</div>
		</div>
	);
}

export default App;
