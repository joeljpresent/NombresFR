declare namespace NombresFR {
    const MAX_SAFE_NUMBER = 9007199254740992;
    interface NumIndexArray {
        [chiffre: number]: string;
    }
    const CHIFFRES: NumIndexArray;
    const DIX_PLUS: NumIndexArray;
    const DIZAINES: NumIndexArray;
    const MILLE_PUISSANCE: NumIndexArray;
}
declare namespace NombresFR {
    function toString(n: number): string;
}
