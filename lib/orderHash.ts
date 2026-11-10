// Tarayıcıda sipariş → stüdyo linki parçası (#o=base64url JSON)
export function orderToHash(order: object): string {
  const bytes = new TextEncoder().encode(JSON.stringify(order));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return "o=" + btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
