import {useEffect, useState} from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	useEffect(() => {
		WebApp.ready();
		WebApp.expand();
	}, []);

	const handleConfirm = () => {
		if (selectedColor) {
			const orderData = {
				item: "Futbolka",
				color: selectedColor,
			};

			WebApp.sendData(JSON.stringify(orderData));
		}
	};

	useEffect(() => {
		if (selectedColor) {
			WebApp.MainButton.setText(`TANLANDI: ${selectedColor}`);
			WebApp.MainButton.show();
			WebApp.MainButton.onClick(handleConfirm);
		}
		return () => {
			WebApp.MainButton.offClick(handleConfirm);
		};
	}, [selectedColor]);

	return (
		<div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
			<div className="max-w-md mx-auto space-y-6 text-center">
				<h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
					Kiyim Do'koni
				</h1>

				<div className="grid grid-cols-2 gap-3">
					{["Qizil", "Ko'k", "Yashil", "Sariq"].map((color) => (
						<button
							key={color}
							onClick={() => setSelectedColor(color)}
							className={`py-4 px-6 rounded-2xl font-bold transition-all transform active:scale-95 ${
								selectedColor === color
									? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2"
									: "bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-slate-50"
							}`}>
							{color}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
