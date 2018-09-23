///<reference path="constants.ts" />

namespace NombresFR
{
	function upTo99(n: number): string
	{
		if (n < 0 || n >= 100)
			throw new RangeError("Argument not in range [0..99].");
		
		let chiffreUnites: number = Math.floor(n % 10);
		let chiffreDizaines: number = Math.floor(n/10);

		switch (chiffreDizaines)
		{
			case 0:
				return CHIFFRES[chiffreUnites];
				// break;
			case 1:
				return DIX_PLUS[chiffreUnites];
				// break;
			case 7:
				if (chiffreUnites === 1)
					return "soixante-et-onze";
				return "soixante-" + DIX_PLUS[chiffreUnites];
				// break;
			case 8:
				if (chiffreUnites === 0)
					return "quatre-vingts";
				return "quatre-vingt-" + CHIFFRES[chiffreUnites];
				// break;
			case 9:
				return "quatre-vingt-" + DIX_PLUS[chiffreUnites];
				// break;
			default:
				if (chiffreUnites === 0)
					return DIZAINES[chiffreDizaines];
				if (chiffreUnites === 1)
					return DIZAINES[chiffreDizaines] + "-et-un";
				return DIZAINES[chiffreDizaines] + "-" + CHIFFRES[chiffreUnites];
				// break;
		}
	}

	function upTo999(n: number): string
	{
		if (n < 0 || n >= 1000)
			throw new RangeError("Argument not in range [0..999].");

		let chiffreCentaines: number = Math.floor(n/100);
		let reste: number = n % 100;
		let resteTexte: string = upTo99(reste);

		switch (chiffreCentaines)
		{
		 	case 0:
		 		return resteTexte;
		 		//break;
		 	case 1:
		 		if (reste === 0)
		 			return "cent";
		 		return "cent-" + resteTexte;
		 		//break;
		 	default:
		 		if (reste === 0)
		 			return CHIFFRES[chiffreCentaines] + "-cents";
		 		return CHIFFRES[chiffreCentaines] + "-cent-" + resteTexte;
		 		//break;
		 }
	}

	function upToAMillion(n: number): string
	{
		if (n < 0 || n >= 1_000_000)
			throw new RangeError("Argument not in range [0..999'999].");

		let nombreMilliers: number = Math.floor(n/1000);
		let nombreMilliersTexte: string = upTo999(nombreMilliers);

		let reste: number = n % 1000;
		let resteTexte: string = upTo999(reste);

		switch (nombreMilliers)
		{
			case 0:
				return upTo999(n);
				//break;
			case 1:
				if (reste === 0)
					return "mille";
				return "mille-" + resteTexte;
				//break;
			default:
				if (reste === 0)
					return nombreMilliersTexte + "-mille";
				return nombreMilliersTexte + "-mille-" + resteTexte;
				//break;
		}
	}

	function zillions(n: number, puissanceDeMille: number): string
	{
		if (n < 1 || n >= 1_000)
			throw new RangeError("Argument not in range [1..999].");

		if (n < 2)
			return "un " + MILLE_PUISSANCE[puissanceDeMille];

		return upTo999(n) + " " + MILLE_PUISSANCE[puissanceDeMille] + "s";
	}

	function moreThanAMillion(n: number): string
	{
		let nombreMillions: number = Math.floor(n/1_000_000);
		let res: string = "";
		for (let i: number = 2; nombreMillions > 0; i++)
		{
			if (nombreMillions % 1000 != 0)
				res = zillions(nombreMillions % 1000, i) + (res?" ":"") + res;
			nombreMillions = Math.floor(nombreMillions/1000);
		}
		
		if (n % 1_000_000 === 0)
			return res;
		return res + " " + upToAMillion(n % 1_000_000);
	}

	function positiveNumber(n: number): string
	{
		if (n < 0)
			throw new RangeError("Argument should be non-negative.");
		
		if (n > MAX_SAFE_NUMBER)
			throw new RangeError("Function only accepts numbers whose absolute value is less than 2^53");

		if (n < 1_000_000)
			return upToAMillion(n);

		return moreThanAMillion(n);
	}

	export function toString(n: number): string
	{
		if (n < 0)
			return "moins " + positiveNumber(-n);
		return positiveNumber(n);
	}
}