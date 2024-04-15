import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json([{"fecha":"4/1/2024","producto":"Juice - Orangina","cantidad":131,"monto":1975,"id":1,"total_amount":258725,"discount":38.91,"net_amount":1206.5275,"profit_margin":0.6109},
  {"fecha":"4/2/2024","producto":"Beer - Upper Canada Lager","cantidad":181,"monto":1533,"id":2,"total_amount":277473,"discount":6.64,"net_amount":1431.2088,"profit_margin":0.9336},
  {"fecha":"4/1/2024","producto":"Pork - Bacon Cooked Slcd","cantidad":139,"monto":1085,"id":3,"total_amount":150815,"discount":7.71,"net_amount":1001.3465,"profit_margin":0.9229},
  {"fecha":"4/2/2024","producto":"Pasta - Orzo, Dry","cantidad":118,"monto":1201,"id":4,"total_amount":141718,"discount":6.73,"net_amount":1120.1727,"profit_margin":0.9327},
  {"fecha":"4/2/2024","producto":"Neckerchief Blck","cantidad":153,"monto":1794,"id":5,"total_amount":274482,"discount":13.27,"net_amount":1555.9362,"profit_margin":0.8673},
  {"fecha":"4/2/2024","producto":"Versatainer Nc - 888","cantidad":193,"monto":1786,"id":6,"total_amount":344698,"discount":2.83,"net_amount":1735.4562,"profit_margin":0.9717},
  {"fecha":"4/2/2024","producto":"Bagel - Whole White Sesame","cantidad":108,"monto":1054,"id":7,"total_amount":113832,"discount":21.27,"net_amount":829.8142,"profit_margin":0.7873},
  {"fecha":"4/1/2024","producto":"Dome Lid Clear P92008h","cantidad":107,"monto":1281,"id":8,"total_amount":137067,"discount":22.6,"net_amount":991.494,"profit_margin":0.774},
  {"fecha":"4/1/2024","producto":"Daikon Radish","cantidad":180,"monto":1871,"id":9,"total_amount":336780,"discount":26.92,"net_amount":1367.3268,"profit_margin":0.7308},
  {"fecha":"4/1/2024","producto":"Gingerale - Diet - Schweppes","cantidad":108,"monto":1674,"id":10,"total_amount":180792,"discount":22.25,"net_amount":1301.535,"profit_margin":0.7775},
  {"fecha":"4/1/2024","producto":"Coconut - Creamed, Pure","cantidad":142,"monto":1386,"id":11,"total_amount":196812,"discount":3.01,"net_amount":1344.2814,"profit_margin":0.9699},
  {"fecha":"4/2/2024","producto":"Wanton Wrap","cantidad":133,"monto":1736,"id":12,"total_amount":230888,"discount":13.03,"net_amount":1509.7992,"profit_margin":0.8697},
  {"fecha":"4/2/2024","producto":"Lemons","cantidad":153,"monto":1276,"id":13,"total_amount":195228,"discount":12.82,"net_amount":1112.4168,"profit_margin":0.8718},
  {"fecha":"4/1/2024","producto":"Beer - Camerons Auburn","cantidad":195,"monto":1456,"id":14,"total_amount":283920,"discount":33.47,"net_amount":968.6768,"profit_margin":0.6653},
  {"fecha":"4/2/2024","producto":"Bouillion - Fish","cantidad":144,"monto":1363,"id":15,"total_amount":196272,"discount":6.79,"net_amount":1270.4523,"profit_margin":0.9321},
  {"fecha":"4/1/2024","producto":"Sobe - Orange Carrot","cantidad":183,"monto":1905,"id":16,"total_amount":348615,"discount":44.06,"net_amount":1065.657,"profit_margin":0.5594},
  {"fecha":"4/2/2024","producto":"Syrup - Chocolate","cantidad":188,"monto":1490,"id":17,"total_amount":280120,"discount":45.91,"net_amount":805.941,"profit_margin":0.5409},
  {"fecha":"4/1/2024","producto":"Muffin Mix - Blueberry","cantidad":120,"monto":1056,"id":18,"total_amount":126720,"discount":13.62,"net_amount":912.1728,"profit_margin":0.8638},
  {"fecha":"4/1/2024","producto":"Compound - Orange","cantidad":195,"monto":1339,"id":19,"total_amount":261105,"discount":49.77,"net_amount":672.5797,"profit_margin":0.5023},
  {"fecha":"4/2/2024","producto":"Wine - Chateau Timberlay","cantidad":173,"monto":1655,"id":20,"total_amount":286315,"discount":9.03,"net_amount":1505.5535,"profit_margin":0.9097}])
}
