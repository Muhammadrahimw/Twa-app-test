import {useEffect, useState, type JSX} from "react";
import WebApp from "@twa-dev/sdk";

interface OrderData {
	item: string;
	color: string;
	date: string;
}

function App(): JSX.Element {
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	useEffect((): void => {
		WebApp.ready();
	}, []);

	const handleConfirm = (): void => {
		if (!selectedColor) return;

		const orderData: OrderData = {
			item: "Futbolka",
			color: selectedColor,
			date: new Date().toLocaleDateString(),
		};

		WebApp.sendData(JSON.stringify(orderData));
	};

	useEffect((): (() => void) | void => {
		if (selectedColor) {
			WebApp.MainButton.setText(`TANLANDI: ${selectedColor.toUpperCase()}`);
			WebApp.MainButton.show();
			WebApp.MainButton.onClick(handleConfirm);

			return () => {
				WebApp.MainButton.offClick(handleConfirm);
			};
		}
	}, [selectedColor]);

	const colors: string[] = ["Qizil", "Ko'k", "Yashil", "Sariq"];

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Kiyim Do'koni</h1>

			<div className="grid grid-cols-2 gap-4 w-full max-w-sm">
				{colors.map((color: string) => (
					<button
						key={color}
						onClick={() => setSelectedColor(color)}
						className={`p-4 rounded-xl border-2 transition-all font-semibold ${
							selectedColor === color
								? "border-blue-500 bg-blue-50 text-blue-600 shadow-md"
								: "border-white bg-white text-gray-600"
						}`}>
						{color}
					</button>
				))}
			</div>

			{selectedColor && (
				<p className="mt-6 text-sm text-gray-500 italic">
					Tanlovni tasdiqlash uchun pastdagi Telegram tugmasini bosing
				</p>
			)}
		</div>
	);
}

export default App;
