function convertToNombres()
{
  var rel = document.getElementById("resultatEnLettres");
  var input = document.getElementById("entreeEnChiffres").value;
  rel.innerText = NombresFR.toString(input);
}