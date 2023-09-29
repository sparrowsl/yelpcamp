import {
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerVariantGroup,
} from "unocss";
import extractorSvelte from "@unocss/extractor-svelte";
import { presetForms } from "@julr/unocss-preset-forms";

export default defineConfig({
	presets: [
		presetUno(),
		presetForms(),
		presetIcons({
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
			},
		}),
		presetWebFonts({
			fonts: {
				roboto: [
					{
						name: "Roboto",
						weights: ["300", "400", "500", "600", "700", "800"],
					},
				],
			},
		}),
	],
	extractors: [extractorSvelte()],
	transformers: [transformerVariantGroup()],
	shortcuts: { container: "max-w-6xl mx-auto" },
	theme: {
		colors: {
			brand: {
				// navy: "rgb(0, 33, 71)",
				// gold: "rgb(253, 200, 0)",
			},
		},
	},
});
