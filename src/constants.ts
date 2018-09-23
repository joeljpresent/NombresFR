namespace NombresFR
{

	export const MAX_SAFE_NUMBER = 9007199254740992;

	export interface NumIndexArray
	{
		[chiffre: number]: string;
	}

	export const CHIFFRES : NumIndexArray =
	{
		0: "zéro",
		1: "un",
		2: "deux",
		3: "trois",
		4: "quatre",
		5: "cinq",
		6: "six",
		7: "sept",
		8: "huit",
		9: "neuf"
	}

	export const DIX_PLUS: NumIndexArray =
	{
		0: "dix",
		1: "onze",
		2: "douze",
		3: "treize",
		4: "quatorze",
		5: "quinze",
		6: "seize",
		7: "dix-sept",
		8: "dix-huit",
		9: "dix-neuf"
	}

	export const DIZAINES: NumIndexArray =
	{
		1: "dix",
		2: "vingt",
		3: "trente",
		4: "quarante",
		5: "cinquante",
		6: "soixante",
		7: "soixante-dix",
		8: "quatre-vingts",
		9: "quatre-vingt-dix"
	}

	export const MILLE_PUISSANCE: NumIndexArray =
	{
		2: "million",
    	3: "milliard",
    	4: "billion",
    	5: "billiard",
    	6: "trillion",
    	7: "trilliard",
    	8: "quadrillion",
    	9: "quadrilliard"
	}	
}